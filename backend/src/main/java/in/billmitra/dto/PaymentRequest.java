package in.billmitra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@RequiredArgsConstructor
public class PaymentRequest {
    private String razorPayPaymentId;
    private String transactionId;
    private String razorPaySignature;
}
