package in.billmitra.repositories;

import in.billmitra.dto.DailySalesDto;
import in.billmitra.dto.SalesEmployeeBillDto;
import in.billmitra.dto.SalesItemDto;
import in.billmitra.dto.SalesReportDto;
import in.billmitra.entities.OrderEntity;
import in.billmitra.entities.enums.TransactionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findByTransactionId(String transactionId);

    Page<OrderEntity> findByStoreIdAndTransactionStatus(
            Long storeId,
            TransactionStatus transactionStatus,
            Pageable pageable
    );

    @Query("""
            SELECT new in.billmitra.dto.SalesReportDto(
                        CAST(COALESCE(SUM(o.totalAmount) , 0.0) AS DOUBLE),
                        COALESCE(COUNT(o),0)
            )
            FROM OrderEntity o
                        WHERE o.store.id = :storeId
                        AND o.transactionStatus = in.billmitra.entities.enums.TransactionStatus.SUCCESS
            """)
    SalesReportDto getTotalSalesByStoreId(Long storeId);

    @Query("""
            SELECT new in.billmitra.dto.SalesReportDto(
                        CAST(COALESCE(SUM(o.totalAmount) , 0.0) AS DOUBLE),
                        COALESCE(COUNT(o),0)
            )
            FROM OrderEntity o
                        WHERE o.store.id = :storeId
                        AND o.transactionStatus = in.billmitra.entities.enums.TransactionStatus.SUCCESS
                        AND MONTH(o.createdAt) = MONTH(CURRENT_DATE)
                        AND YEAR(o.createdAt) = YEAR(CURRENT_DATE)
            """)
    SalesReportDto getMonthlySalesByStoreId(Long storeId);

    @Query("""
            SELECT new in.billmitra.dto.SalesReportDto(
                        CAST(COALESCE(SUM(o.totalAmount) , 0.0) AS DOUBLE),
                        COALESCE(COUNT(o),0)
            )
            FROM OrderEntity o
                        WHERE o.store.id = :storeId
                        AND o.transactionStatus = in.billmitra.entities.enums.TransactionStatus.SUCCESS
                        AND DATE(o.createdAt) = CURRENT_DATE
            """)
    SalesReportDto getDailySalesByStoreId(Long storeId);

    @Query("""
            SELECT new in.billmitra.dto.SalesReportDto(
                        CAST(COALESCE(SUM(o.totalAmount) , 0.0) AS DOUBLE),
                        COALESCE(COUNT(o),0)
            )
            FROM OrderEntity o
                        WHERE o.store.id = :storeId
                        AND o.transactionStatus = in.billmitra.entities.enums.TransactionStatus.SUCCESS
                        AND o.createdBy.id = :userId
            """)
    SalesReportDto getTotalSalesOfEmployeeByStoreId(Long storeId, Long userId);

    @Query("""
            SELECT new in.billmitra.dto.SalesReportDto(
                        CAST(COALESCE(SUM(o.totalAmount) , 0.0) AS DOUBLE),
                        COALESCE(COUNT(o),0)
            )
            FROM OrderEntity o
                        WHERE o.store.id = :storeId
                        AND o.transactionStatus = in.billmitra.entities.enums.TransactionStatus.SUCCESS
                        AND MONTH(o.createdAt) = MONTH(CURRENT_DATE)
                        AND YEAR(o.createdAt) = YEAR(CURRENT_DATE)
                        AND o.createdBy.id = :userId
            """)
    SalesReportDto getMonthlySalesOfEmployeeByStoreId(Long storeId, Long userId);

    @Query("""
            SELECT new in.billmitra.dto.SalesReportDto(
                        CAST(COALESCE(SUM(o.totalAmount) , 0.0) AS DOUBLE),
                        COALESCE(COUNT(o),0)
            )
            FROM OrderEntity o
                        WHERE o.store.id = :storeId
                        AND o.transactionStatus = in.billmitra.entities.enums.TransactionStatus.SUCCESS
                        AND DATE(o.createdAt) = CURRENT_DATE
                        AND o.createdBy.id = :userId
            """)
    SalesReportDto getDailySalesOfEmployeeByStoreId(Long storeId, Long userId);


    @Query("""
                    SELECT new in.billmitra.dto.SalesEmployeeBillDto(
                            new in.billmitra.dto.UserDto(
                                o.createdBy.id,
                                o.createdBy.name,
                                o.createdBy.email,
                                o.createdBy.role
                            ),
                            COUNT(o)
                        )
                    FROM OrderEntity o
                        WHERE o.store.id = :storeId
                        AND o.transactionStatus = in.billmitra.entities.enums.TransactionStatus.SUCCESS
                        AND MONTH(o.createdAt) = MONTH(CURRENT_DATE)
                        AND YEAR(o.createdAt) = YEAR(CURRENT_DATE)
                        GROUP BY
                                o.createdBy.id,
                                o.createdBy.name,
                                o.createdBy.email,
                                o.createdBy.role
                        ORDER BY COUNT(o) DESC
            """)
    List<SalesEmployeeBillDto> getMostHardworkingEmployeeOfTheMonth(Long storeId);

    @Query("""
                SELECT new in.billmitra.dto.SalesItemDto(
                                    new in.billmitra.dto.ItemDto(
                                        oim.item.id,
                                        oim.item.name,
                                        oim.item.description,
                                        oim.item.price,
                                        oim.item.imgUrl,
                                        oim.item.bgColor,
                                        oim.item.category.name
                                    ),
                                    SUM(oim.quantity)
                                )
                FROM OrderItemMappingEntity oim
                JOIN OrderEntity o
                ON o.id = oim.order.id
                WHERE oim.store.id = :storeId
                      AND o.transactionStatus = in.billmitra.entities.enums.TransactionStatus.SUCCESS
                      AND MONTH(o.createdAt) = MONTH(CURRENT_DATE)
                      AND YEAR(o.createdAt) = YEAR(CURRENT_DATE)
                GROUP BY
                      oim.item.id,
                      oim.item.name,
                      oim.item.price,
                      oim.item.imgUrl,
                      oim.item.description,
                      oim.item.bgColor,
                      oim.item.category.name
                ORDER BY SUM(oim.quantity) DESC
            """)
    List<SalesItemDto> getMostSellableItemInStore(Long storeId);

    @Query("""
            SELECT new in.billmitra.dto.DailySalesDto(
                    CAST(o.createdAt AS localdate) ,
                    COALESCE(SUM(o.totalAmount), 0),
                    COUNT(o)
                )
                FROM OrderEntity o
                WHERE o.store.id = :storeId
                  AND o.transactionStatus = in.billmitra.entities.enums.TransactionStatus.SUCCESS
                  AND o.createdAt BETWEEN :fromDate AND :toDate
                GROUP BY DATE(o.createdAt)
                ORDER BY DATE(o.createdAt)
            """)
    List<DailySalesDto> getDailySalesInTimeline(Long storeId, Timestamp fromDate, Timestamp toDate);
}
