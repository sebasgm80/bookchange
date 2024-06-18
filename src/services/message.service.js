import { APIuser } from "./serviceApiUser.config";

// Realizar una compra de un libro
export const purchaseBook = async (bookId) => {
    try {
        const response = await APIuser.post(`/messages/${bookId}/purchase`);
        return response.data;
    } catch (error) {
        console.error('Error purchasing book:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Error purchasing book');
    }
};

// Obtener las solicitudes de compra
export const getMessages = async () => {
    try {
        const response = await APIuser.get('/messages/user/messages');
        return response.data;
    } catch (error) {
        console.error('Error retrieving messages:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Error retrieving messages');
    }
};

// Confirmar una compra de un libro
export const confirmPurchase = async (messageId) => {
    try {
        const response = await APIuser.post(`/messages/${messageId}/confirm`);
        return response.data;
    } catch (error) {
        console.error('Error confirming purchase:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Error confirming purchase');
    }
};

// Rechazar una compra de un libro
export const rejectPurchase = async (messageId) => {
    try {
        const response = await APIuser.post(`/messages/${messageId}/reject`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting purchase:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Error rejecting purchase');
    }
};
