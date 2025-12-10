import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeeReducer from "./employeeSlice";
import categoryReducer from "./categorySlice";
import itemReducer from "./itemSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        employee: employeeReducer,
        category: categoryReducer,
        item: itemReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
