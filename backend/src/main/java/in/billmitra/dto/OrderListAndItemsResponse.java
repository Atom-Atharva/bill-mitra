package in.billmitra.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class OrderListAndItemsResponse extends MessageResponse {
    private List<OrderAndItemsDto> orders;
    private int currentPage;
    private int totalPages;
    private long totalOrders;
}
