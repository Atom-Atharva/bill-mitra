import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    bgColor: string;
    categoryName: string;
}

interface ItemCardProps {
    item: Item;
    onInfo: (item: Item) => void;
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
}

const ItemCard = ({ item, onInfo, onEdit, onDelete }: ItemCardProps) => {
    const categories = useSelector((state: RootState) => state.category.categories);
    const category = categories.find(cat => cat.name === item.categoryName);
    const categoryColor = category?.bgColor || item.bgColor;
    return (
        <div
            className="bg-white max-w-xs w-full rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative border border-gray-200"
        >
            {/* Action buttons above image */}
            <div className="flex justify-between items-center p-2 bg-gray-50 border-b border-gray-200">
                <IconButton
                    size="small"
                    className="hover:bg-gray-200 transition-all"
                    onClick={() => onInfo(item)}
                >
                    <InfoIcon fontSize="small" className="text-gray-700" />
                </IconButton>
                <div className="flex gap-1">
                    <IconButton
                        size="small"
                        className="hover:bg-blue-50 transition-all"
                        onClick={() => onEdit(item)}
                    >
                        <EditIcon fontSize="small" className="text-blue-600" />
                    </IconButton>
                    <IconButton
                        size="small"
                        className="hover:bg-red-50 transition-all"
                        onClick={() => onDelete(item.id)}
                    >
                        <DeleteIcon fontSize="small" className="text-red-600" />
                    </IconButton>
                </div>
            </div>

            <div className="relative h-40 bg-gray-100">
                <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                    }}
                />
                {/* Gradient overlay at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/60 to-transparent" />

                {/* Price badge on image */}
                <div className="absolute bottom-2 left-2 bg-green-600 text-white px-3 py-1.5 rounded-lg shadow-lg font-bold text-lg">
                    ₹{item.price}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 min-h-[3.6rem]">{item.description || 'No description'}</p>

                {/* Category info in card */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Category</span>
                    <span
                        className="text-xs font-semibold px-3 py-1.5 rounded-md"
                        style={{
                            backgroundColor: categoryColor,
                            color: '#ffffff'
                        }}
                    >
                        {item.categoryName}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
