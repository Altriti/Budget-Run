import { observer } from "mobx-react-lite";
import { Grid, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function UserBalance() {
    const { userStore } = useStore();
    const { user } = userStore;

    if (!user) return null;

    var total = user.incomeTotal - user.expenseTotal;

    return (
        <Segment raised>
            <Grid divided style={{ textAlign: 'center', justifyContent: 'space-around' }}>
                <Grid.Column width='5'>
                    <div style={{ display: 'flex', flexDirection: 'column', color: 'blue' }}>
                        <span>Income</span>
                        <span style={{ fontWeight: 'bold' }}>{user.incomeTotal.toFixed(1)}€</span>
                    </div>
                </Grid.Column>
                <Grid.Column width='5'>
                    <div style={{ display: 'flex', flexDirection: 'column', color: 'red' }}>
                        <span>Expense</span>
                        <span style={{ fontWeight: 'bold' }}>{user.expenseTotal.toFixed(1)}€</span>
                    </div>
                </Grid.Column>
                <Grid.Column width='5'>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>Total</span>
                        <span style={{ fontWeight: 'bold' }}>{total.toFixed(1)}€</span>
                    </div>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})