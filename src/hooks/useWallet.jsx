import { useEffect, useState } from 'react';
import { getWallet } from '../services/wallet.service';
import { useAuth } from '../context/authContext';

export const useWallet = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWallet = async () => {
      if (user) {
      try {
        const data = await getWallet();
        if (data && data.length > 0) {
          setBalance(data[0].balance); // Asumiendo que el balance está en la primera entrada
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    };
    fetchWallet();
  }, [user]);

  return { balance, loading, error };
};
