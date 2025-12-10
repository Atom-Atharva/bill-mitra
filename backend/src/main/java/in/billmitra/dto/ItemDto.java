package in.billmitra.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String imgUrl;
    private String bgColor;
    private String categoryName;
}
