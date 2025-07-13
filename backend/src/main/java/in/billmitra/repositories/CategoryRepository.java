package in.billmitra.repositories;

import in.billmitra.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Long>{
    Optional<CategoryEntity> findByStore_idAndName(Long storeId, String name);
    List<CategoryEntity> findAllByStore_Id(Long storeId);
}
