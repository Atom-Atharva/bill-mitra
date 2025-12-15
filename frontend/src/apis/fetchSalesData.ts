import axios from "axios";
import { API } from "./apis";

export interface SalesData {
    totalSales: number;
    totalBills: number;
    monthlySales: number;
    monthlyBills: number;
    todaySales: number;
    todayBills: number;
}

interface SalesResponse {
    message: string;
    sales: SalesData;
}

export const fetchSalesData = async (): Promise<SalesData> => {
    const response = await axios.get<SalesResponse>(API.ORDER.salesData, {
        withCredentials: true,
    });
    return response.data.sales;
};
