import { Grid } from "semantic-ui-react";
import { Transaction } from "../../../app/models/transaction";
import TransactionList from "./TransactionList";
import TransactionDetails from "../details/TransactionDetails";
import TransactionForm from "../form/TransactionForm";

interface Props {
    transactions: Transaction[];
    selectedTransaction: Transaction | undefined;
    selectTransaction: (id: string) => void;
    cancelSelectTransaction: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void
    createOrEdit: (transation: Transaction) => void;
    deleteTransaction: (id: string) => void;
}

export default function TransactionDashboard({ transactions, selectedTransaction, selectTransaction, cancelSelectTransaction,
    editMode, openForm, closeForm, createOrEdit, deleteTransaction }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <TransactionList
                    transactions={transactions}
                    selectTransaction={selectTransaction}
                    deleteTransaction={deleteTransaction}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTransaction &&
                    <TransactionDetails
                        transaction={selectedTransaction}
                        cancelSelectTransaction={cancelSelectTransaction}
                        openForm={openForm}
                    />}
                {editMode &&
                    <TransactionForm closeForm={closeForm} transaction={selectedTransaction} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}