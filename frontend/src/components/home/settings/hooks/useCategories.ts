import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "@/apis/fetchAllCategories";
import { createCategory } from "@/apis/createCategory";
import { deleteCategory } from "@/apis/deleteCategory";
import { addAllCategories, addCategory as addCategoryToStore, removeCategory } from "@/store/categorySlice";

export const useCategories = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    // Fetch categories
    const { data: fetchedCategories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchAllCategories
    });

    // Sync fetched categories to Redux
    useEffect(() => {
        if (fetchedCategories) {
            dispatch(addAllCategories(fetchedCategories));
        }
    }, [fetchedCategories, dispatch]);

    // Create category mutation
    const { mutate: addCategoryMutation, isPending } = useMutation({
        mutationFn: ({ categoryData, file }: { categoryData: { name: string; description: string; bgColor: string }; file: File }) =>
            createCategory(categoryData, file),
        onSuccess: (newCategory) => {
            dispatch(addCategoryToStore(newCategory));
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error: Error) => {
            console.error("Failed to create category:", error);
            alert(error.message || "Failed to create category");
        }
    });

    // Delete category mutation
    const { mutate: deleteCategoryMutation, isPending: isDeleting } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (_, deletedId) => {
            dispatch(removeCategory(deletedId));
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error: Error) => {
            console.error("Failed to delete category:", error);
            alert(error.message || "Failed to delete category");
        }
    });

    return {
        isLoading,
        addCategoryMutation,
        deleteCategoryMutation,
        isPending,
        isDeleting
    };
};
