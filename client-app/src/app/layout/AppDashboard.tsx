import { NavLink, useLocation } from "react-router-dom";
import { Grid, Header, Segment } from "semantic-ui-react";

export default function AppDashboard() {
    const location = useLocation();
    const isTransactionsActive = location.pathname === '/transactions';
    const isMembersActive = location.pathname === '/members';
    const isNotesActive = location.pathname === '/messages';
    return (
        <>
            <Segment inverted style={{ backgroundColor: '#dc3030' }}>
                <Header style={{ fontWeight: "bold", fontSize: '15px', textDecoration: 'underline' }}>DASHBOARD</Header>
                <Grid style={{ paddingTop: '3em' }}>
                    <Grid.Row style={{ padding: '2em' }} textAlign="center">
                        <Grid.Column style={{ textDecoration: isTransactionsActive ? 'underline' : 'none' }}>
                            <Segment
                                className="dashboard-segment-hover"
                                as={NavLink}
                                to='/transactions'
                                inverted
                                style={{ fontSize: '20px', backgroundColor: '#dc3030' }}>
                                TRANSACTIONS
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '2em' }} textAlign="center">
                        <Grid.Column style={{ textDecoration: isMembersActive ? 'underline' : 'none' }}>
                            <Segment
                                className="dashboard-segment-hover"
                                as={NavLink}
                                to='/members'
                                inverted
                                style={{ fontSize: '20px', backgroundColor: '#dc3030' }}>
                                MEMBERS
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '2em' }} textAlign="center">
                        <Grid.Column style={{ textDecoration: isNotesActive ? 'underline' : 'none' }}>
                            <Segment
                                className="dashboard-segment-hover"
                                as={NavLink}
                                to='/messages'
                                inverted
                                style={{ fontSize: '20px', backgroundColor: '#dc3030' }}>
                                NOTES
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </>
    )
}