import axios from "axios";
import { API } from "./apis";

export const deleteCategory = async (categoryId: number): Promise<void> => {
    await axios.delete(API.CATEGORY.deleteCategory + "/" + categoryId, {
        withCredentials: true,
    });
};
