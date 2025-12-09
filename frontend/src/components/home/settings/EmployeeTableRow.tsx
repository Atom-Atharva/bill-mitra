import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

interface EmployeeTableRowProps {
    employee: any;
    canDelete: boolean;
    onDelete?: () => void;
}

const EmployeeTableRow = ({ employee, canDelete, onDelete }: EmployeeTableRowProps) => {
    const getRoleBadgeColor = (role: string) => {
        switch (role.toUpperCase()) {
            case 'MANAGER':
                return 'bg-purple-100 text-purple-700';
            case 'EMPLOYEE':
                return 'bg-blue-100 text-blue-700';
            case 'OWNER':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <tr className="border-b hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{employee.id}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{employee.name}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{employee.email}</td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(employee.role)}`}>
                    {employee.role}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{employee.createdBy?.username || "-"}</td>

            <td className="px-2 py-2 text-right">
                <Tooltip
                    title={canDelete ? "Delete employee" : "You don't have permission"}
                    arrow
                >
                    <span>
                        <button
                            disabled={!canDelete}
                            onClick={onDelete}
                            className={`${canDelete
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
};

export default EmployeeTableRow;
