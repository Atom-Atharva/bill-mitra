import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { addToCart } from "@/store/cartSlice";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "@/apis/fetchAllCategories";
import { fetchAllItems } from "@/apis/fetchAllItems";
import { addAllCategories } from "@/store/categorySlice";
import { addAllItems } from "@/store/itemSlice";
import StoreItemCard from "./store/StoreItemCard";
import CategoryCard from "./store/CategoryCard";
import CategoryInfoDialog from "./settings/categories/CategoryInfoDialog";
import ItemInfoDialog from "./settings/items/ItemInfoDialog";

const Store = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.category.categories);
    const items = useSelector((state: RootState) => state.item.items);

    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
    const [itemInfoDialogOpen, setItemInfoDialogOpen] = useState(false);
    const [categoryInfoDialogOpen, setCategoryInfoDialogOpen] = useState(false);

    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Fetch categories and items
    const { data: fetchedCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchAllCategories,
    });

    const { data: fetchedItems } = useQuery({
        queryKey: ["items"],
        queryFn: () => fetchAllItems(),
        enabled: !!fetchedCategories && fetchedCategories.length > 0,
    });

    // Sync to Redux
    useEffect(() => {
        if (fetchedCategories) {
            dispatch(addAllCategories(fetchedCategories));
        }
    }, [fetchedCategories, dispatch]);

    useEffect(() => {
        if (fetchedItems && Array.isArray(fetchedItems)) {
            dispatch(addAllItems(fetchedItems));
        }
    }, [fetchedItems, dispatch]);

    // Filter items
    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !categoryFilter || item.categoryName === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Group items by category
    const itemsByCategory = categories.map(category => ({
        category,
        items: filteredItems.filter(item => item.categoryName === category.name)
    })).filter(group => group.items.length > 0);

    const handleAddToCart = (item: typeof items[0]) => {
        dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            imgUrl: item.imgUrl,
            categoryName: item.categoryName
        }));
    };

    const handleCategoryClick = (categoryName: string) => {
        categoryRefs.current[categoryName]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleCategoryInfo = (category: typeof categories[0]) => {
        setSelectedCategory(category);
        setCategoryInfoDialogOpen(true);
    };

    const handleItemInfoClick = (item: typeof items[0]) => {
        setSelectedItem(item);
        setItemInfoDialogOpen(true);
    };

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-linear-to-r from-purple-50 to-white">
                {/* Search and Filter */}
                <div className="flex gap-4 mb-4">
                    <TextField
                        placeholder="Search items..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                            },
                        }}
                    />
                    <TextField
                        select
                        label="Filter"
                        variant="outlined"
                        size="small"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="min-w-[220px]"
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
                            },
                        }}
                    >
                        <MenuItem value="">
                            <em>All Categories</em>
                        </MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.name}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                {/* Category Cards Carousel */}
                <div className="relative">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-200 hover:scrollbar-thumb-purple-500 scroll-smooth">
                        {categories.map((category) => {
                            const categoryItemsCount = filteredItems.filter(item => item.categoryName === category.name).length;
                            return (
                                <div key={category.id} className="shrink-0 w-80">
                                    <CategoryCard
                                        category={category}
                                        itemCount={categoryItemsCount}
                                        onScrollTo={handleCategoryClick}
                                        onInfo={handleCategoryInfo}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            <div className="flex-1 overflow-y-auto p-6">
                {itemsByCategory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <Inventory2Icon style={{ fontSize: 64 }} className="mb-4" />
                        <p className="text-lg">No items found</p>
                    </div>
                ) : (
                    itemsByCategory.map(({ category, items }) => (
                        <div
                            key={category.id}
                            ref={(el) => { categoryRefs.current[category.name] = el; }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-2 h-8 rounded"
                                    style={{ backgroundColor: category.bgColor }}
                                />
                                <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
                                <span className="text-sm text-gray-500">({items.length} items)</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
                                {items.map((item) => (
                                    <StoreItemCard
                                        key={item.id}
                                        item={item}
                                        onInfo={handleItemInfoClick}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Category Info Dialog */}
            <CategoryInfoDialog
                open={categoryInfoDialogOpen}
                category={selectedCategory}
                onClose={() => setCategoryInfoDialogOpen(false)}
            />

            {/* Item Info Dialog */}
            <ItemInfoDialog
                open={itemInfoDialogOpen}
                item={selectedItem}
                onClose={() => setItemInfoDialogOpen(false)}
                onAddToCart={handleAddToCart}
            />
        </div>
    );
}

export default Store;