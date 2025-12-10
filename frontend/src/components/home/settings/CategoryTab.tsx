import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import CategoryHeader from "./categories/CategoryHeader";
import CategoryGrid from "./categories/CategoryGrid";
import EmptyState from "./items/EmptyState";
import CategoryInfoDialog from "./categories/CategoryInfoDialog";
import AddCategoryDrawer from "./categories/AddCategoryDrawer";
import DeleteConfirmDialog from "./items/DeleteConfirmDialog";
import { useCategories } from "./hooks/useCategories";

const CategoryTab = () => {
    const categories = useSelector((state: RootState) => state.category.categories);
    const { isLoading, addCategoryMutation, deleteCategoryMutation, isPending, isDeleting } = useCategories();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleAddCategory = (data: {
        name: string;
        description: string;
        bgColor: string;
        file: File;
    }) => {
        addCategoryMutation(
            {
                categoryData: {
                    name: data.name,
                    description: data.description,
                    bgColor: data.bgColor
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

    const handleDeleteCategory = (id: number) => {
        setCategoryToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete !== null) {
            deleteCategoryMutation(categoryToDelete, {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setCategoryToDelete(null);
                }
            });
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full w-full rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <CategoryHeader
                categoryCount={categories.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddClick={() => setIsDrawerOpen(true)}
            />

            {/* Categories Grid */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)" }}>
                {isLoading ? (
                    <EmptyState type="loading" message="Loading categories..." />
                ) : filteredCategories.length === 0 ? (
                    <EmptyState type="no-items" message="No categories found" />
                ) : (
                    <CategoryGrid
                        categories={filteredCategories}
                        onInfo={(category) => {
                            setSelectedCategory(category);
                            setInfoDialogOpen(true);
                        }}
                        onEdit={(category) => {
                            // TODO: Edit functionality
                            console.log("Edit category:", category);
                        }}
                        onDelete={handleDeleteCategory}
                    />
                )}
            </div>

            {/* Add Category Drawer */}
            <AddCategoryDrawer
                open={isDrawerOpen}
                isPending={isPending}
                onClose={() => setIsDrawerOpen(false)}
                onAdd={handleAddCategory}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                open={deleteDialogOpen}
                isDeleting={isDeleting}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
            />

            {/* Category Info Dialog */}
            <CategoryInfoDialog
                open={infoDialogOpen}
                category={selectedCategory}
                onClose={() => setInfoDialogOpen(false)}
            />
        </div>
    );
};

export default CategoryTab;