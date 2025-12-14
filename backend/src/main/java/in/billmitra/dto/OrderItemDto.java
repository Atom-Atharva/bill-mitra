package in.billmitra.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemDto {
    private Long itemId;
    private String itemName;
    private Long itemQuantity;
    private Double itemPrice;
    private String itemImgUrl;
}
