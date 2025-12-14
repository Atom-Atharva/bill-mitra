package in.billmitra.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class SalesItemResponse extends MessageResponse{
    private SalesItemDto item;
}
