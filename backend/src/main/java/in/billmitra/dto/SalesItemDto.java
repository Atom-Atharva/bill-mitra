package in.billmitra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SalesItemDto {
    ItemDto item;
    Long quantity;
}
