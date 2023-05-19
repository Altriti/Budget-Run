import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Member } from "../../../app/models/member";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import * as Yup from 'yup';

export default observer(function MemberForm() {
    const { memberStore } = useStore();
    const { createMember, loading, loadMember, loadingInitial, updateMember } = memberStore;
    const navigate = useNavigate();
    const { id } = useParams();

    const [member, setMember] = useState<Member>({
        id: '',
        name: '',
        surname: ''
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        surname: Yup.string().required('Surname is required')
    });

    useEffect(() => {
        if (id) loadMember(id).then(member => setMember(member!))
    }, [loadMember, id]);

    function handleFormSubmit(member: Member) {
        if (!member.id) {
            member.id = uuid();
            createMember(member).then(() => navigate(`/members/${member.id}`));
        } else {
            updateMember(member).then(() => navigate(`/members/${member.id}`));
        };
    };

    if (loadingInitial) return <LoadingComponent content="Loading member..." />

    return (
        <Segment clearing>
            <Header content='Member Details' sub color='red' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={member}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder="Name" name="name" />
                        <MyTextInput placeholder="Surname" name="surname" />
                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={loading}
                            content="Submit"
                            type="submit"
                            color="red"
                            floated="right"
                        />
                        <Button
                            as={Link} to={'/members'}
                            type='button'
                            content='Cancel'
                            floated="right"
                        />
                    </Form>
                )}
            </Formik>
            <Button
                animated
                style={{ position: 'fixed', bottom: '1em', right: '1em' }}
                as={NavLink}
                to='/members'
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