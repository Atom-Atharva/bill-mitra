import axios from "axios";
import { API } from "./apis";

type Props = {
    newPassword: string;
};

export const changePassword = async (data: Props) => {
    try {
        const res = await axios.patch(
            API.USER.changePassword,
            {
                newPassword: data.newPassword,
            },
            { withCredentials: true }
        );
        return res.data;
    } catch (err: any) {
        throw new Error(
            err?.response?.data?.message ?? "Failed to change password"
        );
    }
};
