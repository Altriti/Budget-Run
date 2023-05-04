import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Transaction } from "../../../app/models/transaction";
import { SyntheticEvent, useState } from "react";

interface Props {
    transactions: Transaction[];
    selectTransaction: (id: string) => void;
    deleteTransaction: (id: string) => void;
    submitting: boolean;
}

export default function TransactionList({ transactions, selectTransaction, deleteTransaction, submitting }: Props) {
    const [target, setTarget] = useState('');

    function handletransactionDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTransaction(id);
    };

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
                                <Button
                                    onClick={() => selectTransaction(transaction.id)}
                                    floated='right'
                                    content='View'
                                    color='blue'
                                />
                                <Button
                                    name={transaction.id}
                                    loading={submitting && target === transaction.id}
                                    onClick={(e) => handletransactionDelete(e, transaction.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                />
                                <Label basic content={transaction.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}