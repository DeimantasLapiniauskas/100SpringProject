import api from '../api';

export const addProduct = (payload) => api.post('/products', payload);

export const updateProduct = (productID, payload) => api.put(`/products/${productID}`, payload);

export const deleteProduct = (productID) => api.delete(`/products/${productID}`);

export const addProductImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/products/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    const result = response.data;
    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
};