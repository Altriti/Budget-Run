import { makeAutoObservable, runInAction } from "mobx";
import { Message, MessageForm } from "../models/message";
import agent from "../api/agent";

export default class MessageStore {
    messages: Message | undefined = undefined;
    loadingInitial = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadMessages = async () => {
        this.loadingInitial = true;
        try {
            const message = await agent.Messages.list();
            runInAction(() => {
                this.messages = message;
                this.loadingInitial = false;
            });
        } catch (error) {
            this.loadingInitial = false;
            console.log(error);
        }
    }

    approve = async (id: string) => {
        this.loading = true;
        try {
            await agent.Messages.approve(id);
            runInAction(() => {
                this.loading = false;
            });
        } catch (error) {
            this.loading = false;
            console.log(error);
        }
    }

    createMessage = async (message: MessageForm) => {
        this.loading = true;
        try {
            await agent.Messages.create(message);
            runInAction(() => {
                this.loading = false;
            });
        } catch (error) {
            this.loading = false;
            console.log(error);
        }
    }
}