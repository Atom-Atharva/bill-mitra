import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { formatIndianPrice } from '@/utils/formatIndianPrice';

interface ItemDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    itemData: {
        item: {
            name: string;
            description: string;
            categoryName: string;
            price: number;
            imgUrl: string;
        };
        quantity: number;
    } | undefined;
}

const ItemDetailsDialog: React.FC<ItemDetailsDialogProps> = ({
    open,
    onClose,
    itemData,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className="bg-emerald-50 border-b">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 text-2xl">🌟</span>
                    </div>
                    <span className="text-xl font-bold">Most Sellable Item</span>
                </div>
            </DialogTitle>
            <DialogContent className="mt-4">
                {itemData && (
                    <div className="space-y-4">
                        <div className="flex justify-center mb-4">
                            <img
                                src={itemData.item.imgUrl}
                                alt={itemData.item.name}
                                className="w-48 h-48 object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Product Name</p>
                            <p className="text-xl font-semibold text-gray-800">{itemData.item.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Description</p>
                            <p className="text-lg text-gray-800">{itemData.item.description}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Category</p>
                            <p className="text-lg text-gray-800 font-medium">{itemData.item.categoryName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Price</p>
                            <p className="text-lg text-gray-800 font-semibold">{formatIndianPrice(itemData.item.price)}</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                            <p className="text-sm text-gray-600 mb-1">Total Units Sold</p>
                            <p className="text-3xl font-bold text-emerald-600">{itemData.quantity}</p>
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

export default ItemDetailsDialog;
