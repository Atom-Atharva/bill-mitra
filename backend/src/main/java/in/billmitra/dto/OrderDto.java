package in.billmitra.dto;

import in.billmitra.entities.StoreEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDto {
    private Long orderId;
    private String paymentMethod;
    private String transactionStatus;
    private String razorPayOrderId;
    private String razorPayPublicKey;
    private Double totalAmount;
}
