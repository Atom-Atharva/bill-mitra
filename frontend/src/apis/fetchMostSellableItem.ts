import axios from "axios";
import { API } from "./apis";

export interface MostSellableItem {
    item: {
        id: number;
        name: string;
        description: string;
        price: number;
        imgUrl: string;
        bgColor: string;
        categoryName: string;
    };
    quantity: number;
}

interface ItemResponse {
    message: string;
    item: MostSellableItem;
}

export const fetchMostSellableItem = async (): Promise<MostSellableItem> => {
    const response = await axios.get<ItemResponse>(API.ORDER.mostSellableItem, {
        withCredentials: true,
    });
    return response.data.item;
};
