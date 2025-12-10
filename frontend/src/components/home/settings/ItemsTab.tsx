import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import ItemsHeader from "./items/ItemsHeader";
import ItemsGrid from "./items/ItemsGrid";
import EmptyState from "./items/EmptyState";
import ItemInfoDialog from "./items/ItemInfoDialog";
import AddItemDrawer from "./items/AddItemDrawer";
import DeleteConfirmDialog from "./items/DeleteConfirmDialog";
import { useItems } from "./hooks/useItems";

const ItemsTab = () => {
    const items = useSelector((state: RootState) => state.item.items);
    const categories = useSelector((state: RootState) => state.category.categories);
    const { isLoading, addItemMutation, deleteItemMutation, isPending, isDeleting } = useItems();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("");

    const handleAddItem = (data: {
        name: string;
        description: string;
        price: number;
        categoryId: number;
        file: File;
    }) => {
        addItemMutation(
            {
                itemData: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    categoryId: data.categoryId
                },
                file: data.file
            },
            {
                onSuccess: () => {
                    setIsDrawerOpen(false);
                }
            }
        );
    };

    const handleDeleteItem = (id: number) => {
        setItemToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete !== null) {
            deleteItemMutation(itemToDelete, {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setItemToDelete(null);
                }
            });
        }
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "" || item.categoryName === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categoryNames = [...new Set(items.map(item => item.categoryName))].sort();

    return (
        <div className="h-full w-full rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <ItemsHeader
                itemCount={items.length}
                categoriesExist={categories.length > 0}
                searchQuery={searchQuery}
                categoryFilter={categoryFilter}
                categoryNames={categoryNames}
                onSearchChange={setSearchQuery}
                onCategoryFilterChange={setCategoryFilter}
                onAddClick={() => setIsDrawerOpen(true)}
            />

            {/* Items Grid */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)" }}>
                {isLoading ? (
                    <EmptyState type="loading" />
                ) : categories.length === 0 ? (
                    <EmptyState
                        type="no-categories"
                        message="No categories found"
                        subMessage="Please create categories first before adding items"
                    />
                ) : filteredItems.length === 0 ? (
                    <EmptyState type="no-items" message="No items found" />
                ) : (
                    <ItemsGrid
                        items={filteredItems}
                        onInfo={(item) => {
                            setSelectedItem(item);
                            setInfoDialogOpen(true);
                        }}
                        onEdit={(item) => {
                            // TODO: Edit functionality
                            console.log("Edit item:", item);
                        }}
                        onDelete={handleDeleteItem}
                    />
                )}
            </div>

            {/* Add Item Drawer */}
            <AddItemDrawer
                open={isDrawerOpen}
                categories={categories}
                isPending={isPending}
                onClose={() => setIsDrawerOpen(false)}
                onAdd={handleAddItem}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                open={deleteDialogOpen}
                isDeleting={isDeleting}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
            />

            {/* Item Info Dialog */}
            <ItemInfoDialog
                open={infoDialogOpen}
                item={selectedItem}
                onClose={() => setInfoDialogOpen(false)}
            />
        </div>
    );
};

export default ItemsTab;