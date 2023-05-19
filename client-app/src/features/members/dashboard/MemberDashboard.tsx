import { Grid } from "semantic-ui-react";
import MemberList from "./MemberList";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

export default observer(function MemberDashboard() {
    const { memberStore } = useStore();
    const { memberRegistry, loadMembers, loadingInitial } = memberStore;

    useEffect(() => {
        if (memberRegistry.size <= 1) loadMembers()
    }, [loadMembers, memberRegistry.size]);

    if (loadingInitial) return <LoadingComponent content='Loading members...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <MemberList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h3>Details</h3>
            </Grid.Column>
        </Grid>
    )
})