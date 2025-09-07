package in.billmitra.utils;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import in.billmitra.dto.PaymentRequest;
import in.billmitra.entities.OrderEntity;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

@Component
public class RazorpayUtil {
    @Value("${rzp.api.key}")
    private String RAZORPAY_API_KEY;

    @Value("${rzp.api.secret}")
    private String RAZORPAY_API_SECRET;

    @Value("${rzp.api.currency}")
    private String RAZORPAY_API_CURRENCY;

    public Order createPaymentOrder(OrderEntity order) {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_API_KEY, RAZORPAY_API_SECRET);

            JSONObject orderRequest = new JSONObject();
            // Amount is in currency subunits.
            orderRequest.put("amount", order.getTotalAmount() * 100);
            orderRequest.put("currency", RAZORPAY_API_CURRENCY);
            orderRequest.put("receipt", order.getId());
            JSONObject notes = new JSONObject();
            // Key-value pair to store additional information.
            notes.put("Cashier", order.getCreatedBy());
            orderRequest.put("notes", notes);

            // Create a Payment Order on RazorPay.
            return razorpayClient.orders.create(orderRequest);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to create payment order" + e.getMessage());
        }
    }

    public boolean verifyRazorPaySignature(PaymentRequest paymentRequest) {
        try {
            // Generate Signature
            String data = paymentRequest.getTransactionId() + "|" + paymentRequest.getRazorPayPaymentId();

            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(RAZORPAY_API_SECRET.getBytes(), "HmacSHA256");
            sha256Hmac.init(secretKey);

            byte[] hash = sha256Hmac.doFinal(data.getBytes());

            String generatedSignature = bytesToHex(hash);

            // Razorpay sends HEX string (not Base64), so compare in constant-time
            return generatedSignature.equalsIgnoreCase(paymentRequest.getRazorPaySignature());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while generating/verifying Razorpay signature", e);
        }
    }

    // For converting BASE64 to HEX
    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
