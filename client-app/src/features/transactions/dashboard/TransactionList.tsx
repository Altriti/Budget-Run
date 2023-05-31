import { Button, Grid, Header, Icon, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { format } from "date-fns";
import EmptyComponent from "../../../app/layout/EmptyComponent";

export default observer(function TransactionList() {
    const [target, setTarget] = useState('');
    const { transactionStore, userStore } = useStore();
    const { deleteTransaction, transactionsByDate, loading } = transactionStore;
    const { user: loggedUser } = userStore;

    function handletransactionDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTransaction(id);
    };

    if (transactionStore.transactionRegistry.size === 0) return <EmptyComponent typeOfList="Transactions" />

    return (
        <Segment raised>
            <Header style={{ fontWeight: "bold", fontSize: '13px', textDecoration: 'underline', color: 'red' }}>TRANSACTIONS</Header>
            <Item.Group divided>
                {transactionsByDate.map(transaction => (
                    <Item key={transaction.id} as={Link} to={`/transactions/${transaction.id}`}>
                        <Item.Content >
                            <Item.Header style={{ width: '100%', }}>
                                <Grid
                                    style={{
                                        textDecoration: 'underline',
                                        textDecorationColor: transaction.transactionType === "Expense" ? 'red' : 'blue'
                                    }}
                                >
                                    <Grid.Column width='13' >
                                        {transaction.description}
                                    </Grid.Column>
                                    <Grid.Column width='3' textAlign='right'>
                                        <Label tag color={transaction.transactionType === "Expense" ? 'red' : 'blue'}>{transaction.amount} &euro;</Label>
                                    </Grid.Column>
                                </Grid>
                            </Item.Header>
                            <Item.Meta>{format(transaction.date!, 'dd MMM yyyy')}</Item.Meta>
                            <Segment basic >
                                <Button
                                    className="deleteButton"
                                    name={transaction.id}
                                    loading={loading && target === transaction.id}
                                    onClick={(e) => handletransactionDelete(e, transaction.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                    size="tiny"
                                />
                                <Label basic content={transaction.category} />
                                <Label
                                    basic
                                    color={transaction.transactionType === "Expense" ? 'red' : 'blue'}
                                    content={transaction.transactionType}
                                />
                                {transaction.creator.length !== 0 ?
                                    transaction.creator === loggedUser?.displayName ? (
                                        <Label basic content='You' />
                                    ) : (
                                        <Label basic content={transaction.creator} />
                                    ) : <Label basic content='You' />
                                }
                            </Segment>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
            <Button animated style={{ position: 'fixed', bottom: '1em', right: '1em' }}
                as={NavLink}
                to='/createTransaction'
                color='red'
                size='big'
                circular
            >
                <Button.Content visible><Icon name='plus' /></Button.Content>
                <Button.Content hidden>ADD</Button.Content>
            </Button>
        </Segment >
    )
});