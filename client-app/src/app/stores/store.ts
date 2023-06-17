import { createContext, useContext } from "react";
import TransactionStore from "./transactionStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import MemberStore from "./memberStore";
import MessageStore from "./messageStore";

interface Store {
    transactionStore: TransactionStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    memberStore: MemberStore;
    messageStore: MessageStore;
}

export const store: Store = {
    transactionStore: new TransactionStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    memberStore: new MemberStore(),
    messageStore: new MessageStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}