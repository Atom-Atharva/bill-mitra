import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

interface CategoryHeaderProps {
    categoryCount: number;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onAddClick: () => void;
}

const CategoryHeader = ({
    categoryCount,
    searchQuery,
    onSearchChange,
    onAddClick
}: CategoryHeaderProps) => {
    return (
        <div className="p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
                    <p className="text-sm text-gray-600 mt-1">{categoryCount} total categories</p>
                </div>
                <button
                    onClick={onAddClick}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                    <AddIcon fontSize="small" />
                    Add Category
                </button>
            </div>

            {/* Search Bar */}
            <TextField
                placeholder="Search categories..."
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-white"
            />
        </div>
    );
};

export default CategoryHeader;
