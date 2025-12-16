package in.billmitra.services.impl;

import in.billmitra.dto.AuthRequest;
import in.billmitra.dto.RegisterStoreRequest;
import in.billmitra.dto.RegisterUserRequest;
import in.billmitra.entities.StoreEntity;
import in.billmitra.entities.UserEntity;
import in.billmitra.entities.enums.Role;
import in.billmitra.repositories.StoreRepository;
import in.billmitra.repositories.UserRepository;
import in.billmitra.security.CustomUserDetails;
import in.billmitra.services.AuthService;
import in.billmitra.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;

    @Value("${app.cookie.secure}")
    private boolean isCookieSecure;

    @Override
    public void registerStoreAndOwner(RegisterStoreRequest request, HttpServletResponse response) {
        // Fetch Name and create Store
        Optional<StoreEntity> existingStore = storeRepository.findByName(request.getStoreName());
        if (existingStore.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Store already exists");
        }

        String storeName = request.getStoreName();
        StoreEntity store = StoreEntity.builder().name(storeName).build();

        try {
            store = storeRepository.save(store);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to register store");
        }

        // Register User with ROLE = "OWNER"
        RegisterUserRequest registerUserRequest = RegisterUserRequest.builder()
                .email(request.getUserEmail())
                .name(request.getUserName())
                .password(request.getUserPassword())
                .role(Role.OWNER)
                .build();

        try {
            registerUserAndLogin(registerUserRequest, store.getId(),request.getIsRememberMeChecked(), response);
        } catch (ResponseStatusException e) {
            // Delete Store
            storeRepository.delete(store);

            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            // Delete Store
            storeRepository.delete(store);

            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to register user");
        }
    }

    @Override
    public void registerUser(RegisterUserRequest request) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }

        // Get Store from SecurityContextHolder
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long storeId = customUserDetails.getStoreId();
        Long userId = customUserDetails.getUser().getId();

        try {
            saveUserInStore(request, storeId, userId);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public void loginUser(AuthRequest request, HttpServletResponse response) {
        // Authenticate the Credentials --> Internally doing all the work.
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        // Load the User
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(isCookieSecure)
                .sameSite(isCookieSecure ? "None" : "Lax")
                .path("/")
                .maxAge(request.getIsRememberMeChecked()
                        ? 8 * 60 * 60
                        : 60 * 60)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    @Override
    public void logoutUser(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(isCookieSecure)
                .sameSite(isCookieSecure ? "None" : "Lax")
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private void registerUserAndLogin(RegisterUserRequest request, Long storeId, Boolean isRememberMeChecked, HttpServletResponse response) {
        try {
            saveUserInStore(request, storeId,null);
        } catch (ResponseStatusException e) {
            e.printStackTrace();
            throw e;
        }

        // Login User and Send Back Cookie
        AuthRequest authRequest = AuthRequest.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .isRememberMeChecked(isRememberMeChecked)
                .build();

        try {
            loginUser(authRequest, response);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to login user");
        }
    }

    private void saveUserInStore(RegisterUserRequest request, Long storeId, Long userId) {
        StoreEntity store = storeRepository.findById(storeId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found"));
        UserEntity createdBy = null;
        if (userId != null) {
            createdBy = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        }

        Role role = (request.getRole() != null) ? request.getRole() : Role.EMPLOYEE;
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        UserEntity user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(hashedPassword)
                .role(role)
                .store(store)
                .createdBy(createdBy)
                .build();

        try {
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to register user");
        }
    }
}
