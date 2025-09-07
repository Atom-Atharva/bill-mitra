package in.billmitra.services.impl;

import com.razorpay.Order;
import in.billmitra.dto.*;
import in.billmitra.entities.OrderEntity;
import in.billmitra.entities.StoreEntity;
import in.billmitra.entities.UserEntity;
import in.billmitra.entities.enums.PaymentMethod;
import in.billmitra.entities.enums.TransactionStatus;
import in.billmitra.repositories.OrderRepository;
import in.billmitra.repositories.StoreRepository;
import in.billmitra.security.CustomUserDetails;
import in.billmitra.services.OrderService;
import in.billmitra.utils.RazorpayUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    @Value("${rzp.api.key}")
    private String RAZORPAY_API_PUBLIC_KEY;
    private final OrderRepository orderRepository;
    private final StoreRepository storeRepository;
    private final RazorpayUtil razorpayUtil;

    @Override
    public OrderResponse placeOrder(OrderRequest order) {
        // Get StoreId and UserId
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity user = customUserDetails.getUser();
        Long storeId = customUserDetails.getStoreId();

        // Get Store
        StoreEntity store = storeRepository.findById(storeId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found."));

        // Create Order
        OrderEntity orderEntity = OrderEntity.builder()
                .store(store)
                .createdBy(user)
                .taxFee(order.getTaxFee())
                .discount(order.getDiscount())
                .totalAmount(order.getTotalAmount())
                .paymentMethod(order.getPaymentMethod())
                .transactionStatus(TransactionStatus.PENDING)
                .build();

        // If payment mode is CASH fast-forward 'SUCCESS'.
        if (order.getPaymentMethod().equals(PaymentMethod.CASH)) {
            orderEntity.setTransactionStatus(TransactionStatus.SUCCESS);
            try {
                orderEntity = orderRepository.save(orderEntity);
            } catch (Exception e) {
                e.printStackTrace();
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to place order");
            }
            return OrderResponse.builder().order(convertToOrderDto(orderEntity)).message("Order Placed Successfully.").build();
        } else {
            try {
                return handlePaymentUsingRazorPay(orderEntity);
            } catch (Exception e) {
                e.printStackTrace();
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to place payment order");
            }
        }
    }

    private OrderResponse handlePaymentUsingRazorPay(OrderEntity orderEntity) {
        try {
            // Create Payment Order.
            Order razorPayOrder = razorpayUtil.createPaymentOrder(orderEntity);

            // Set TransactionID in db.
            orderEntity.setTransactionId(razorPayOrder.get("id"));
            orderRepository.save(orderEntity);

            // Create OrderDTO for Response
            OrderDto orderDto = convertToOrderDto(orderEntity);
            orderDto.setRazorPayPublicKey(RAZORPAY_API_PUBLIC_KEY);

            return OrderResponse.builder()
                    .order(orderDto)
                    .message("Order Placed Successfully. Please proceed to complete payment.")
                    .build();
        } catch (Exception e) {
            e.printStackTrace();

            // Update the DB.
            orderEntity.setTransactionStatus(TransactionStatus.CANCEL);
            orderRepository.save(orderEntity);

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to place payment order");
        }
    }

    private OrderDto convertToOrderDto(OrderEntity orderEntity) {
        return OrderDto.builder()
                .orderId(orderEntity.getId())
                .paymentMethod(orderEntity.getPaymentMethod().name())
                .transactionStatus(orderEntity.getTransactionStatus().name())
                .razorPayOrderId(orderEntity.getTransactionId())
                .totalAmount(orderEntity.getTotalAmount())
                .build();
    }

    @Override
    public MessageResponse verifySignature(PaymentRequest paymentRequest) {
        // Check if Order exists
        OrderEntity orderEntity = orderRepository.findByTransactionId(paymentRequest.getTransactionId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found with transactionId: " + paymentRequest.getTransactionId()));

        // Check for payment_mode
        if (orderEntity.getPaymentMethod().equals(PaymentMethod.CASH)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment mode is CASH.");
        }

        // Check for transaction_status
        if (!orderEntity.getTransactionStatus().equals(TransactionStatus.PENDING)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Transaction is already " + orderEntity.getTransactionStatus().name() + ".");
        }

        // Verify Signature
        boolean verified;
        try {
            verified = razorpayUtil.verifyRazorPaySignature(paymentRequest);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to verify signature.");
        }

        // Update DB.
        if (verified) {
            try {
                orderEntity.setTransactionStatus(TransactionStatus.SUCCESS);
                orderRepository.save(orderEntity);
                return new MessageResponse("Transaction successful.");
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to update transaction status.");
            }
        } else {
            try {
                orderEntity.setTransactionStatus(TransactionStatus.CANCEL);
                orderRepository.save(orderEntity);
            } catch (Exception e) {
                e.printStackTrace();
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to update transaction status.");
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Signature verification failed.");
        }
    }
}
