import { Button, Divider, Grid, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';


export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <>
            {!userStore.isLoggedIn ?
                (
                    <>
                        <Segment
                            raised
                            style={{
                                margin: 'auto', width: '90%', height: '50em', display: 'flex'
                                , justifyContent: 'center', borderRadius: '30px'
                            }}
                        >
                            <Grid style={{ width: '100%', alignItems: 'center' }}>
                                <Grid.Column
                                    width='6'
                                    style={{
                                        height: '100%', backgroundColor: '#dc3030', marginLeft: '2em'
                                        , display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '50px', fontWeight: 'bold', color: 'white' }}>Welcome!</p>
                                        <p style={{ fontSize: '17px', color: 'white' }}>Log in to see what is going on with your budget
                                            <br />Or
                                            <br />Create an account if you still haven't and keep track of your or your family members expenses
                                        </p>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width='9'>
                                    <Segment
                                        raised
                                        style={{ textAlign: 'center', border: '1px dotted red', margin: '0 3em 0 8em', borderRadius: '10px' }}
                                    >
                                        <LoginForm />
                                        <Divider />
                                        <Button
                                            style={{ width: '50%', borderRadius: '9px' }}
                                            onClick={() => modalStore.openModal(<RegisterForm />)}
                                            size="large"
                                            positive
                                        >
                                            Create account
                                        </Button>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        <Segment raised style={{ marginLeft: '1%', width: '98%', height: '50em' }}>
                            <Grid style={{ margin: '0 5em 0 5em' }}>
                                <Grid.Column
                                    width='6'
                                    style={{
                                        height: '50em', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                    }}
                                >
                                    <Image src={`/assets/homepagePic.jpg`} style={{ borderRadius: '50%', height: '32em' }} />
                                </Grid.Column>
                                <Grid.Column
                                    width='10'
                                    style={{
                                        height: '50em', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{ fontSize: '50px', color: 'red' }}>Manage your transactions</h2>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ display: 'inline', fontSize: '25px' }}>
                                                We keep track of all your
                                                <span style={{ display: 'inline', color: 'red' }}> Expenses</span> and
                                                <span style={{ display: 'inline', color: 'blue' }}> Incomes </span> <br />
                                                all categorized. By doing so you'll have <b>Expense Control</b>, <b>Financial Awareness</b>
                                                , <b>Budget Monitoring</b> and most important <b>Peace of Mind</b>
                                            </p>
                                        </div>
                                    </div>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        <Segment style={{ marginLeft: '1%', width: '98%', height: '55em' }}>
                            <Slider>
                                <Segment raised style={{ marginLeft: '1%', width: '98%', height: '50em' }}>
                                    <Grid style={{ margin: '0 5em 0 5em' }}>
                                        <Grid.Column
                                            width='10'
                                            style={{
                                                height: '50em', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ textAlign: 'center' }}>
                                                <h2 style={{ fontSize: '50px', color: 'red' }}>You can see your family's transactions too</h2>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p style={{ display: 'inline', fontSize: '25px' }}>
                                                        We offer you monitoring over your family members too. You can see their
                                                        <span style={{ display: 'inline', color: 'red' }}> Expenses</span> and
                                                        <span style={{ display: 'inline', color: 'blue' }}> Incomes </span>. <br />
                                                        If you have children who are students, you can observe their transactions and see their financial states
                                                    </p>
                                                </div>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column
                                            width='6'
                                            style={{
                                                height: '50em', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                            }}
                                        >
                                            <Image src={`/assets/hpFamilyPhoto.jpg`} style={{ borderRadius: '50%', height: '32em', width: '32em' }} />
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                                <Segment raised style={{ marginLeft: '1%', width: '98%', height: '50em' }}>
                                    <Grid style={{ margin: '0 5em 0 5em' }}>
                                        <Grid.Column
                                            width='10'
                                            style={{
                                                height: '50em', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ textAlign: 'center' }}>
                                                <h2 style={{ fontSize: '50px', color: 'red' }}>You can have as many members as you want</h2>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p style={{ display: 'inline', fontSize: '25px' }}>
                                                        You will have a list of members you have added. Members can add
                                                        <span style={{ display: 'inline', color: 'red' }}> Expenses</span> or
                                                        <span style={{ display: 'inline', color: 'blue' }}> Incomes </span>. <br />
                                                        You have control over members and can manage their access whether
                                                        they can or cannot add transactions.
                                                    </p>
                                                </div>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column
                                            width='6'
                                            style={{
                                                height: '50em', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                            }}
                                        >
                                            <Image src={`/assets/hpMembersList.png`} style={{ borderRadius: '50%', height: '32em', width: '32em' }} />
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                                <Segment raised style={{ marginLeft: '1%', width: '98%', height: '50em' }}>
                                    <Grid style={{ margin: '0 5em 0 5em' }}>
                                        <Grid.Column
                                            width='10'
                                            style={{
                                                height: '50em', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ textAlign: 'center' }}>
                                                <h2 style={{ fontSize: '50px', color: 'red' }}>You can see each member's details</h2>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p style={{ display: 'inline', fontSize: '25px' }}>
                                                        You will be able to see every member's details including a list of their
                                                        <span style={{ display: 'inline', color: 'red' }}> Expenses</span> and
                                                        <span style={{ display: 'inline', color: 'blue' }}> Incomes </span>. <br />
                                                    </p>
                                                </div>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column
                                            width='6'
                                            style={{
                                                height: '50em', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                            }}
                                        >
                                            <Image src={`/assets/hpMemberDet.png`} style={{ borderRadius: '50%', height: '32em', width: '32em' }} />
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                            </Slider>
                        </Segment>
                    </>
                )
                : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>Login</Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>Register</Button>
                    </>
                )
            }
        </>


    )
})