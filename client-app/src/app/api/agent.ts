import axios, { AxiosResponse } from "axios";
import { Transaction } from "../models/transaction";
import { error } from "console";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    });
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        return await Promise.reject(error);
    }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Transactions = {
    list: () => requests.get<Transaction[]>('/transactions'),//vetem /transactions sepse ja shton baseURL edhe ska nveoj me shkru
    create: (transaction: Transaction) => requests.post<void>('/transactions', transaction),
    update: (transaction: Transaction) => requests.put<void>(`/transactions/${transaction.id}`, transaction),
    delete: (id: string) => requests.del<void>(`/transactions/${id}`),
};

const agent = {
    Transactions
}

export default agent;