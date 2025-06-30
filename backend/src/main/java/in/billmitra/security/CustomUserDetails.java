package in.billmitra.security;

import in.billmitra.entities.Role;
import in.billmitra.entities.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class CustomUserDetails implements UserDetails {
    private final UserEntity user;

    public CustomUserDetails(UserEntity user) {
        this.user = user;
    }

    public Role getRole() {
        return user.getRole();
    }

    public Long getStoreId() {
        return user.getStore() != null ? user.getStore().getId() : null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Add "ROLE_" prefix here to comply with Spring Security
        // "OWNER" → "ROLE_OWNER"
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }
}
