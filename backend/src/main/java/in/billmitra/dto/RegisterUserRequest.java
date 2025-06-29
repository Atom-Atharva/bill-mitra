package in.billmitra.dto;

import in.billmitra.entities.Role;
import in.billmitra.entities.StoreEntity;
import lombok.*;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class RegisterUserRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
    private Long storeId;
}
