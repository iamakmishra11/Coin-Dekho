import axios from "axios";
import { COINGECKO_API_URL } from "../helpers/constants";

const axiosInstance = axios.create({
    baseURL: COINGECKO_API_URL,
});

export async function fetchCoinData(page = 1, currency = 'usd') {
    const perPage = 8;
    try {
        const response = await axiosInstance.get(`/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}`);
        return response.data; // Ensure you return the data part of the response
    } catch (error) {
        console.error(error);
        return null;
    }
}