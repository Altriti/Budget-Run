import { Grid } from "semantic-ui-react";
import TransactionList from "./TransactionList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function TransactionDashboard() {

    const { transactionStore } = useStore();
    const { loadTransactions, transactionRegistry } = transactionStore;

    useEffect(() => {
        if (transactionRegistry.size <= 1) loadTransactions();
    }, [transactionRegistry.size, loadTransactions]);

    if (transactionStore.loadingInitial) return <LoadingComponent content='Loading transactions...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <TransactionList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h3>Details</h3>
                {/* {selectedTransaction &&
                    <TransactionDetails />} */}
            </Grid.Column>
        </Grid>
    )
});