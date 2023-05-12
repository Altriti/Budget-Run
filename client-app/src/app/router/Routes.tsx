import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePgae";
import TransactionDashboard from "../../features/transactions/dashboard/TransactionDashboard";
import TransactionForm from "../../features/transactions/form/TransactionForm";
import TransactionDetails from "../../features/transactions/details/TransactionDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'transactions', element: <TransactionDashboard /> },
            { path: 'transactions/:id', element: <TransactionDetails /> },
            { path: 'createTransaction', element: <TransactionForm key={'create'} /> },
            { path: 'manage/:id', element: <TransactionForm key={'manage'} /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
]

export const router = createBrowserRouter(routes);  