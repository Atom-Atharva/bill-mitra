import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface Category {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    bgColor: string;
}

interface CategoryCardProps {
    category: Category;
    itemCount: number;
    onScrollTo: (categoryName: string) => void;
    onInfo: (category: Category) => void;
}

const CategoryCard = ({ category, itemCount, onScrollTo, onInfo }: CategoryCardProps) => {
    return (
        <div
            className="relative bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            onClick={() => onScrollTo(category.name)}
        >
            {/* Background Image with Overlay */}
            <div className="relative h-32 overflow-hidden">
                <img
                    src={category.imgUrl}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop";
                    }}
                />
                {/* Color Overlay */}
                <div
                    className="absolute inset-0 mix-blend-multiply opacity-70"
                    style={{ backgroundColor: category.bgColor }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{category.name}</h3>
                        <p className="text-white/90 text-sm mt-1 drop-shadow line-clamp-2">{category.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </span>
                        <IconButton
                            size="small"
                            className="bg-white/90 hover:bg-white shadow-md backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onInfo(category);
                            }}
                            title="View category details"
                        >
                            <InfoIcon fontSize="small" className="text-purple-600" />
                        </IconButton>
                    </div>
                </div>
            </div>

            {/* Color Bar at Bottom */}
            <div
                className="h-2 w-full"
                style={{ backgroundColor: category.bgColor }}
            />
        </div>
    );
};

export default CategoryCard;
