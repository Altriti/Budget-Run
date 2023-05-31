import { Profile } from "./profile";

export interface Transaction {
    id: string;
    transactionType: string;
    date: Date | null;
    amount: number;
    category: string;
    description: string;
    creator: string;
    users?: Profile[];
}