import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface DeleteConfirmDialogProps {
    open: boolean;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
}

const DeleteConfirmDialog = ({ open, isDeleting, onClose, onConfirm, itemName }: DeleteConfirmDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="flex items-center gap-2">
                <WarningAmberIcon className="text-orange-500" />
                Delete Item?
            </DialogTitle>
            <DialogContent>
                Are you sure you want to delete {itemName ? `"${itemName}"` : "this item"}? This action cannot be undone.
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained" disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmDialog;
