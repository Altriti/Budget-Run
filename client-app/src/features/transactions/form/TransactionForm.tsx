import { Button, Form, Header, Icon, Segment, SemanticCOLORS } from "semantic-ui-react";
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
import MyTypeInput from "../../../app/common/form/MyTypeInput";
import MyNumberInput from "../../../app/common/form/MyNumberInput";

export default observer(function TransactionForm() {
    const { transactionStore } = useStore();
    const { createTransaction, updateTransaction, loading, loadTransaction, loadingInitial } = transactionStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const [formColor, setFormColor] = useState<SemanticCOLORS>('grey');

    const [transaction, setTransaction] = useState<Transaction>({
        id: '',
        transactionType: '',
        date: new Date(),
        amount: 0,
        category: '',
        description: '',
        creator: '',
    });

    const validationSchema = Yup.object({
        transactionType: Yup.string().required('You should select a type'),
        date: Yup.string().required('Date cannot be empty').nullable(),
        amount: Yup.number().notOneOf([0], 'Amount is required and should be greater than zero').required('Value is required'),
        category: Yup.string().required('Category cannot be empty'),
        description: Yup.string().required('Description cannot be empty'),
    });

    useEffect(() => {
        if (id) {
            loadTransaction(id).then(transaction => setTransaction(transaction!));
            handleFormColor(transaction.transactionType);
        };
    }, [id, loadTransaction, transaction.transactionType]);

    function handleFormSubmit(transaction: Transaction) {
        if (!transaction.id) {
            transaction.id = uuid();
            createTransaction(transaction).then(() => navigate(`/transactions/${transaction.id}`));
        } else {
            updateTransaction(transaction).then(() => navigate(`/transactions/${transaction.id}`));
        };
    };

    function handleFormColor(value: string) {
        if (value === "Expense") {
            setFormColor('red');
        } else if (value === "Income") {
            setFormColor('blue');
        } else {
            setFormColor('grey');
        };
    };

    if (loadingInitial) return <LoadingComponent content="Loading transaction..." />

    return (
        <Segment raised clearing color={formColor} style={{ border: `2px solid ${formColor}` }}>
            <Header
                style={{ fontWeight: "bold", fontSize: '13.5px', textDecoration: 'underline', paddingBottom: '1em' }}
                content='Transaction Details'
                sub color='red' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={transaction}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTypeInput placeholder='TransactionType' name='transactionType' formcolor={formColor} onChange={(value: string) => handleFormColor(value)} />
                        <MyDateInput name='date' placeholderText='Date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
                        <MyNumberInput placeholder='Amount' name='amount' />
                        <MyTextInput placeholder='Category' name='category' />
                        <MyTextInput placeholder='Description' name='description' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right'
                            color={formColor}
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
        </Segment >
    )
})