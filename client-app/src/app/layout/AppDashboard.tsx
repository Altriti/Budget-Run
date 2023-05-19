import { NavLink, useLocation } from "react-router-dom";
import { Grid, Header, Segment } from "semantic-ui-react";

export default function AppDashboard() {
    const location = useLocation();
    const isTransactionsActive = location.pathname === '/transactions';
    const isMembersActive = location.pathname === '/members';
    return (
        <>
            <Segment inverted color='red'>
                <Header style={{ fontWeight: "bold", fontSize: '13px', textDecoration: 'underline' }}>DASHBOARD</Header>
                <Grid style={{ paddingTop: '3em' }}>
                    <Grid.Row style={{padding: '2em'}} textAlign="center">
                        <Grid.Column style={{ textDecoration: isTransactionsActive ? 'underline' : 'none' }}>
                            <Segment
                                className="dashboard-segment-hover"
                                as={NavLink}
                                to='/transactions'
                                inverted
                                color='red'
                                style={{ fontSize: '20px' }}>
                                TRANSACTIONS
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{padding: '2em'}} textAlign="center">
                        <Grid.Column style={{ textDecoration: isMembersActive ? 'underline' : 'none' }}>
                            <Segment
                                className="dashboard-segment-hover"
                                as={NavLink}
                                to='/members'
                                inverted
                                color='red'
                                style={{ fontSize: '20px' }}>
                                MEMBERS
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{padding: '2em'}} textAlign="center">
                        <Grid.Column style={{ textDecoration: isMembersActive ? 'underline' : 'none' }}>
                            <Segment
                                className="dashboard-segment-hover"
                                as={NavLink}
                                to='/members'
                                inverted
                                color='red'
                                style={{ fontSize: '20px' }}>
                                MEMBERS
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{padding: '2em'}} textAlign="center">
                        <Grid.Column style={{ textDecoration: isMembersActive ? 'underline' : 'none' }}>
                            <Segment
                                className="dashboard-segment-hover"
                                as={NavLink}
                                to='/members'
                                inverted
                                color='red'
                                style={{ fontSize: '20px' }}>
                                MEMBERS
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{padding: '2em'}} textAlign="center">
                        <Grid.Column style={{ textDecoration: isMembersActive ? 'underline' : 'none' }}>
                            <Segment
                                className="dashboard-segment-hover"
                                as={NavLink}
                                to='/members'
                                inverted
                                color='red'
                                style={{ fontSize: '20px' }}>
                                MEMBERS
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </>
    )
}