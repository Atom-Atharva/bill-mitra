package in.billmitra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SalesEmployeeBillDto {
    UserDto user;
    Long bills;
}
