package in.billmitra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SalesDto {
    private Double totalSales;
    private Double todaySales;
    private Long totalBills;
    private Long todayBills;
    private Double monthlySales;
    private Long monthlyBills;
}
