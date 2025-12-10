import { useState } from "react";
import { Drawer, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface AddCategoryDrawerProps {
    open: boolean;
    isPending: boolean;
    onClose: () => void;
    onAdd: (data: {
        name: string;
        description: string;
        bgColor: string;
        file: File;
    }) => void;
}

const AddCategoryDrawer = ({ open, isPending, onClose, onAdd }: AddCategoryDrawerProps) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categoryBgColor, setCategoryBgColor] = useState("#D9D9D9");
    const [categoryFile, setCategoryFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCategoryFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddCategory = () => {
        if (!categoryName.trim() || !categoryFile) {
            alert("Please provide category name and image");
            return;
        }

        onAdd({
            name: categoryName,
            description: categoryDescription,
            bgColor: categoryBgColor,
            file: categoryFile
        });

        // Reset form
        setCategoryName("");
        setCategoryDescription("");
        setCategoryBgColor("#D9D9D9");
        setCategoryFile(null);
        setPreviewUrl("");
    };

    const handleClose = () => {
        setCategoryName("");
        setCategoryDescription("");
        setCategoryBgColor("#D9D9D9");
        setCategoryFile(null);
        setPreviewUrl("");
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={handleClose}>
            <div className="w-96 h-full flex flex-col">
                {/* Drawer Header */}
                <div className="p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-white">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Add New Category</h2>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="space-y-6">
                        <TextField
                            label="Category Name"
                            variant="outlined"
                            fullWidth
                            required
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            helperText="Enter a unique category name"
                        />

                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={categoryDescription}
                            onChange={(e) => setCategoryDescription(e.target.value)}
                            helperText="Brief description of the category"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Background Color <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={categoryBgColor}
                                    onChange={(e) => setCategoryBgColor(e.target.value)}
                                    className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
                                />
                                <TextField
                                    value={categoryBgColor}
                                    onChange={(e) => setCategoryBgColor(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    placeholder="#D9D9D9"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Choose a color for category badge and accents</p>
                        </div>

                        <div>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                startIcon={<CloudUploadIcon />}
                                className="h-14"
                            >
                                {categoryFile ? categoryFile.name : "Upload Category Image"}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <p className="text-xs text-gray-500 mt-1">Upload an image for the category</p>
                        </div>

                        {/* Image Preview */}
                        {previewUrl && (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <p className="text-sm font-medium text-gray-700 p-2 bg-gray-50">Preview</p>
                                <div style={{ backgroundColor: categoryBgColor }}>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
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
                        onClick={handleAddCategory}
                        disabled={!categoryName.trim() || !categoryFile || isPending}
                    >
                        {isPending ? "Adding Category..." : "Add Category"}
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

export default AddCategoryDrawer;
