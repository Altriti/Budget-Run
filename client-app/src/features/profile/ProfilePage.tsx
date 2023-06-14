import { Card, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store"
import ProfileUserData from "./ProfileUserData";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProfileUserRecords from "./ProfileUserRecords";

export default observer(function ProfilePage() {
    const { userStore, transactionStore, memberStore } = useStore();
    const { user } = userStore;



    if (!user) return <LoadingComponent content="Loading..." />;

    return (
        <Segment>
            <ProfileUserData />
            <ProfileUserRecords />
        </Segment>
    )
})