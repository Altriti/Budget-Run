import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function TransactionDetails() {
    const { transactionStore } = useStore();
    const { selectedTransaction: transaction, loadTransaction, loadingInitial } = transactionStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadTransaction(id);
    }, [id, loadTransaction]);

    if (loadingInitial || !transaction) return <LoadingComponent />;

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
                    <Button
                        as={Link} to={`/manage/${transaction.id}`}
                        basic
                        color="blue"
                        content='Edit'
                    />
                    <Button
                        as={Link} to='/transactions'
                        basic
                        color="grey"
                        content='Cancel'
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})