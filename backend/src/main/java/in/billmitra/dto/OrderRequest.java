package in.billmitra.dto;

import in.billmitra.entities.enums.PaymentMethod;
import in.billmitra.entities.enums.TransactionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private Long storeId;
    private Long userId;
    private Double taxFee;
    private Double discount;
    private Double totalAmount;
    private PaymentMethod paymentMethod;
    private List<OrderItemRequest> items;
}
