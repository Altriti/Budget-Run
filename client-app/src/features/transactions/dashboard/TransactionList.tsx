import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function TransactionList() {
    const [target, setTarget] = useState('');
    const { transactionStore } = useStore();
    const { deleteTransaction, transactionsByDate, loading } = transactionStore;

    function handletransactionDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTransaction(id);
    };

    return (
        <Segment>
            <Item.Group divided>
                {transactionsByDate.map(transaction => (
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
                                    as={Link} to={`/transactions/${transaction.id}`}
                                    floated='right'
                                    content='View'
                                    color='blue'
                                />
                                <Button
                                    name={transaction.id}
                                    loading={loading && target === transaction.id}
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
});