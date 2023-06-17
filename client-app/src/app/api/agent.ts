import axios, { AxiosError, AxiosResponse } from "axios";
import { Transaction } from "../models/transaction";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Member } from "../models/member";
import { Message, MessageForm } from "../models/message";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    });
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
});//mas presjes (,) i bjen qka me bo nese request gets rejected

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Transactions = {
    list: () => requests.get<Transaction[]>('/transactions'),//vetem /transactions sepse ja shton baseURL edhe ska nveoj me shkru
    details: (id: string) => requests.get<Transaction>(`/transactions/${id}`),
    create: (transaction: Transaction) => requests.post<void>('/transactions', transaction),
    update: (transaction: Transaction) => requests.put<void>(`/transactions/${transaction.id}`, transaction),
    delete: (id: string) => requests.del<void>(`/transactions/${id}`),
};

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
};

const Members = {
    list: () => requests.get<Member[]>('/members'),
    details: (id: string) => requests.get<Member>(`/members/${id}`),
    create: (member: Member) => requests.post<void>('/members', member),
    update: (member: Member) => requests.put<void>(`/members/${member.id}`, member),
    delete: (id: string) => requests.del<void>(`/members/${id}`),
    access: (id: string) => axios.post<void>(`/members/access/${id}`)
};

const Messages = {
    list: () => requests.get<Message>('/messages'),
    approve: (id: string) => axios.put<void>(`/messages/approve/${id}`),
    create: (message: MessageForm) => requests.post<void>('/messages', message)
}

const agent = {
    Transactions,
    Account,
    Members,
    Messages
};

export default agent;