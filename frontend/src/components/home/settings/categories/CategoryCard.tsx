import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Category {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    bgColor: string;
}

interface CategoryCardProps {
    category: Category;
    onInfo: (category: Category) => void;
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
}

const CategoryCard = ({ category, onInfo, onEdit, onDelete }: CategoryCardProps) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative">
            {/* Action buttons above image */}
            <div className="flex justify-between items-center p-2 bg-gray-50 border-b border-gray-200">
                <IconButton
                    size="small"
                    className="hover:bg-gray-200 transition-all"
                    onClick={() => onInfo(category)}
                >
                    <InfoIcon fontSize="small" className="text-gray-700" />
                </IconButton>
                <div className="flex gap-1">
                    <IconButton
                        size="small"
                        className="hover:bg-blue-50 transition-all"
                        onClick={() => onEdit(category)}
                    >
                        <EditIcon fontSize="small" className="text-blue-600" />
                    </IconButton>
                    <IconButton
                        size="small"
                        className="hover:bg-red-50 transition-all"
                        onClick={() => onDelete(category.id)}
                    >
                        <DeleteIcon fontSize="small" className="text-red-600" />
                    </IconButton>
                </div>
            </div>

            <div className="relative h-48 bg-gray-100">
                <img
                    src={category.imgUrl}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                    }}
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{category.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 min-h-[3.6rem]">{category.description || 'No description'}</p>
            </div>
            {/* Sleek colored strip at bottom */}
            <div
                className="h-1.5 w-full"
                style={{ backgroundColor: category.bgColor }}
            />
        </div>
    );
};

export default CategoryCard;
