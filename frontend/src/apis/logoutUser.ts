import axios from "axios";
import { API } from "./apis";

export const logoutUser = async () => {
    await axios
        .post(API.AUTH.logout, {}, { withCredentials: true })
        .then((res) => {
            console.log(res);
            return;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(error?.response?.data?.message);
        });
};
