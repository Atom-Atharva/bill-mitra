import axios from "axios";
import { API } from "./apis";

export interface Category {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    bgColor: string;
}

interface CategoriesResponse {
    message: string;
    categories: Category[];
}

export const fetchAllCategories = async (): Promise<Category[]> => {
    const response = await axios.get<CategoriesResponse>(
        API.CATEGORY.getAllCategories,
        { withCredentials: true }
    );
    return response.data.categories;
};
