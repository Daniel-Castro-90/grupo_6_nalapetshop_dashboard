import axios from 'axios';

const productsApi = axios.create({
    baseURL: 'http://localhost:3000'
});

export const getProducts = async () => {
    try {
        const res = await productsApi.get('/api/products');
        return Array.isArray(res.data) ? res.data : [res.data];
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
};