package in.billmitra.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class SalesEmployeeResponse extends MessageResponse{
    SalesEmployeeBillDto employee;
}
