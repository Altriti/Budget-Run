import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={NavLink} to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Budget Run
                </Menu.Item>
                <Menu.Item as={NavLink} to='/transactions' name="Transactions" />
                <Menu.Item>
                    <Button as={NavLink} to='/createTransaction' positive content='Add Transaction' />
                </Menu.Item>
            </Container>

        </Menu>
    )
}