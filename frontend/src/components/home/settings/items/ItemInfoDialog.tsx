import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    bgColor: string;
    categoryName: string;
}

interface ItemInfoDialogProps {
    open: boolean;
    item: Item | null;
    onClose: () => void;
}

const ItemInfoDialog = ({ open, item, onClose }: ItemInfoDialogProps) => {
    if (!item) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle className="bg-linear-to-r from-green-50 to-white border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Item Details</p>
                    </div>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        className="hover:bg-gray-200"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent className="p-6">
                <div className="space-y-6 mt-4">
                    <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                        <img
                            src={item.imgUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                            }}
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span className="w-1 h-5 bg-green-600 rounded"></span>
                            Description
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed pl-3">
                            {item.description || 'No description available'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                            <h4 className="text-sm font-semibold text-green-800 mb-2">Price</h4>
                            <p className="text-3xl font-bold text-green-600">₹{item.price}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                            <h4 className="text-sm font-semibold text-blue-800 mb-2">Category</h4>
                            <p className="text-xl font-bold text-blue-600">{item.categoryName}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions className="p-4 bg-gray-50 border-t">
                <Button
                    onClick={onClose}
                    variant="contained"
                    size="large"
                    className="px-8"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ItemInfoDialog;
