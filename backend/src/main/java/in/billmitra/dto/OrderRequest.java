package in.billmitra.dto;

import in.billmitra.entities.enums.PaymentMethod;
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
    private Double taxFee;
    private Double discount;
    private Double totalAmount;
    private PaymentMethod paymentMethod;
    private List<OrderItemRequest> items;
}
