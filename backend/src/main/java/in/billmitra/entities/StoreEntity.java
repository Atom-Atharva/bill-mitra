package in.billmitra.entities;

import in.billmitra.utils.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "ref_store")
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class StoreEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<UserEntity> users;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<CategoryEntity> categories;
}
