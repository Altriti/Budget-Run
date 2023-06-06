import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';

export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            validationSchema={Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().required()
            })}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
                setErrors({ error: "Invalid email or password" }))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Login' color="red" textAlign="center" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                    />
                    <Button
                        style={{ borderRadius: '9px' }}
                        loading={isSubmitting}
                        color="red"
                        content='Login'
                        type="submit"
                        fluid
                        size="large"
                    />
                </Form>
            )}
        </Formik>
    )
})