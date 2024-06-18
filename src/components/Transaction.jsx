import "./Transaction.css";
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/transaction.service';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="transaction-container">
            <div className="transaction-header">Transactions</div>
            {transactions.length === 0 ? (
                <p>No hay transacciones</p>
            ) : (
                <table className="transaction-list">
                    <thead>
                        <tr className="transaction-list-header">
                            <th>Libro</th>
                            <th>Comprador</th>
                            <th>Vendedor</th>
                            <th>Precio</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody className="transaction-list-body">
                        {transactions.map(({ _id, bookId, buyerId, sellerId, amount, status }) => (
                            <tr key={_id} className="transaction-item">
                                <td>{bookId?.title || 'N/A'}</td>
                                <td>{buyerId?.name || 'N/A'}</td>
                                <td>{sellerId?.name || 'N/A'}</td>
                                <td>{amount}</td>
                                <td><span className={`transaction-status ${status}`}>{status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Transactions;
