import { makeAutoObservable, runInAction } from "mobx";
import { Member } from "../models/member";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class MemberStore {
    memberRegistry = new Map<string, Member>();
    loadingInitial = false;
    selectedMember: Member | undefined = undefined;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get membersArr() {
        return Array.from(this.memberRegistry.values());
    }

    loadMembers = async () => {
        this.loadingInitial = true;
        try {
            const members = await agent.Members.list();
            members.forEach(member => {
                this.setMember(member);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
            console.log(error);
        }
    };

    loadMember = async (id: string) => {
        let member = this.getMember(id);
        if (member?.transactions != null) {
            this.selectedMember = member;
            return member;
        } else {
            this.setLoadingInitial(true);
            try {
                member = await agent.Members.details(id);
                this.setMember(member);
                runInAction(() => {
                    this.selectedMember = member
                });
                this.setLoadingInitial(false);
                return member;
            } catch (error) {
                this.setLoadingInitial(false);
                console.log(error);
            };
        };
    };

    private setMember = (member: Member) => {
        this.memberRegistry.set(member.id, member);
    };

    private getMember = (id: string) => {
        return this.memberRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    createMember = async (member: Member) => {
        this.loading = true;
        member.id = uuid();
        try {
            await agent.Members.create(member);
            this.setMember(member);
            runInAction(() => {
                this.selectedMember = member;
                this.loading = false;
            });
        } catch (error) {
            this.loading = false;
            console.log(error);
        };
    };

    updateMember = async (member: Member) => {
        this.loading = true;
        try {
            await agent.Members.update(member);
            this.setMember(member);
            runInAction(() => {
                this.selectedMember = member;
                this.loading = false;
            });
        } catch (error) {
            this.loading = false;
            console.log(error);
        };
    };

    deleteMember = async (id: string) => {
        this.loading = true
        try {
            await agent.Members.delete(id);
            runInAction(() => {
                this.memberRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            this.loading = false;
            console.log(error);
        };
    };

    manageAccess = async (id: string) => {
        this.loading = true;
        try {
            await agent.Members.access(id);
            runInAction(() => {
                this.loading = false;
            });
        } catch (error) {
            this.loading = false;
            console.log(error);
        };
    };
};