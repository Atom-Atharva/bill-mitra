import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: bigint;
    name: string;
    email: string;
    role: string;
    createdBy: {
        id: bigint;
        username: string;
        role: string;
    };
}

export interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
