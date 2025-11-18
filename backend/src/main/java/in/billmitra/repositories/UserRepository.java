package in.billmitra.repositories;

import in.billmitra.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByEmail(String email);
    List<UserEntity> findAllByStore_id(Long storeId);
}
