import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Transaction } from '../models/transaction';
import NavBar from './NavBar';
import TransactionDashboard from '../../features/transactions/dashboard/TransactionDashboard';
import { v4 as uuid } from 'uuid';


function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);//pa <Transaction[]>, transactions e ka type never. Kjo i jep type array te transaksioneve
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  function handleSelectTransaction(id: string) {
    setSelectedTransaction(transactions.find(x => x.id === id));
  }

  function handleCancelSelectTransaction() {
    setSelectedTransaction(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectTransaction(id) : handleCancelSelectTransaction();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditTransaction(transaction: Transaction) {
    transaction.id
      ? setTransactions([...transactions.filter(x => x.id !== transaction.id), transaction])
      : setTransactions([...transactions, { ...transaction, id: uuid() }]);
    setEditMode(false);
    setSelectedTransaction(transaction);
  }

  function handleDeleteTransaction(id: string) {
    setTransactions([...transactions.filter(x => x.id !== id)]);
  }

  useEffect(() => {
    axios.get<Transaction[]>('http://localhost:5000/api/transactions')
      .then(response => {
        setTransactions(response.data);
      });
  }, []);
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <TransactionDashboard
          transactions={transactions}
          selectedTransaction={selectedTransaction}
          selectTransaction={handleSelectTransaction}
          cancelSelectTransaction={handleCancelSelectTransaction}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditTransaction}
          deleteTransaction={handleDeleteTransaction}
        />
      </Container>
    </>
  );
}

export default App;
