import { Grid } from "semantic-ui-react";
import TransactionList from "./TransactionList";
import TransactionDetails from "../details/TransactionDetails";
import TransactionForm from "../form/TransactionForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function TransactionDashboard() {

    const { transactionStore } = useStore();
    const { selectedTransaction, editMode } = transactionStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <TransactionList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTransaction &&
                    <TransactionDetails />}
                {editMode &&
                    <TransactionForm />}
            </Grid.Column>
        </Grid>
    )
});