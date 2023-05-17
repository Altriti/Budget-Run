import { User } from "./user";

export interface Transaction {
    id: string;
    date: Date | null;
    amount: number;
    category: string;
    description: string;
    appUserId: string;
    appUser?: User;
}