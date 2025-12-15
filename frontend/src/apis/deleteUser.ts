import axios from "axios";
import { API } from "./apis";

export const deleteUser = async (userId: number) => {
    try {
        const res = await axios.delete(API.USER.deleteUser + "/" + userId, {
            withCredentials: true,
        });
        return res.data;
    } catch (err: any) {
        throw new Error(
            err?.response?.data?.message ?? "Failed to delete user"
        );
    }
};
