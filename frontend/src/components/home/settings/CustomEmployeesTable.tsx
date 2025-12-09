import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { useEmployeeTable } from "./hooks/useEmployeeTable";
import { canDeleteEmployee } from "./utils/employeePermissions";
import EmployeeTableHeader from "./EmployeeTableHeader";
import EmployeeTableRow from "./EmployeeTableRow";
import Pagination from "./Pagination";
import SearchIcon from "@mui/icons-material/Search";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/apis/deleteUser";
import { removeEmployee } from "@/store/employeeSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useState } from "react";

const CustomEmployeesTable = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<{ id: bigint; name: string } | null>(null);

    const { mutate: deleteEmployeeMutation } = useMutation({
        mutationFn: deleteUser,
        onSuccess: (_, userId) => {
            dispatch(removeEmployee(userId));
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        },
        onError: (error: Error) => {
            alert(`Failed to delete user: ${error.message}`);
            setDeleteDialogOpen(false);
        }
    });

    const handleDeleteEmployee = (userId: bigint, userName: string) => {
        setUserToDelete({ id: userId, name: userName });
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            deleteEmployeeMutation(userToDelete.id);
        }
    };

    const cancelDelete = () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const {
        search,
        sortField,
        sortOrder,
        page,
        totalPages,
        paginatedEmployees,
        handleSort,
        handleSearch,
        setPage,
    } = useEmployeeTable();

    return (
        <div className="space-y-6 p-6">
            {/* Header: Title Left + Search Right */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">All Employees</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your team members</p>
                </div>

                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-center">
                        <EmployeeTableHeader
                            sortField={sortField}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                        />

                        <tbody>
                            {paginatedEmployees.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12 text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <SearchIcon className="text-gray-300 mb-2" fontSize="large" />
                                            <p className="text-lg">No employees found</p>
                                            <p className="text-sm text-gray-400">Try adjusting your search</p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {paginatedEmployees.map((emp) => (
                                <EmployeeTableRow
                                    key={emp.id}
                                    employee={emp}
                                    canDelete={canDeleteEmployee(emp, currentUser)}
                                    onDelete={() => handleDeleteEmployee(emp.id, emp.name)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination inside the card */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={cancelDelete}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle className="flex items-center gap-2">
                    <WarningAmberIcon className="text-red-500" fontSize="large" />
                    <span className="font-bold text-gray-800">Delete Employee</span>
                </DialogTitle>
                <DialogContent>
                    <p className="text-gray-700">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-gray-900">{userToDelete?.name}</span>?
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        This action cannot be undone. All data associated with this employee will be permanently removed.
                    </p>
                </DialogContent>
                <DialogActions className="m-2">
                    <Button onClick={cancelDelete} variant="outlined" color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} variant="contained" color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CustomEmployeesTable;
