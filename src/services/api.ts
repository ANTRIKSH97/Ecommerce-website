
import { ProductsResponse, User } from "@/types";

const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async (page: number = 1, limit: number = 12): Promise<ProductsResponse> => {
  const skip = (page - 1) * limit;
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

export const fetchProductsByCategory = async (category: string, page: number = 1, limit: number = 12): Promise<ProductsResponse> => {
  const skip = (page - 1) * limit;
  const response = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  
  return response.json();
};

export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
  
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  
  return response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};

export const loginUser = async (username: string, password: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return response.json();
};

export const registerUser = async (
  firstName: string, 
  lastName: string, 
  username: string, 
  email: string, 
  password: string
): Promise<User> => {
  // Note: DummyJSON doesn't actually create new users, this is just a mock
  const response = await fetch(`${BASE_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password
    })
  });
  
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  
  return response.json();
};
