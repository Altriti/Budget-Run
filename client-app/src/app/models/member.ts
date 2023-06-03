import { Transaction } from "./transaction";

export interface Member {
    id: string;
    name: string;
    surname: string;
    displayName: string;
    email: string;
    password: string;
    memberUsername: string;
    access?: boolean
    transactions?: Transaction[];
}