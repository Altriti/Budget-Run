import { Button, Grid, Icon } from "semantic-ui-react";
import TransactionList from "./TransactionList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { NavLink } from "react-router-dom";
import UserBalance from "../../users/UserBalance";
import Messages from "../../usersMessages/Messages";

export default observer(function TransactionDashboard() {

    const { transactionStore } = useStore();
    const { loadTransactions, transactionRegistry } = transactionStore;

    useEffect(() => {
        if (transactionRegistry.size <= 1) loadTransactions();
    }, [transactionRegistry.size, loadTransactions]);

    if (transactionStore.loadingInitial) return <LoadingComponent content='Loading transactions...' />

    return (
        <Grid>
            <Grid.Column width='11'>
                <UserBalance />
                <TransactionList />
            </Grid.Column>
            <Grid.Column width='5'>
                <Messages />
                {/* <h3>Details</h3> */}
                {/* {selectedTransaction &&
                    <TransactionDetails />} */}
            </Grid.Column>
            <Button
                animated
                style={{ position: 'fixed', bottom: '1em', right: '1em' }}
                as={NavLink}
                to='/createTransaction'
                color='red'
                size='big'
                circular
            >
                <Button.Content visible ><Icon name='plus' style={{ paddingLeft: '10px' }} /></Button.Content>
                <Button.Content hidden>ADD</Button.Content>
            </Button>
        </Grid>
    )
});