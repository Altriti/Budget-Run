import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Button, Card, Grid, Header, Item, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Transaction } from "../../../app/models/transaction";
import EmptyComponent from "../../../app/layout/EmptyComponent";

export default observer(function MemberDetails() {
    const { memberStore } = useStore();
    const { selectedMember: member, loadingInitial, loadMember, manageAccess } = memberStore;
    const { id } = useParams();
    const [transactionsByDate, setTransactionsByDate] = useState<Transaction[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (id) {
            loadMember(id).then((member) => {
                if (member && member.transactions) {
                    const sortedTransactions = member.transactions.slice().sort((a, b) => {
                        if (a.date && b.date) {
                            const dateA = new Date(a.date);
                            const dateB = new Date(b.date);
                            return dateB.getTime() - dateA.getTime();
                        }
                        return 0;
                    });
                    setTransactionsByDate(sortedTransactions);
                }
            });
        };
    }, [loadMember, id]);

    if (loadingInitial || !member) return <LoadingComponent content="Loading member..." />

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header width='8'>{member.name} {member.surname}
                    <Button
                        width='4'
                        as={Link} to={`/members/manage/${member.id}`}
                        basic
                        color="blue"
                        content='Edit Member'
                        floated="right"
                    />
                </Card.Header>
                <Card.Meta>
                    <span>{member.email}</span>
                </Card.Meta>
                <Card.Description>
                    <Button
                        name={member.id}
                        content={member.access ? 'Granted' : 'Denied'}
                        color={member.access ? 'green' : 'red'}
                        onClick={() => manageAccess(member.id)}
                        size="mini"
                    />
                    <Label basic content={member.displayName} />
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Segment raised>
                    <Header
                        style={{
                            fontWeight: "bold", fontSize: '13px', textDecoration: 'underline', color: 'red'
                        }}
                    >
                        TRANSACTIONS MADE BY {member.displayName?.toLocaleUpperCase()}
                    </Header>
                    {dropdownOpen &&
                        <Item.Group divided>
                            {transactionsByDate.length === 0 ? <EmptyComponent typeOfList="Transactions" /> :
                                transactionsByDate?.map(transaction => (
                                    <Item key={transaction.id} as={Link} to={`/transactions/${transaction.id}`}>
                                        <Item.Content >
                                            <Item.Header style={{ width: '100%', }}>
                                                <Grid
                                                    style={{
                                                        textDecoration: 'underline',
                                                        textDecorationColor: transaction.transactionType === "Expense"
                                                            ? 'red' : 'blue'
                                                    }}
                                                >
                                                    <Grid.Column width='13' >
                                                        {transaction.description}
                                                    </Grid.Column>
                                                    <Grid.Column width='3' textAlign='right'>
                                                        <Label
                                                            tag
                                                            color={transaction.transactionType === "Expense"
                                                                ? 'red' : 'blue'}
                                                        >
                                                            {transaction.amount} &euro;
                                                        </Label>
                                                    </Grid.Column>
                                                </Grid>
                                            </Item.Header>
                                            <Item.Meta>
                                                {transaction.date && format(new Date(transaction.date), 'dd MMM yyyy')}
                                            </Item.Meta>
                                            <Segment basic>
                                                <Label basic content={transaction.category} />
                                                <Label
                                                    basic
                                                    color={transaction.transactionType === "Expense"
                                                        ? 'red' : 'blue'}
                                                    content={transaction.transactionType}
                                                />
                                            </Segment>
                                        </Item.Content>
                                    </Item>
                                ))}
                        </Item.Group>
                    }
                    <Header
                        className="blueHover"
                        as='a'
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        style={{ fontWeight: "bold", fontSize: '13px' }}
                        content={dropdownOpen ? 'Hide transactions' : 'Show transactions'}
                    >
                    </Header>
                </Segment>
            </Card.Content>
        </Card >
    )
})