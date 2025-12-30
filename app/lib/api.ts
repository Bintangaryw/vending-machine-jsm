import axios from "axios";

const BASE_URL = "http://localhost:8000";

//PRODUCT FETCHERS

// Get All Products fetcher
export async function getAllProducts() {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Patch stock after buy
export async function updateProductStock(productId: number, newStock: number) {
    const response = await axios.patch(`${BASE_URL}/products/${productId}`, { stock: newStock });
    return response.data;
}

// TRANSACTION FETCHERS
// Get All Transactions fetcher
export async function getAllTransactions() {
    try {
        const response = await axios.get(`${BASE_URL}/transactions`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTransaction(transaction: any) {
    const response = await axios.post(`${BASE_URL}/transactions`, transaction);
    return response.data;
}

// ADMIN CRUD FETCHERS
// CREATE
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProduct(product: any) {
    const response = await axios.post(`${BASE_URL}/products`, product);
    return response.data;
}

// UPDATE
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProduct(productId: number, product: any) {
    const response = await axios.put(`${BASE_URL}/products/${productId}`, product);
    return response.data;
}

// DELETE
export async function deleteProduct(productId: number) {
    await axios.delete(`${BASE_URL}/products/${productId}`);
}
