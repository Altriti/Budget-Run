import { Grid } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import AppDashboard from './AppDashboard';


function App() {
  const { commonStore, userStore } = useStore();
  const { isLoggedIn } = userStore;

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' theme='colored' />
      <NavBar />
      <Grid style={{ marginTop: '2em' }}>
        <Grid.Row>
          {isLoggedIn ?
            <Grid.Column width='3'>
              <AppDashboard />
            </Grid.Column>
            : null}
          <Grid.Column width={isLoggedIn ? '12' : '16'}>
            <Outlet />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default observer(App);
