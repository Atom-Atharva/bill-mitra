package in.billmitra.dto;

import in.billmitra.entities.UserEntity;
import in.billmitra.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private CreatedByDto createdBy;
}
