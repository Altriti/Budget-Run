import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Transaction } from "../../../app/models/transaction";

interface Props {
    transactions: Transaction[];
    selectTransaction: (id: string) => void;
    deleteTransaction: (id: string) => void;
}

export default function TransactionList({ transactions, selectTransaction, deleteTransaction }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {transactions.map(transaction => (
                    <Item key={transaction.id}>
                        <Item.Content>
                            <Item.Header as='a'>{transaction.description}</Item.Header>
                            <Item.Meta>{transaction.date}</Item.Meta>
                            <Item.Description>
                                <div>{transaction.category}</div>
                                <div>{transaction.amount}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectTransaction(transaction.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteTransaction(transaction.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={transaction.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}