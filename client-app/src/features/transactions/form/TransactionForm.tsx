import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Transaction } from "../../../app/models/transaction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';

export default observer(function TransactionForm() {
    const { transactionStore } = useStore();
    const { createTransaction, updateTransaction, loading, loadTransaction, loadingInitial } = transactionStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [transaction, setTransaction] = useState<Transaction>({
        id: '',
        date: '',
        amount: 0,
        category: '',
        description: ''
    });

    useEffect(() => {
        if (id) loadTransaction(id).then(transaction => setTransaction(transaction!));
    }, [id, loadTransaction]);

    function handleSubmit() {
        if (!transaction.id) {
            transaction.id === uuid();
            createTransaction(transaction).then(() => navigate(`/transactions/${transaction.id}`));
        } else {
            updateTransaction(transaction).then(() => navigate(`/transactions/${transaction.id}`));
        };
    };

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setTransaction({ ...transaction, [name]: value })
    };

    if (loadingInitial) return <LoadingComponent content="Loading transaction..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input type="date" placeholder='Date' value={transaction.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Amount' value={transaction.amount} name='amount' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={transaction.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Description' value={transaction.description} name='description' onChange={handleInputChange} />
                <Button
                    loading={loading}
                    floated='right'
                    positive type='submit'
                    content='Submit' />
                <Button
                    as={Link} to={'/transactions'}
                    floated='right'
                    type='button'
                    content='Cancel' />
            </Form>
        </Segment>
    )
})