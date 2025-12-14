package in.billmitra.services.impl;

import com.razorpay.Order;
import in.billmitra.controllers.SalesTimelineResponse;
import in.billmitra.dto.*;
import in.billmitra.entities.*;
import in.billmitra.entities.enums.PaymentMethod;
import in.billmitra.entities.enums.TransactionStatus;
import in.billmitra.repositories.ItemRepository;
import in.billmitra.repositories.OrderRepository;
import in.billmitra.repositories.StoreRepository;
import in.billmitra.repositories.UserRepository;
import in.billmitra.security.CustomUserDetails;
import in.billmitra.services.OrderService;
import in.billmitra.utils.RazorpayUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
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

        // Populate ordered items mapping table.
        List<Long> itemIds = order.getItems().stream()
                .map(OrderItemRequest::getItemId)
                .toList();

        // Get List of Items inside store.
        List<ItemEntity> items = itemRepository.findAllByIdInAndStore_id(itemIds, storeId);

        // Check if any item is invalid.
        if (items.size() != itemIds.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Some of the items are not available in the store.");
        }

        // Put the items inside a map for easy retrieval.
        Map<Long, ItemEntity> itemMap = items.stream()
                .collect(Collectors.toMap(ItemEntity::getId, item -> item));

        // Linking Ordered Items with the OrderEntity.
        OrderEntity finalOrderEntity = orderEntity;
        List<OrderItemMappingEntity> orderItems = order.getItems().stream()
                .map(reqItem -> OrderItemMappingEntity.builder()
                        .order(finalOrderEntity)
                        .store(store)
                        .item(itemMap.get(reqItem.getItemId()))
                        .quantity(reqItem.getQuantity())
                        .build())
                .toList();
        orderEntity.setItems(orderItems);

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

    @Override
    public SalesResponse getSalesOfEmployeeReport(Long userId) {
        // Get StoreID
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();

        // Check if user is in store
        boolean isExist = userRepository.existsByIdAndStore_id(userId, storeId);
        if (!isExist) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }

        // From the store fetch Employee's monthly, today, overall sales
        SalesReportDto dailySalesDto = orderRepository.getDailySalesOfEmployeeByStoreId(storeId, userId);
        SalesReportDto monthlySalesDto = orderRepository.getMonthlySalesOfEmployeeByStoreId(storeId, userId);
        SalesReportDto totalSalesDto = orderRepository.getTotalSalesOfEmployeeByStoreId(storeId, userId);

        return SalesResponse.builder()
                .sales(SalesDto.builder()
                        .totalSales(totalSalesDto.getSales())
                        .monthlySales(monthlySalesDto.getSales())
                        .todaySales(dailySalesDto.getSales())
                        .totalBills(totalSalesDto.getBills())
                        .monthlyBills(monthlySalesDto.getBills())
                        .todayBills(dailySalesDto.getBills())
                        .build())
                .message("Sales Report fetched successfully.")
                .build();
    }

    @Override
    public SalesEmployeeResponse getHardworkingEmployee() {
        // Get Store ID
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();

        // Fetch Employee with the highest bills in the current month.
        SalesEmployeeBillDto employee = orderRepository.getMostHardworkingEmployeeOfTheMonth(storeId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No employees found in the current month."));

        return SalesEmployeeResponse.builder()
                .employee(employee)
                .message("Employee fetched successfully.")
                .build();
    }

    @Override
    public SalesItemResponse getMostSellableItem() {
        // Get Store ID
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();

        // Fetch Item with the highest sales in the current month
        SalesItemDto item = orderRepository.getMostSellableItemInStore(storeId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No items found in the current month."));

        return SalesItemResponse.builder()
                .item(item)
                .message("Most sellable item fetched successfully.")
                .build();
    }

    @Override
    public SalesTimelineResponse getSalesTimelineReport(SalesTimelineRequest request) {
        // Edge Cases
        if (request.getFromDate() == null || request.getToDate() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "From Date and To Date are required.");
        }

        if (request.getFromDate().isAfter(request.getToDate())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "From Date cannot be after To Date."
            );
        }

        // Get Store ID
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();

        List<DailySalesDto> dayWiseSales = orderRepository.getDailySalesInTimeline(
                storeId,
                Timestamp.valueOf(request.getFromDate().atStartOfDay()),
                Timestamp.valueOf(request.getToDate().atTime(23, 59, 59))
        );

        // Insert into MAP
        Map<LocalDate, DailySalesDto> salesMap = dayWiseSales.stream()
                .collect(Collectors.toMap(DailySalesDto::getDate, dailySalesDto -> dailySalesDto));

        List<DailySalesDto> salesTimeline = new ArrayList<>();

        LocalDate currentDate = request.getFromDate();
        LocalDate endDate = request.getToDate();

        while (!currentDate.isAfter(endDate)) {
            salesTimeline.add(
                    salesMap.getOrDefault(currentDate, new DailySalesDto(currentDate, 0.0, 0L))
            );
            currentDate = currentDate.plusDays(1);
        }

        return SalesTimelineResponse.builder()
                .sales(salesTimeline)
                .message("Sales Timeline Report fetched successfully.")
                .build();
    }

    @Override
    public SalesResponse getSalesReport() {
        // Get StoreId
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();

        // Get Monthly, today, overall sales
        SalesReportDto dailySalesDto = orderRepository.getDailySalesByStoreId(storeId);
        SalesReportDto monthlySalesDto = orderRepository.getMonthlySalesByStoreId(storeId);
        SalesReportDto totalSalesDto = orderRepository.getTotalSalesByStoreId(storeId);

        return SalesResponse.builder()
                .sales(SalesDto.builder()
                        .totalSales(totalSalesDto.getSales())
                        .monthlySales(monthlySalesDto.getSales())
                        .todaySales(dailySalesDto.getSales())
                        .totalBills(totalSalesDto.getBills())
                        .monthlyBills(monthlySalesDto.getBills())
                        .todayBills(dailySalesDto.getBills())
                        .build())
                .message("Sales Report fetched successfully.")
                .build();
    }

    @Override
    public OrderListAndItemsResponse getAllOrders(int page, int size) {
        // Get StoreId
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();

        // Pagination
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<OrderEntity> orderPage =
                orderRepository.findByStoreIdAndTransactionStatus(
                        storeId,
                        TransactionStatus.SUCCESS,
                        pageable
                );

        if (orderPage.isEmpty()) {
            return OrderListAndItemsResponse.builder()
                    .orders(List.of())
                    .currentPage(page)
                    .totalPages(0)
                    .totalOrders(0)
                    .message("No successful orders found.")
                    .build();
        }

        List<OrderAndItemsDto> successOrders = orderPage.getContent()
                .stream()
                .map(this::convertToOrderAndItemDto)
                .toList();

        return OrderListAndItemsResponse.builder()
                .orders(successOrders)
                .currentPage(orderPage.getNumber())
                .totalPages(orderPage.getTotalPages())
                .totalOrders(orderPage.getTotalElements())
                .message("Orders fetched successfully.")
                .build();
    }

    private OrderAndItemsDto convertToOrderAndItemDto(OrderEntity orderEntity) {
        List<OrderItemDto> itemsDto = orderEntity.getItems()
                .stream()
                .map(itemMapping -> OrderItemDto.builder()
                        .itemId(itemMapping.getItem().getId())
                        .itemName(itemMapping.getItem().getName())
                        .itemQuantity(itemMapping.getQuantity())
                        .itemPrice(itemMapping.getItem().getPrice())
                        .itemImgUrl(itemMapping.getItem().getImgUrl())
                        .build())
                .toList();

        return OrderAndItemsDto.builder()
                .order(PlacedOrderDto.builder()
                        .orderId(orderEntity.getId())
                        .paymentMethod(orderEntity.getPaymentMethod().name())
                        .transactionStatus(orderEntity.getTransactionStatus().name())
                        .totalAmount(orderEntity.getTotalAmount())
                        .discount(orderEntity.getDiscount())
                        .taxFee(orderEntity.getTaxFee())
                        .createdBy(CreatedByDto.builder()
                                .id(orderEntity.getCreatedBy().getId())
                                .username(orderEntity.getCreatedBy().getName())
                                .role(orderEntity.getCreatedBy().getRole())
                                .build())
                        .updatedAt(orderEntity.getUpdatedAt())
                        .build())
                .items(itemsDto)
                .build();
    }
}
