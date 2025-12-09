import axios from "axios";
import { API } from "./apis";

type Props = {
    name: string;
    email: string;
    password: string;
    role: "EMPLOYEE" | "MANAGER";
};

export const registerUser = async (data: Props) => {
    const response = await axios
        .post(
            API.AUTH.registerUser,
            {
                name: data.name,
                email: data.email.toLowerCase(),
                password: data.password,
                role: data.role,
            },
            { withCredentials: true }
        )
        .then((res) => {
            console.log(res);
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            throw new Error(
                error?.response?.data?.message || "Failed to register user"
            );
        });
    return response;
};
