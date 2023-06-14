export interface User {
    userName: string;
    displayName: string;
    email: string;
    token: string;
    incomeTotal: number;
    expenseTotal: number;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}