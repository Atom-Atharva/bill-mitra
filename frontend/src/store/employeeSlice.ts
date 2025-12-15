import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdBy?: {
        id: number;
        username: string;
        role: string;
    };
}

export interface EmployeeState {
    employees: User[];
}

const initialState: EmployeeState = {
    employees: [],
};

export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        addAllEmployees: (state, action: PayloadAction<User[]>) => {
            state.employees = action.payload;
        },
        addEmployee: (state, action: PayloadAction<User>) => {
            state.employees.push(action.payload);
        },
        removeEmployee: (state, action: PayloadAction<number>) => {
            state.employees = state.employees.filter(
                (emp) => emp.id !== action.payload
            );
        },
        removeAllEmployees: (state) => {
            state.employees = [];
        },
    },
});

export const {
    addAllEmployees,
    addEmployee,
    removeEmployee,
    removeAllEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;
