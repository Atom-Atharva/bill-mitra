package in.billmitra.dto;

import lombok.Data;

@Data
public class ItemRequest {
    private String name;
    private String description;
    private Double price;
    private String bgColor;
    private Long categoryId;
}
