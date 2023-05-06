import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

export default observer(function TransactionDetails() {
    const { transactionStore } = useStore();
    const { selectedTransaction: transaction, openForm, cancelSelectedTransaction } = transactionStore;

    if (!transaction) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{transaction.description}</Card.Header>
                <Card.Meta>
                    <div>{transaction.date}</div>
                    <div>{transaction.amount}</div>
                </Card.Meta>
                <Card.Description>{transaction.category}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(transaction.id)} basic color="blue" content='Edit' />
                    <Button onClick={cancelSelectedTransaction} basic color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})