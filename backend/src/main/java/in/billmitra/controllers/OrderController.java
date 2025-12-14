package in.billmitra.controllers;

import in.billmitra.dto.*;
import in.billmitra.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest order) {
        try {
            OrderResponse placedOrder = orderService.placeOrder(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(placedOrder);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(OrderResponse.builder().order(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(OrderResponse.builder().order(null).message("Exception while placing order :" + e.getMessage()).build());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<MessageResponse> verifyPayment(@RequestBody PaymentRequest paymentRequest) {
        try {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderService.verifySignature(paymentRequest));
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(new MessageResponse(e.getReason()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Unable to verify payment: " + e.getMessage()));
        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<OrderListAndItemsResponse> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            if (size > 20) {
                size = 20;
            }
            return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllOrders(page, size));
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(OrderListAndItemsResponse.builder().orders(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(OrderListAndItemsResponse.builder().orders(null).message("Unable to fetch orders: " + e.getMessage()).build());
        }
    }

    @GetMapping("/admin/sales")
    public ResponseEntity<SalesResponse> getSalesInfo() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(orderService.getSalesReport());
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(SalesResponse.builder().sales(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(SalesResponse.builder().sales(null).message("Unable to fetch sales info: " + e.getMessage()).build());
        }
    }

    @GetMapping("/admin/sales/employee")
    public ResponseEntity<SalesResponse> getSalesInfoOfEmployee(
            @RequestParam Long userId
    ) {
        try {
            if (userId == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User id cannot be null");
            }
            return ResponseEntity.status(HttpStatus.OK).body(orderService.getSalesOfEmployeeReport(userId));
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(SalesResponse.builder().sales(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(SalesResponse.builder().sales(null).message("Unable to fetch sales info: " + e.getMessage()).build());
        }
    }

    @GetMapping("/admin/sales/employee/hardworking")
    public ResponseEntity<SalesEmployeeResponse> getHardworkingSalesInfoOfEmployee() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(orderService.getHardworkingEmployee());
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(SalesEmployeeResponse.builder().employee(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(SalesEmployeeResponse.builder().employee(null).message("Unable to get Hardworking Employee").build());
        }
    }

    @GetMapping("/admin/sales/item/most-sellable")
    public ResponseEntity<SalesItemResponse> getMostSellableItem() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(orderService.getMostSellableItem());
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(SalesItemResponse.builder().item(null).message(e.getReason()).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(SalesItemResponse.builder().item(null).message("Unable to get most sellable item").build());
        }
    }

    @GetMapping("/admin/sales/timeline")
    public ResponseEntity<SalesTimelineResponse> getSalesBetweenDates(
            @RequestParam("fromDate") LocalDate fromDate,
            @RequestParam("toDate") LocalDate toDate
    ) {
        try {
            SalesTimelineRequest request = SalesTimelineRequest.builder()
                    .fromDate(fromDate)
                    .toDate(toDate)
                    .build();

            return ResponseEntity.ok(orderService.getSalesTimelineReport(request));

        } catch (ResponseStatusException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(SalesTimelineResponse.builder()
                            .sales(null)
                            .message(e.getReason())
                            .build());

        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(SalesTimelineResponse.builder()
                            .sales(null)
                            .message("Unable to fetch sales info")
                            .build());
        }
    }

}
