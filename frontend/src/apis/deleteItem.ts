import axios from "axios";
import { API } from "./apis";

export const deleteItem = async (itemId: number): Promise<void> => {
    await axios.delete(API.ITEMS.deleteItem + "/" + itemId, {
        withCredentials: true,
    });
};
