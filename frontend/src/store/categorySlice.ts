import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Category {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    bgColor: string;
}

interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
    categories: [],
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addAllCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        },
        removeCategory: (state, action: PayloadAction<number>) => {
            state.categories = state.categories.filter(
                (category) => category.id !== action.payload
            );
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex(
                (cat) => cat.id === action.payload.id
            );
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        removeAllCategories: (state) => {
            state.categories = [];
        },
    },
});

export const {
    addAllCategories,
    addCategory,
    removeCategory,
    updateCategory,
    removeAllCategories,
} = categorySlice.actions;
export default categorySlice.reducer;
