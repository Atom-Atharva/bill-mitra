import axios from "axios";
import type { Category } from "./fetchAllCategories";
import { API } from "./apis";

interface CategoryRequest {
    name: string;
    description: string;
    bgColor: string;
}

interface CategoryResponse {
    message: string;
    category: Category | null;
}

export const createCategory = async (
    categoryData: CategoryRequest,
    file: File
): Promise<Category> => {
    const formData = new FormData();

    // Add category data as JSON string
    const categoryBlob = new Blob([JSON.stringify(categoryData)], {
        type: "application/json",
    });
    formData.append("category", categoryBlob);

    // Add file
    formData.append("file", file);

    const response = await axios.post<CategoryResponse>(
        API.CATEGORY.addCategory,
        formData,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    if (!response.data.category) {
        throw new Error(response.data.message || "Failed to create category");
    }

    return response.data.category;
};
