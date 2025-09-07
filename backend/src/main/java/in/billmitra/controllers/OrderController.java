package in.billmitra.controllers;

import in.billmitra.dto.*;
import in.billmitra.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
}
