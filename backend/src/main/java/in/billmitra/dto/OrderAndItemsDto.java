package in.billmitra.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderAndItemsDto {
    private PlacedOrderDto order;
    private List<OrderItemDto> items;
}
