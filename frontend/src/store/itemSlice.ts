import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    bgColor: string;
    categoryName: string;
}

interface ItemState {
    items: Item[];
}

const initialState: ItemState = {
    items: [],
};

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        addAllItems: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
        },
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        updateItem: (state, action: PayloadAction<Item>) => {
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const { addAllItems, addItem, removeItem, updateItem } =
    itemSlice.actions;
export default itemSlice.reducer;
