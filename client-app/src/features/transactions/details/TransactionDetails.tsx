import { Button, Card } from "semantic-ui-react";
import { Transaction } from "../../../app/models/transaction";

interface Props {
    transaction: Transaction;
    cancelSelectTransaction: () => void;
    openForm: (id: string) => void;
}

export default function TransactionDetails({ transaction, cancelSelectTransaction, openForm }: Props) {
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
                    <Button onClick={cancelSelectTransaction} basic color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}