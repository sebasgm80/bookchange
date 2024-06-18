import React, { useEffect, useState } from 'react';
import { getWallet } from '../services/wallet.service'; // Asegúrate de tener este servicio correctamente configurado
import "./Wallet.css";

const Wallet = () => {
  const [wallet, setWallet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const data = await getWallet();
        setWallet(data || []); 
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  if (loading) return <div className="loading-message">Cargando wallet...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="wallet-container">
      <h1>Wallet</h1>
      {wallet.length > 0 ? (
        <ul className="wallet-list">
          {wallet.map((item) => (
            <li key={item._id} className="wallet-card">
              <h2>{item.title}</h2>
              <p>Balance: {item.balance}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes transacciones en tu wallet.</p>
      )}
    </div>
  );
};

export default Wallet;
