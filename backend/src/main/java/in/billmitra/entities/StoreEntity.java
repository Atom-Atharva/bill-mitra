package in.billmitra.entities;

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

    @Column(nullable = false, unique = true)
    private String name;

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
