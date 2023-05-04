import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Transaction } from '../models/transaction';
import NavBar from './NavBar';
import TransactionDashboard from '../../features/transactions/dashboard/TransactionDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);//pa <Transaction[]>, transactions e ka type never. Kjo i jep type array te transaksioneve
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    if (transaction.id) {
      agent.Transactions.update(transaction).then(() => {
        setTransactions([...transactions.filter(x => x.id !== transaction.id), transaction])
        setSelectedTransaction(transaction);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      transaction.id = uuid();
      agent.Transactions.create(transaction).then(() => {
        setTransactions([...transactions, transaction])
        setSelectedTransaction(transaction);
        setEditMode(false);
        setSubmitting(false);
      });
    };
  };

  function handleDeleteTransaction(id: string) {
    setSubmitting(true);
    agent.Transactions.delete(id).then(() => {
      setTransactions([...transactions.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
  };

  useEffect(() => {
    agent.Transactions.list()
      .then(response => {
        let transactions: Transaction[] = [];
        response.forEach(transaction => {
          transaction.date = transaction.date.split('T')[0];
          transactions.push(transaction);
        });
        setTransactions(transactions);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingComponent content='Loading app...' />

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
