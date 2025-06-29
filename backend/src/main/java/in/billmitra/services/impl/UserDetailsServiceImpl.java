package in.billmitra.services.impl;

import in.billmitra.entities.UserEntity;
import in.billmitra.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with Email: " + email));

        // Tell Spring what this user's credentials and roles are
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                // Add "ROLE_" prefix here to comply with Spring Security
                // "OWNER" → "ROLE_OWNER"
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}
