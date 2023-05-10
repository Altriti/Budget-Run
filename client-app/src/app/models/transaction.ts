export interface Transaction {
    id: string;
    date: Date | null;
    amount: number;
    category: string;
    description: string;
}