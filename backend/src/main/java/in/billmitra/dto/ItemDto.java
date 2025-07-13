package in.billmitra.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Builder
public class ItemDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String imgUrl;
    private String bgColor;
}
