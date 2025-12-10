import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllItems } from "@/apis/fetchAllItems";
import { addAllItems } from "@/store/itemSlice";
import { formatIndianPrice } from "@/utils/formatIndianPrice";

interface Category {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    bgColor: string;
}

interface CategoryInfoDialogProps {
    open: boolean;
    category: Category | null;
    onClose: () => void;
}

const CategoryInfoDialog = ({ open, category, onClose }: CategoryInfoDialogProps) => {
    const dispatch = useDispatch();
    const allItems = useSelector((state: RootState) => state.item.items);

    // Fetch items for this category when dialog opens
    const { data: fetchedItems, isLoading } = useQuery({
        queryKey: ["categoryItems", category?.id],
        queryFn: () => fetchAllItems(category!.id),
        enabled: !!category?.id && open,
    });

    // Update Redux store with fetched items
    useEffect(() => {
        if (fetchedItems && Array.isArray(fetchedItems) && fetchedItems.length > 0) {
            // Merge with existing items, avoiding duplicates
            const existingItemIds = new Set(allItems.map(item => item.id));
            const newItems = fetchedItems.filter(item => !existingItemIds.has(item.id));

            if (newItems.length > 0) {
                dispatch(addAllItems([...allItems, ...newItems]));
            }
        }
    }, [fetchedItems, dispatch, allItems]);

    // Filter items by category name
    const categoryItems = useMemo(() => {
        if (!category) return [];
        return allItems.filter(item => item.categoryName === category.name);
    }, [allItems, category]);

    if (!category) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle className="bg-linear-to-r from-blue-50 to-white border-b">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{category.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Category Details</p>
                    </div>
                    <IconButton onClick={onClose} size="small" className="hover:bg-gray-200">
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent className="p-6">
                <div className="space-y-6 mt-4">
                    <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                        <img
                            src={category.imgUrl}
                            alt={category.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                            }}
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span className="w-1 h-5 bg-blue-600 rounded"></span>
                            Description
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed pl-3">
                            {category.description || 'No description available'}
                        </p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                        <h4 className="text-sm font-semibold text-purple-800 mb-3">Category Color</h4>
                        <div className="flex items-center gap-4">
                            <div
                                className="w-20 h-20 rounded-xl shadow-lg border-2 border-white ring-2 ring-purple-300"
                                style={{ backgroundColor: category.bgColor }}
                            />
                            <div>
                                <p className="text-xs text-purple-600 font-medium mb-1">HEX Code</p>
                                <p className="text-2xl font-bold font-mono text-purple-800">{category.bgColor}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items in Category */}
                    <div className="bg-white rounded-lg border-2 border-gray-200">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                <Inventory2Icon className="text-gray-600" />
                                Items in this Category
                                <span className="text-sm font-normal text-gray-500">({categoryItems.length})</span>
                            </h4>
                        </div>
                        <div className="p-4">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <p className="text-gray-500">Loading items...</p>
                                </div>
                            ) : categoryItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                    <Inventory2Icon style={{ fontSize: 48 }} className="mb-2" />
                                    <p className="text-sm">No items in this category</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {categoryItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-3 border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all bg-white"
                                        >
                                            <div className="relative w-24 h-24 shrink-0 bg-gray-100">
                                                <img
                                                    src={item.imgUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1 p-3 min-w-0">
                                                <h5 className="font-bold text-gray-800 text-sm line-clamp-1 mb-1">{item.name}</h5>
                                                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{item.description || 'No description'}</p>
                                                <div className="inline-block bg-green-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                                                    ₹{formatIndianPrice(item.price)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions className="p-4 bg-gray-50 border-t">
                <Button onClick={onClose} variant="contained" size="large" className="px-8">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryInfoDialog;
