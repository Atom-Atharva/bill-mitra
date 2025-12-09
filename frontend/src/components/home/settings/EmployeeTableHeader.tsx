import type { SortField } from "./hooks/useEmployeeTable";

interface EmployeeTableHeaderProps {
    sortField: SortField | null;
    sortOrder: "asc" | "desc";
    onSort: (field: SortField) => void;
}

const EmployeeTableHeader = ({ sortField, sortOrder, onSort }: EmployeeTableHeaderProps) => {
    const getSortIcon = (field: SortField) => {
        if (sortField === field) {
            return sortOrder === "asc" ? "↑" : "↓";
        }
        return "";
    };

    return (
        <thead className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <tr>
                <th
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => onSort("id")}
                >
                    <div className="flex items-center justify-center gap-1">
                        ID {getSortIcon("id")}
                    </div>
                </th>

                <th
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => onSort("name")}
                >
                    <div className="flex items-center justify-center gap-1">
                        Name {getSortIcon("name")}
                    </div>
                </th>

                <th
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => onSort("email")}
                >
                    <div className="flex items-center justify-center gap-1">
                        Email {getSortIcon("email")}
                    </div>
                </th>

                <th
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => onSort("role")}
                >
                    <div className="flex items-center justify-center gap-1">
                        Role {getSortIcon("role")}
                    </div>
                </th>

                <th
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => onSort("createdBy")}
                >
                    <div className="flex items-center justify-center gap-1">
                        Created By {getSortIcon("createdBy")}
                    </div>
                </th>

                <th className="px-6 py-4 w-16 text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>
    );
};

export default EmployeeTableHeader;
