import axios from "axios";
import { API } from "./apis";

export interface SalesTimelineData {
    date: string;
    sales: number;
    bills: number;
}

interface SalesTimelineResponse {
    message: string;
    sales: SalesTimelineData[];
}

export const fetchSalesTimeline = async (
    fromDate: string,
    toDate: string
): Promise<SalesTimelineData[]> => {
    const response = await axios.get<SalesTimelineResponse>(
        `${API.ORDER.salesTimeline}?fromDate=${fromDate}&toDate=${toDate}`,
        { withCredentials: true }
    );
    return response.data.sales;
};
