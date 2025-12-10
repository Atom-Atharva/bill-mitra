import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface DiscardDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DiscardDialog = ({ open, onClose, onConfirm }: DiscardDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="flex items-center gap-2">
                <WarningAmberIcon className="text-orange-500" />
                Discard All Items?
            </DialogTitle>
            <DialogContent>
                Are you sure you want to remove all items from the cart? This action cannot be undone.
            </DialogContent>
            <DialogActions className='m-2'>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Discard All
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DiscardDialog;
