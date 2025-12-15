import axios from "axios";
import { API } from "./apis";

export interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
}

export const fetchAllEmployees = async (): Promise<Employee[]> => {
    try {
        const res = await axios.get(API.USER.getAllEmployees, {
            withCredentials: true,
        });
        return res.data.userList;
    } catch (err: any) {
        throw new Error(
            err?.response?.data?.message ?? "Failed to fetch employees info"
        );
    }
};
