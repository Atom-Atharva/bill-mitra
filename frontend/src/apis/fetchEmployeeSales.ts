import axios from "axios";
import { API } from "./apis";

export interface EmployeeSalesData {
    totalSales: number;
    todaySales: number;
    totalBills: number;
    todayBills: number;
    monthlySales: number;
    monthlyBills: number;
}

interface EmployeeSalesResponse {
    message: string;
    sales: EmployeeSalesData;
}

export const fetchEmployeeSales = async (
    userId: number
): Promise<EmployeeSalesData> => {
    const response = await axios.get<EmployeeSalesResponse>(
        `${API.ORDER.employeeSales}?userId=${userId}`,
        { withCredentials: true }
    );
    return response.data.sales;
};
