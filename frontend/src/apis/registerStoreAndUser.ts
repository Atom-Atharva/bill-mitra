import axios from "axios";
import { API } from "./apis";

type Props = {
    storeName: string;
    userName: string;
    email: string;
    password: string;
    remember: boolean;
};

export const registerStoreAndUser = async (data: Props) => {
    await axios
        .post(
            API.AUTH.registerStore,
            {
                userName: data.userName,
                storeName: data.storeName,
                userEmail: data.email,
                userPassword: data.password,
                isRememberMeChecked: data.remember,
            },
            { withCredentials: true }
        )
        .then((res) => {
            console.log(res);
            return;
        })
        .catch((error) => {
            console.error(error);
            throw new Error(error?.response?.data?.message);
        });
};
