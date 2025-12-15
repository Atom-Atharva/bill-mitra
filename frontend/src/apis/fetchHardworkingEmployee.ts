import axios from "axios";
import { API } from "./apis";

export interface HardworkingEmployee {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        createdBy: any;
    };
    bills: number;
}

interface EmployeeResponse {
    message: string;
    employee: HardworkingEmployee;
}

export const fetchHardworkingEmployee =
    async (): Promise<HardworkingEmployee> => {
        const response = await axios.get<EmployeeResponse>(
            API.ORDER.hardworkingEmployee,
            { withCredentials: true }
        );
        return response.data.employee;
    };
