import { Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
    const { userStore } = useStore();
    const { user, logout } = userStore;
    return (
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item header as={NavLink} to='/'>
                    <Icon size="big" name="money" style={{ marginRight: '10px' }} />
                    Budget Run
                </Menu.Item>
                <Menu.Item as={NavLink} to='/errors' name="Errors" />
                <Menu.Item position="right">
                    {userStore.isLoggedIn ? <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text='My profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                        : null}
                </Menu.Item>
            </Container>

        </Menu>
    )
})