import { makeAutoObservable, runInAction } from "mobx";
import { Transaction } from "../models/transaction";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class TransactionStore {
    transactionRegistry = new Map<string, Transaction>();
    loadingInitial = false;
    selectedTransaction: Transaction | undefined = undefined;
    editMode = false;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    };

    get transactionsByDate() {
        return Array.from(this.transactionRegistry.values()).sort((a, b) =>
            Date.parse(b.date) - Date.parse(a.date));
    };

    loadTransactions = async () => {
        this.setLoadingInitial(true);
        try {
            const transactions = await agent.Transactions.list();
            transactions.forEach(transaction => {
                transaction.date = transaction.date.split('T')[0];
                this.transactionRegistry.set(transaction.id, transaction);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
            console.log(error);
        };
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    selectTransaction = (id: string) => {
        this.selectedTransaction = this.transactionRegistry.get(id);
    };

    cancelSelectedTransaction = () => {
        this.selectedTransaction = undefined;
    };

    openForm = (id?: string) => {
        id ? this.selectTransaction(id) : this.cancelSelectedTransaction();
        this.editMode = true;
    };

    closeForm = () => {
        this.editMode = false;
    }

    createTransaction = async (transaction: Transaction) => {
        this.loading = true;
        transaction.id = uuid();
        try {
            await agent.Transactions.create(transaction);
            this.transactionRegistry.set(transaction.id, transaction);
            this.selectedTransaction = transaction;
            this.editMode = false;
            this.loading = false;
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        };
    };

    updateTransaction = async (transaction: Transaction) => {
        this.loading = true;
        try {
            await agent.Transactions.update(transaction);
            runInAction(() => {
                //this.transactions = [...this.transactions.filter(x => x.id !== transaction.id), transaction];// filter e krijon ni array t're me transaksione dhe e hek transaksionin qe e ka id e njejt me id e transaksionit qe po i vjen. Tani e shton transaksionin e ri ne array e re
                this.transactionRegistry.set(transaction.id, transaction);
                this.selectedTransaction = transaction;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        };
    };

    deleteTransaction = async (id: string) => {
        this.loading = true;
        try {
            await agent.Transactions.delete(id);
            runInAction(() => {
                //this.transactions = [...this.transactions.filter(x => x.id !== id)];//...this.transactions.filter(x => x.id !== id) osht njejt si me thon =this.transactions po tu ja hek transaksionin me id e dhene
                this.transactionRegistry.delete(id);
                if (this.selectedTransaction?.id === id) this.cancelSelectedTransaction();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        };
    };
}