import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface EmployeeDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    employeeData: {
        user: {
            name: string;
            email: string;
            role: string;
            id: number;
        };
        bills: number;
    } | undefined;
}

const EmployeeDetailsDialog: React.FC<EmployeeDetailsDialogProps> = ({
    open,
    onClose,
    employeeData,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="bg-orange-50 border-b">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                        <span className="text-orange-700 text-2xl">🏆</span>
                    </div>
                    <span className="text-xl font-bold">Most Hardworking Employee</span>
                </div>
            </DialogTitle>
            <DialogContent className="mt-4">
                {employeeData && (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Name</p>
                            <p className="text-xl font-semibold text-gray-800">{employeeData.user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Email</p>
                            <p className="text-lg text-gray-800">{employeeData.user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Role</p>
                            <p className="text-lg text-gray-800 font-medium">{employeeData.user.role}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Employee ID</p>
                            <p className="text-lg text-gray-800">{employeeData.user.id}</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <p className="text-sm text-gray-600 mb-1">Total Bills Processed</p>
                            <p className="text-3xl font-bold text-orange-600">{employeeData.bills}</p>
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions className="p-4">
                <Button onClick={onClose} variant="contained" color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeDetailsDialog;
