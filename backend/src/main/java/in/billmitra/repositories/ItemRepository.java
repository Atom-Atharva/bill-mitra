package in.billmitra.repositories;


import in.billmitra.entities.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity,Long> {
    Optional<ItemEntity> findByCategory_idAndName(Long categoryId, String name);
    List<ItemEntity> findAllByCategory_id(Long categoryId);
    List<ItemEntity> findAllByIdInAndStore_id(List<Long> itemIds, Long storeId);
}
