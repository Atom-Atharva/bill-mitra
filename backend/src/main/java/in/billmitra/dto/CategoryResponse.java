package in.billmitra.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class CategoryResponse extends MessageResponse {
    private CategoryDto category;
}
