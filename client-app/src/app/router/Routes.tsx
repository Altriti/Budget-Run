import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePgae";
import TransactionDashboard from "../../features/transactions/dashboard/TransactionDashboard";
import TransactionForm from "../../features/transactions/form/TransactionForm";
import TransactionDetails from "../../features/transactions/details/TransactionDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'transactions', element: <TransactionDashboard /> },
            { path: 'transactions/:id', element: <TransactionDetails /> },
            { path: 'createTransaction', element: <TransactionForm key={'create'} /> },
            { path: 'manage/:id', element: <TransactionForm key={'manage'} /> }
        ]
    }
]

export const router = createBrowserRouter(routes);  