import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Transaction } from "../../../app/models/transaction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import { Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function TransactionForm() {
    const { transactionStore } = useStore();
    const { createTransaction, updateTransaction, loading, loadTransaction, loadingInitial } = transactionStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [transaction, setTransaction] = useState<Transaction>({
        id: '',
        date: null,
        amount: 0,
        category: '',
        description: '',
        appUserId: '',
    });

    const validationSchema = Yup.object({
        date: Yup.string().required('Date is required').nullable(),
        amount: Yup.number().required('Amount is required'),
        category: Yup.string().required('Category is required'),
        description: Yup.string().required('Description is required'),
    });

    useEffect(() => {
        if (id) loadTransaction(id).then(transaction => setTransaction(transaction!));
    }, [id, loadTransaction]);

    function handleFormSubmit(transaction: Transaction) {
        if (!transaction.id) {
            transaction.id = uuid();
            createTransaction(transaction).then(() => navigate(`/transactions/${transaction.id}`));
        } else {
            updateTransaction(transaction).then(() => navigate(`/transactions/${transaction.id}`));
        };
    };

    if (loadingInitial) return <LoadingComponent content="Loading transaction..." />

    return (
        <Segment clearing >
            <Header content='Transaction Details' sub color='red' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={transaction}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyDateInput name='date' placeholderText='Date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
                        <MyTextInput placeholder='Amount' name='amount' />
                        <MyTextInput placeholder='Category' name='category' />
                        <MyTextInput placeholder='Description' name='description' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right'
                            color="red"
                            type='submit'
                            content='Submit' />
                        <Button
                            as={Link} to={'/transactions'}
                            floated='right'
                            type='button'
                            content='Cancel' />
                    </Form>
                )}
            </Formik>
            <Button
                animated
                style={{ position: 'fixed', bottom: '1em', right: '1em' }}
                as={NavLink}
                to='/transactions'
                color='red'
                size='big'
                circular
            >
                <Button.Content visible><Icon name='arrow left' /></Button.Content>
                <Button.Content hidden>BACK</Button.Content>
            </Button>
        </Segment>
    )
})