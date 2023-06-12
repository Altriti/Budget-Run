export interface User {
    userName: string;
    displayName: string;
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