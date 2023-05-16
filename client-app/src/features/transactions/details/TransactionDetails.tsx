import { Button, Card, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { format } from "date-fns";

export default observer(function TransactionDetails() {
    const { transactionStore } = useStore();
    const { selectedTransaction: transaction, loadTransaction, loadingInitial } = transactionStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadTransaction(id);
    }, [id, loadTransaction]);

    if (loadingInitial || !transaction) return <LoadingComponent />;

    return (
        <Segment basic>
            <Card fluid>
                <Card.Content>
                    <Card.Header>{transaction.description}</Card.Header>
                    <Card.Meta>
                        <div>{format(transaction.date!, 'dd MMM yyyy')}</div>
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
            <Segment basic style={{ position: 'fixed', bottom: '2em', right: '2em' }}>
                <Button.Group size='big'>
                    <Button
                        animated
                        as={NavLink}
                        to='/transactions'
                        color='red'
                        circular
                    >
                        <Button.Content visible><Icon name='arrow left' /></Button.Content>
                        <Button.Content hidden>BACK</Button.Content>
                    </Button>
                    <Button.Or />
                    <Button animated
                        as={NavLink}
                        to='/createTransaction'
                        color='red'
                        circular
                    >
                        <Button.Content visible><Icon name='plus' /></Button.Content>
                        <Button.Content hidden>ADD</Button.Content>
                    </Button>
                </Button.Group>
            </Segment>
        </Segment>
    )
})