import axios from "axios";
import { API } from "./apis";

export const currentUserInfo = async () => {
    try {
        const res = await axios.get(API.USER.currentUserInfo, {
            withCredentials: true,
        });
        return res.data.user;
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message ?? "Failed to fetch user info"
        );
    }
};
