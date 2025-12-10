import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { formatIndianPrice } from "@/utils/formatIndianPrice";

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    bgColor: string;
    categoryName: string;
}

interface StoreItemCardProps {
    item: Item;
    onInfo: (item: Item) => void;
    onAddToCart: (item: Item) => void;
}

const StoreItemCard = ({ item, onInfo, onAddToCart }: StoreItemCardProps) => {
    return (
        <div
            className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => onInfo(item)}
        >
            {/* Image Section */}
            <div className="relative h-48 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden group">
                <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                    }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3 bg-linear-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-xl font-bold text-lg backdrop-blur-sm">
                    ₹{formatIndianPrice(item.price)}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg line-clamp-1 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4 h-10">{item.description || 'No description available'}</p>

                {/* Category Badge */}
                <div className="mb-4">
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {item.categoryName}
                    </span>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg font-semibold"
                >
                    <AddShoppingCartIcon fontSize="small" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default StoreItemCard;
