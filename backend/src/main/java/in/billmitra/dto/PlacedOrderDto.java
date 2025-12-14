package in.billmitra.dto;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class PlacedOrderDto {
    private Long orderId;
    private String paymentMethod;
    private String transactionStatus;
    private Double totalAmount;
    private Double taxFee;
    private Double discount;
    private CreatedByDto createdBy;
    private Timestamp updatedAt;
}
