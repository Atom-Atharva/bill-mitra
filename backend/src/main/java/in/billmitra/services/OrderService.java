package in.billmitra.services;

import in.billmitra.dto.*;

public interface OrderService {
    OrderResponse placeOrder(OrderRequest order);
    MessageResponse verifySignature(PaymentRequest paymentRequest);

    OrderListAndItemsResponse getAllOrders(int page, int size);

    SalesResponse getSalesReport();

    SalesResponse getSalesOfEmployeeReport(Long userId);

    SalesEmployeeResponse getHardworkingEmployee();

    SalesItemResponse getMostSellableItem();
}
