import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchAllItems } from "@/apis/fetchAllItems";
import { fetchAllCategories } from "@/apis/fetchAllCategories";
import { createItem } from "@/apis/createItem";
import { deleteItem } from "@/apis/deleteItem";
import {
    addAllItems,
    addItem as addItemToStore,
    removeItem,
} from "@/store/itemSlice";
import { addAllCategories } from "@/store/categorySlice";

export const useItems = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    // Fetch categories first
    const { data: fetchedCategories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchAllCategories,
    });

    // Fetch ALL items (without categoryId filter)
    const { data: fetchedItems, isLoading: itemsLoading } = useQuery({
        queryKey: ["items"],
        queryFn: () => fetchAllItems(), // Fetches all items without categoryId
        enabled: !!fetchedCategories && fetchedCategories.length > 0,
        staleTime: 0, // Always refetch when component mounts
    });

    // Sync fetched data to Redux
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

    // Create item mutation
    const { mutate: addItemMutation, isPending } = useMutation({
        mutationFn: ({
            itemData,
            file,
        }: {
            itemData: {
                name: string;
                description: string;
                price: number;
                categoryId: number;
            };
            file: File;
        }) => createItem(itemData, file),
        onSuccess: (newItem) => {
            dispatch(addItemToStore(newItem));
            queryClient.invalidateQueries({ queryKey: ["items"] });
        },
        onError: (error: Error) => {
            console.error("Failed to create item:", error);
            alert(error.message || "Failed to create item");
        },
    });

    // Delete item mutation
    const { mutate: deleteItemMutation, isPending: isDeleting } = useMutation({
        mutationFn: deleteItem,
        onSuccess: (_, deletedId) => {
            dispatch(removeItem(deletedId));
            queryClient.invalidateQueries({ queryKey: ["items"] });
        },
        onError: (error: Error) => {
            console.error("Failed to delete item:", error);
            alert(error.message || "Failed to delete item");
        },
    });

    const isLoading = categoriesLoading || itemsLoading;

    return {
        isLoading,
        addItemMutation,
        deleteItemMutation,
        isPending,
        isDeleting,
    };
};
