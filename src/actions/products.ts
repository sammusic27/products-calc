import { api } from '../services/api';

function fetchProducts(){
  return api({
    url: 'products',
    method: 'GET'
  });
}

function createProduct(data: any){
  return api({
    url: 'products',
    method: 'POST',
    body: data
  });
}

function updateProduct(id: string, data: any){
  return api({
    url: `products/${id}`,
    method: 'PUT',
    body: data
  });
}

function deleteProduct(id: string){
  return api({
    url: `products/${id}`,
    method: 'DELETE',
  });
}


export const actions = {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
};