import { Formik } from "formik";
import { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { MessageForm } from "../../app/models/message";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default observer(function SendMessageForm() {
    const { messageStore } = useStore();
    const { createMessage, loading } = messageStore;
    const navigate = useNavigate();

    const [message] = useState<MessageForm>({
        id: '',
        recieverUserEmail: '',
        content: ''
    });

    var mongoObjectId = function () {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    };

    function handleFormSubmit(message: MessageForm) {
        message.id = mongoObjectId();
        createMessage(message).then(() => navigate('/transactions'));
    };

    const validationSchema = Yup.object({
        recieverUserEmail: Yup.string().required("Email is required"),
        content: Yup.string().required("Content is required")
    })

    return (
        <Segment clearing>
            <Header content='Add Note' color="red" />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={message}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder="Email" name="recieverUserEmail" />
                        <MyTextInput placeholder="Content" name="content" />
                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={loading}
                            type="submit"
                            content='Submit'
                            color="red"
                            floated="right"
                        />
                        <Button
                            as={Link} to={'/transactions'}
                            type='button'
                            content='Cancel'
                            floated="right"
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})