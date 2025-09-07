package in.billmitra.services;

import in.billmitra.dto.MessageResponse;
import in.billmitra.dto.OrderRequest;
import in.billmitra.dto.OrderResponse;
import in.billmitra.dto.PaymentRequest;

public interface OrderService {
    OrderResponse placeOrder(OrderRequest order);
    MessageResponse verifySignature(PaymentRequest paymentRequest);
}
