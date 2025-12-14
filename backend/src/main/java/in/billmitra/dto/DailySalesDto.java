package in.billmitra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Builder
public class DailySalesDto {
    private LocalDate date;
    private Double sales;
    private Long bills;
}
