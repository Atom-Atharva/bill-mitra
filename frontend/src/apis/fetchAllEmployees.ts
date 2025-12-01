import axios from "axios";
import { API } from "./apis";

export const fetchAllEmployees = async () => {
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
