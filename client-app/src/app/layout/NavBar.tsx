import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {

    const { transactionStore } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Budget Run
                </Menu.Item>
                <Menu.Item name="Transactions" />
                <Menu.Item>
                    <Button onClick={() => transactionStore.openForm()} positive content='Add Transaction' />
                </Menu.Item>
            </Container>

        </Menu>
    )
}