import { APIuser } from "./serviceApiUser.config";

// Obtener la wallet del usuario
export const getWallet = async () => {
  try {
    const response = await APIuser.get('/wallet');
    return response.data || []; 
  } catch (error) {
    console.error('Error retrieving wallet:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Error retrieving wallet');
  }
};
