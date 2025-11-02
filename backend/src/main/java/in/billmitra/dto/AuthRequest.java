package in.billmitra.dto;

import lombok.*;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    private String email;
    private String password;
    private Boolean isRememberMeChecked = false;
}
