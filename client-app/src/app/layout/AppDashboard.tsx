import { NavLink, useLocation } from "react-router-dom";
import { Grid, Header, Segment } from "semantic-ui-react";

export default function AppDashboard() {
    const location = useLocation();
    const isTransactionsActive = location.pathname === '/transactions';
    return (
        <>
            <Segment inverted color='red'>
                <Header style={{ fontWeight: "bold", fontSize: '13px', textDecoration: 'underline' }}>DASHBOARD</Header>
                <Grid style={{ paddingTop: '3em' }}>
                    <Grid.Row textAlign="center">
                        <Grid.Column style={{ textDecoration: isTransactionsActive ? 'underline' : 'none' }}>
                            <Segment
                                as={NavLink}
                                to='/transactions'
                                inverted
                                color='red'
                                style={{ fontSize: '20px' }}>
                                TRANSACTIONS
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign="center">
                        <Grid.Column >
                            <Segment inverted color='red' style={{ fontSize: '20px' }}>
                                Statistics
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign="center">
                        <Grid.Column >
                            <Segment inverted color='red' style={{ fontSize: '20px' }}>
                                Statistics
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign="center">
                        <Grid.Column >
                            <Segment inverted color='red' style={{ fontSize: '20px' }}>
                                Statistics
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign="center">
                        <Grid.Column >
                            <Segment inverted color='red' style={{ fontSize: '20px' }}>
                                Statistics
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </>
    )
}