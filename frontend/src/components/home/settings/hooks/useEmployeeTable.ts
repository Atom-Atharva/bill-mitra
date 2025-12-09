import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const ROWS_PER_PAGE = 5;

export type SortField = "id" | "name" | "email" | "role" | "createdBy";

export const useEmployeeTable = () => {
    const employees = useSelector(
        (state: RootState) => state.employee.employees
    );

    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);

    // Filtering
    const filteredEmployees = useMemo(() => {
        return employees.filter((e) =>
            `${e.id} ${e.name} ${e.email} ${e.role} ${e.createdBy?.username ?? ""}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [employees, search]);

    // Sorting
    const sortedEmployees = useMemo(() => {
        const sorted = [...filteredEmployees];

        if (!sortField) return sorted;

        sorted.sort((a, b) => {
            // numeric sort for id
            if (sortField === "id") {
                const aId = Number(a.id ?? 0);
                const bId = Number(b.id ?? 0);
                return sortOrder === "asc" ? aId - bId : bId - aId;
            }

            // createdBy -> username string
            if (sortField === "createdBy") {
                const A = (a.createdBy?.username ?? "").toLowerCase();
                const B = (b.createdBy?.username ?? "").toLowerCase();
                return sortOrder === "asc"
                    ? A.localeCompare(B)
                    : B.localeCompare(A);
            }

            // default string fields (name, email, role)
            const A = String((a as any)[sortField] ?? "").toLowerCase();
            const B = String((b as any)[sortField] ?? "").toLowerCase();
            return sortOrder === "asc"
                ? A.localeCompare(B)
                : B.localeCompare(A);
        });

        return sorted;
    }, [filteredEmployees, sortField, sortOrder]);

    // Pagination
    const totalPages = Math.max(
        1,
        Math.ceil(sortedEmployees.length / ROWS_PER_PAGE)
    );

    const paginatedEmployees = sortedEmployees.slice(
        (page - 1) * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );

    // Sorting Handler
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return {
        search,
        sortField,
        sortOrder,
        page,
        totalPages,
        paginatedEmployees,
        handleSort,
        handleSearch,
        setPage,
    };
};
