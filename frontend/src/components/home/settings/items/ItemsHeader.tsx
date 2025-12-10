import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

interface ItemsHeaderProps {
    itemCount: number;
    categoriesExist: boolean;
    searchQuery: string;
    categoryFilter: string;
    categoryNames: string[];
    onSearchChange: (value: string) => void;
    onCategoryFilterChange: (value: string) => void;
    onAddClick: () => void;
}

const ItemsHeader = ({
    itemCount,
    categoriesExist,
    searchQuery,
    categoryFilter,
    categoryNames,
    onSearchChange,
    onCategoryFilterChange,
    onAddClick
}: ItemsHeaderProps) => {
    return (
        <div className="p-6 border-b border-gray-200 bg-linear-to-r from-green-50 to-white">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Items</h2>
                    <p className="text-sm text-gray-600 mt-1">{itemCount} total items</p>
                </div>
                <button
                    onClick={onAddClick}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                    disabled={!categoriesExist}
                >
                    <AddIcon fontSize="small" />
                    Add Item
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex gap-4">
                <TextField
                    placeholder="Search items..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="bg-white"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon className="text-gray-400" />
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            '&:hover fieldset': {
                                borderColor: '#10b981',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#10b981',
                            },
                        },
                    }}
                />
                <TextField
                    select
                    label="Filter"
                    variant="outlined"
                    size="small"
                    value={categoryFilter}
                    onChange={(e) => onCategoryFilterChange(e.target.value)}
                    className="bg-white min-w-[220px]"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FilterListIcon className="text-gray-400" fontSize="small" />
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            '&:hover fieldset': {
                                borderColor: '#10b981',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#10b981',
                            },
                        },
                    }}
                >
                    <MenuItem value="">
                        <em>All Categories</em>
                    </MenuItem>
                    {categoryNames.map((catName) => (
                        <MenuItem key={catName} value={catName}>
                            {catName}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>
    );
};

export default ItemsHeader;
