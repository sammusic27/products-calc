import { api } from '@Services/api';
import { pending, failure, completed } from "@Reducers/productsReducer";
import { pending as pendingProduct, failure as failureProduct, completed as completedProduct } from "@Reducers/productReducer";

export const fetchProducts = () => async (dispatch: any) => {
  dispatch(pending());
  try {
    const response = await api({
      url: 'products',
      method: 'GET'
    });
    dispatch(completed(response));
    return response;
  } catch (error) {
    dispatch(failure('Ошибка'));
    return error;
  }
}

export const createProduct = (data: any) => async (dispatch: any) => {
  dispatch(pendingProduct());
  try {
    const response = await api({
      url: 'products',
      method: 'POST',
      body: data
    });
    dispatch(completedProduct(response));
    return response;
  } catch (error) {
    dispatch(failureProduct('Ошибка'));
    return error;
  }
}

export const updateProduct = (id: string, data: any) => async (dispatch: any) => {
  dispatch(pendingProduct());
  try {
    const response = await api({
      url: `products/${id}`,
      method: 'PUT',
      body: data
    });
    dispatch(completedProduct(response));
    return response;
  } catch (error) {
    dispatch(failureProduct('Ошибка'));
    return error;
  }
}

export const deleteProduct = (id: string) => async (dispatch: any) => {
  dispatch(pending());
  try {
    const response = await api({
      url: `products/${id}`,
      method: 'DELETE'
    });
    dispatch(completedProduct(response));
    return response;
  } catch (error) {
    dispatch(failureProduct('Ошибка'));
    return error;
  }
}

export const actions = {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
};