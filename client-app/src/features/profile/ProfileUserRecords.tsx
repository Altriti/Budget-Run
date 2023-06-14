import { useEffect, useState } from "react";
import { Card, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Transaction } from "../../app/models/transaction";

export default observer(function ProfileUserRecords() {
    const { transactionStore, memberStore } = useStore();
    const { membersArr, memberRegistry, loadMembers } = memberStore;
    const { transactionsByDate, transactionRegistry, loadTransactions, loadingInitial } = transactionStore;
    const [highestTransaction, setHighestTransaction] = useState<Transaction>(transactionsByDate[0] || null);

    useEffect(() => {
        if (transactionRegistry.size <= 1 && memberRegistry.size <= 1) {
            loadTransactions();
            loadMembers();
        };
    }, [transactionRegistry.size, loadTransactions, memberRegistry.size, loadMembers]);

    if (loadingInitial) return <LoadingComponent content="Loading..." />;

    if (transactionsByDate.length > 0) {
        transactionsByDate.forEach(transaction => {
            if (transaction.transactionType === 'Expense' && transaction.amount > (highestTransaction?.amount || 0)) {
                setHighestTransaction(transaction);
            }
        });
    }

    return (
        <Segment>
            <Header content='User Records' color="red" />
            <Card.Group>
                <Card
                    fluid
                    color='yellow'
                    header={
                        <div
                            style={{
                                display: 'flex', flexDirection: 'row'
                                , justifyContent: 'space-between'
                            }}
                        >
                            <span>
                                The total number of transactions you have made is:
                            </span>
                            <span
                                style={{ fontSize: '20px', fontWeight: 'bold' }}
                            >
                                {transactionsByDate.length}
                            </span>
                        </div>
                    }
                />
                <Card
                    fluid
                    color='yellow'
                    header={
                        <div
                            style={{
                                display: 'flex', flexDirection: 'row'
                                , justifyContent: 'space-between'
                            }}
                        >
                            <span>
                                The total number of members you have is:
                            </span>
                            <span
                                style={{ fontSize: '20px', fontWeight: 'bold' }}
                            >
                                {membersArr.length}
                            </span>
                        </div>
                    }
                />
            </Card.Group>
            <Segment color="red">
                {highestTransaction ? (
                    <>
                        <div>Description: {highestTransaction.description}</div>
                        <div>Amount: {highestTransaction.amount}€</div>
                        <div>Category: {highestTransaction.category}</div>
                    </>
                ) : (
                    'No highest transaction'
                )}
            </Segment>
        </Segment>
    )
})