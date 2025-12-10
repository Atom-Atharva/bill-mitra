import axios from "axios";
import { API } from "./apis";

export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    bgColor: string;
    categoryName: string;
}

interface ItemsResponse {
    message: string;
    items: Item[];
}

export const fetchAllItems = async (categoryId?: number): Promise<Item[]> => {
    const params = categoryId ? { categoryId } : {};
    const response = await axios.get<ItemsResponse>(API.ITEMS.getAllItems, {
        params,
        withCredentials: true,
    });
    return response.data.items;
};
