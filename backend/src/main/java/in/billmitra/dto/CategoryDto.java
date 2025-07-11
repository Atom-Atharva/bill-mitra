package in.billmitra.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryDto {
    private Long id;

    private String name;

    private String description;

    private String imgUrl;

    private String bgColor;
}
