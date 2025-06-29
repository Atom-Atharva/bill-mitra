package in.billmitra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterStoreRequest {
    private String userName;
    private String userEmail;
    private String userPassword;
    private String storeName;
}
