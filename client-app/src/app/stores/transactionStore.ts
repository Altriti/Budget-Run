import { makeAutoObservable, runInAction } from "mobx";
import { Transaction } from "../models/transaction";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class TransactionStore {
    transactionRegistry = new Map<string, Transaction>();
    loadingInitial = false;
    selectedTransaction: Transaction | undefined = undefined;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    };

    get transactionsByDate() {
        return Array.from(this.transactionRegistry.values()).sort((a, b) =>
            b.date!.getTime() - a.date!.getTime());
    };

    loadTransactions = async () => {
        this.setLoadingInitial(true);
        try {
            const transactions = await agent.Transactions.list();
            transactions.forEach(transaction => {
                this.setTransaction(transaction);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
            console.log(error);
        };
    };

    loadTransaction = async (id: string) => {
        let transaction = this.getTransaction(id);
        if (transaction) {
            this.selectedTransaction = transaction;
            return transaction;
        } else {
            this.setLoadingInitial(true);
            try {
                transaction = await agent.Transactions.details(id);
                this.setTransaction(transaction);
                runInAction(() => this.selectedTransaction = transaction);
                this.setLoadingInitial(false);
                return transaction;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            };
        };
    };

    private setTransaction = (transaction: Transaction) => {
        transaction.date = new Date(transaction.date!);
        this.transactionRegistry.set(transaction.id, transaction);
    }

    private getTransaction = (id: string) => {
        return this.transactionRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    createTransaction = async (transaction: Transaction) => {
        this.loading = true;
        transaction.id = uuid();
        try {
            await agent.Transactions.create(transaction);
            this.transactionRegistry.set(transaction.id, transaction);
            this.selectedTransaction = transaction;
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