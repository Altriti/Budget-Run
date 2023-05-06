import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function TransactionForm() {
    const { transactionStore } = useStore();
    const { selectedTransaction, closeForm, createTransaction, updateTransaction, loading } = transactionStore;

    const initialState = selectedTransaction ?? {
        id: '',
        date: '',
        amount: 0,
        category: '',
        description: ''
    }

    const [transaction, setTransaction] = useState(initialState);

    function handleSubmit() {
        transaction.id ? updateTransaction(transaction) : createTransaction(transaction);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setTransaction({ ...transaction, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input type="date" placeholder='Date' value={transaction.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Amount' value={transaction.amount} name='amount' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={transaction.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Description' value={transaction.description} name='description' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})