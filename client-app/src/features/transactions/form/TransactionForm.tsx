import { Button, Form, Segment } from "semantic-ui-react";
import { Transaction } from "../../../app/models/transaction";
import { ChangeEvent, useState } from "react";

interface Props {
    closeForm: () => void;
    transaction: Transaction | undefined;
    createOrEdit: (transaction: Transaction) => void;
}

export default function TransactionForm({ closeForm, transaction: selectedTransaction, createOrEdit }: Props) {

    const initialState = selectedTransaction ?? {
        id: '',
        date: '',
        amount: 0,
        category: '',
        description: ''
    }

    const [transaction, setTransaction] = useState(initialState);

    function handleSubmit() {
        createOrEdit(transaction);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setTransaction({ ...transaction, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Date' value={transaction.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Amount' value={transaction.amount} name='amount' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={transaction.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Description' value={transaction.description} name='description' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}