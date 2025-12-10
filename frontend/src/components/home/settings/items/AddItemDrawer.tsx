import { useState } from "react";
import { Drawer, IconButton, TextField, MenuItem, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Category {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    bgColor: string;
}

interface AddItemDrawerProps {
    open: boolean;
    categories: Category[];
    isPending: boolean;
    onClose: () => void;
    onAdd: (data: {
        name: string;
        description: string;
        price: number;
        categoryId: number;
        file: File;
    }) => void;
}

const AddItemDrawer = ({ open, categories, isPending, onClose, onAdd }: AddItemDrawerProps) => {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
    const [itemFile, setItemFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setItemFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddItem = () => {
        if (!itemName.trim() || !itemFile || !selectedCategoryId || !itemPrice) {
            alert("Please provide all required fields");
            return;
        }

        const price = parseFloat(itemPrice);
        if (isNaN(price) || price <= 0) {
            alert("Please enter a valid price");
            return;
        }

        onAdd({
            name: itemName,
            description: itemDescription,
            price: price,
            categoryId: selectedCategoryId as number,
            file: itemFile
        });

        // Reset form
        setItemName("");
        setItemDescription("");
        setItemPrice("");
        setSelectedCategoryId("");
        setItemFile(null);
        setPreviewUrl("");
    };

    const handleClose = () => {
        setItemName("");
        setItemDescription("");
        setItemPrice("");
        setSelectedCategoryId("");
        setItemFile(null);
        setPreviewUrl("");
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={handleClose}>
            <div className="w-96 h-full flex flex-col">
                {/* Drawer Header */}
                <div className="p-6 border-b border-gray-200 bg-linear-to-r from-green-50 to-white">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Add New Item</h2>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="space-y-6">
                        <TextField
                            label="Item Name"
                            variant="outlined"
                            fullWidth
                            required
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            helperText="Enter the item name"
                        />

                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                            helperText="Brief description of the item"
                        />

                        <TextField
                            label="Price"
                            variant="outlined"
                            type="number"
                            fullWidth
                            required
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            helperText="Enter the price in rupees"
                            inputProps={{ min: 0, step: 0.01 }}
                        />

                        <TextField
                            select
                            label="Category"
                            variant="outlined"
                            fullWidth
                            required
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                            helperText="Select a category for this item"
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <div>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                startIcon={<CloudUploadIcon />}
                                className="h-14"
                            >
                                {itemFile ? itemFile.name : "Upload Item Image"}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <p className="text-xs text-gray-500 mt-1">Upload an image for the item</p>
                        </div>

                        {/* Image Preview */}
                        {previewUrl && (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <p className="text-xs text-gray-600 p-2 bg-gray-50 border-b">Preview</p>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-3">
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleAddItem}
                        disabled={!itemName.trim() || !itemFile || !selectedCategoryId || !itemPrice || isPending}
                    >
                        {isPending ? "Adding Item..." : "Add Item"}
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        onClick={handleClose}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default AddItemDrawer;
