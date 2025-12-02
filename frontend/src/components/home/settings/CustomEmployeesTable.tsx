import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import type { RootState } from "@/store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const ROWS_PER_PAGE = 5;

const CustomEmployeesTable = () => {
    const employees = useSelector((state: RootState) => state.employee.employees);
    const currentUser = useSelector((state: RootState) => state.user.user); // logged-in user

    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<
        "id" | "name" | "email" | "role" | "createdBy" | null
    >(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);

    // ---------------- Delete Permission Logic ----------------
    const canDelete = (emp: any) => {
        if (!currentUser) return false;

        const myRole = currentUser.role;
        const myEmail = currentUser.email;

        if (emp.email === myEmail) return false; // cannot delete yourself

        if (myRole === "OWNER") return true; // owner can delete all except themselves

        if (myRole === "MANAGER") {
            return emp.role === "EMPLOYEE"; // manager can only delete employees
        }

        return false; // employee cannot delete anyone
    };
    // ---------------------------------------------------------

    // ---------------- Filtering -----------------
    const filteredEmployees = useMemo(() => {
        return employees.filter((e) =>
            `${e.id} ${e.name} ${e.email} ${e.role} ${e.createdBy?.username ?? ""}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [employees, search]);

    // ---------------- Sorting ------------------
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
                return sortOrder === "asc" ? A.localeCompare(B) : B.localeCompare(A);
            }

            // default string fields (name, email, role)
            const A = String((a as any)[sortField] ?? "").toLowerCase();
            const B = String((b as any)[sortField] ?? "").toLowerCase();
            return sortOrder === "asc" ? A.localeCompare(B) : B.localeCompare(A);
        });

        return sorted;
    }, [filteredEmployees, sortField, sortOrder]);

    // ---------------- Pagination -----------------
    const totalPages = Math.max(1, Math.ceil(sortedEmployees.length / ROWS_PER_PAGE));

    const paginatedEmployees = sortedEmployees.slice(
        (page - 1) * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );

    // ---------------- Sorting Handler -----------
    const handleSort = (field: "id" | "name" | "email" | "role" | "createdBy") => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    return (
        <div className="space-y-4">
            {/* Header: Title Left + Search Right */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">All Employees</h2>

                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 border rounded-lg w-64 focus:outline-none"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-300">
                <table className="min-w-full bg-white text-center">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th
                                className="px-4 py-2 cursor-pointer"
                                onClick={() => handleSort("id")}
                            >
                                ID {sortField === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>

                            <th
                                className="px-4 py-2 cursor-pointer"
                                onClick={() => handleSort("name")}
                            >
                                Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>

                            <th
                                className="px-4 py-2 cursor-pointer"
                                onClick={() => handleSort("email")}
                            >
                                Email {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>

                            <th
                                className="px-4 py-2 cursor-pointer"
                                onClick={() => handleSort("role")}
                            >
                                Role {sortField === "role" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>

                            <th
                                className="px-4 py-2 cursor-pointer"
                                onClick={() => handleSort("createdBy")}
                            >
                                Created By{" "}
                                {sortField === "createdBy" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </th>

                            <th className="px-2 py-2 w-10"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedEmployees.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-4 text-gray-500">
                                    No employees found.
                                </td>
                            </tr>
                        )}

                        {paginatedEmployees.map((emp) => {
                            const allowed = canDelete(emp);

                            return (
                                <tr key={emp.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{emp.id}</td>
                                    <td className="px-4 py-2">{emp.name}</td>
                                    <td className="px-4 py-2">{emp.email}</td>
                                    <td className="px-4 py-2">{emp.role}</td>
                                    <td className="px-4 py-2">{emp.createdBy?.username || "-"}</td>

                                    <td className="px-2 py-2 text-right">
                                        <Tooltip
                                            title={allowed ? "Delete employee" : "You don't have permission"}
                                            arrow
                                        >
                                            <span>
                                                <button
                                                    disabled={!allowed}
                                                    className={`${allowed
                                                        ? "text-red-500 hover:text-red-600"
                                                        : "text-gray-400 cursor-not-allowed"
                                                        }`}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </button>
                                            </span>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                    Prev
                </button>

                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CustomEmployeesTable;
