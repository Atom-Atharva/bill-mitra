import axios from "axios";
import type { Item } from "./fetchAllItems";
import { API } from "./apis";

interface ItemRequest {
    name: string;
    description: string;
    price: number;
    categoryId: number;
}

interface ItemResponse {
    message: string;
    item: Item | null;
}

export const createItem = async (
    itemData: ItemRequest,
    file: File
): Promise<Item> => {
    const formData = new FormData();

    // Add item data as JSON string
    const itemBlob = new Blob([JSON.stringify(itemData)], {
        type: "application/json",
    });
    formData.append("item", itemBlob);

    // Add file
    formData.append("file", file);

    const response = await axios.post<ItemResponse>(
        API.ITEMS.addItem,
        formData,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    if (!response.data.item) {
        throw new Error(response.data.message || "Failed to create item");
    }

    return response.data.item;
};
