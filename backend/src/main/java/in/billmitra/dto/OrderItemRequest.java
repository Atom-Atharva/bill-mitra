package in.billmitra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OrderItemRequest {
    private Long itemId;
    private Integer quantity;
}
