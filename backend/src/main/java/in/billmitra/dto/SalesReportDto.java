package in.billmitra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SalesReportDto {
    private Double sales;
    private Long bills;
}
