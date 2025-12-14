package in.billmitra.controllers;

import in.billmitra.dto.DailySalesDto;
import in.billmitra.dto.MessageResponse;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class SalesTimelineResponse extends MessageResponse {
    List<DailySalesDto> sales;
}
