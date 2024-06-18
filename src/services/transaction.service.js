// services/transaction.service.js
import { APIuser } from "./serviceApiUser.config";

// Crear una nueva transacción
export const createTransaction = async (transactionData) => {
    try {
        const response = await APIuser.post("/transactions", transactionData);
        return response.data;
    } catch (error) {
        console.error("Error creating transaction:", error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || "Error creating transaction");
    }
};

// Confirmar una transacción
export const confirmTransaction = async (transactionId) => {
    try {
        const response = await APIuser.post(`/transactions/${transactionId}/confirm`);
        return response.data;
    } catch (error) {
        console.error("Error confirming transaction:", error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || "Error confirming transaction");
    }
};

// Cancelar una transacción
export const rejectTransaction = async (transactionId) => {
    try {
        const response = await APIuser.post(`/transactions/${transactionId}/reject`);
        return response.data;
    } catch (error) {
        console.error("Error rejecting transaction:", error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || "Error rejecting transaction");
    }
};

// Obtener todas las transacciones del usuario
export const getTransactions = async () => {
    try {
        const response = await APIuser.get("/transactions");
        return response.data;
    } catch (error) {
        console.error("Error retrieving transactions:", error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || "Error retrieving transactions");
    }
};
