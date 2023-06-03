import { Button, Grid, Icon } from "semantic-ui-react";
import MemberList from "./MemberList";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

export default observer(function MemberDashboard() {
    const { memberStore } = useStore();
    const { memberRegistry, loadMembers, loadingInitial } = memberStore;

    useEffect(() => {
        if (memberRegistry.size <= 1) loadMembers();
    }, [memberRegistry.size, loadMembers]);

    if (loadingInitial) return <LoadingComponent content='Loading members...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <MemberList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h3>Details</h3>
            </Grid.Column>
            <Button animated style={{ position: 'fixed', bottom: '1em', right: '1em' }}
                as={NavLink}
                to='/createMember'
                color='red'
                size='big'
                circular
            >
                <Button.Content visible ><Icon name='plus' style={{ paddingLeft: '10px' }} /></Button.Content>
                <Button.Content hidden>ADD</Button.Content>
            </Button>
        </Grid>
    )
})