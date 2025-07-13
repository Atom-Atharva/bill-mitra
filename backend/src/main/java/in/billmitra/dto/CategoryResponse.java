package in.billmitra.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class CategoryResponse extends MessageResponse {
    private CategoryDto category;
}
