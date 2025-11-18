package in.billmitra.dto;

import in.billmitra.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class CreatedByDto {
    private Long id;
    private String username;
    private Role role;
}
