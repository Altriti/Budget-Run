import { createContext, useContext } from "react";
import TransactionStore from "./transactionStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import MemberStore from "./memberStore";

interface Store {
    transactionStore: TransactionStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    memberStore: MemberStore;
}

export const store: Store = {
    transactionStore: new TransactionStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    memberStore: new MemberStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}