import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import TransactionDashboard from '../../features/transactions/dashboard/TransactionDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const { transactionStore } = useStore();

  useEffect(() => {
    transactionStore.loadTransactions();
  }, [transactionStore]);

  if (transactionStore.loadingInitial) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <TransactionDashboard />
      </Container>
    </>
  );
}

export default observer(App);
