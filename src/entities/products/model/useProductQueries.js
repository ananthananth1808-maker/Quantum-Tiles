import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProductsByCategory,
} from '../api';

// Query keys
export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (filters) => [...productKeys.lists(), { filters }],
  details: () => [...productKeys.all, 'detail'],
  detail: (id) => [...productKeys.details(), id],
  search: (query) => [...productKeys.all, 'search', query],
  category: (category) => [...productKeys.all, 'category', category],
};

// Get all products
export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Get single product
export const useProductById = (id, enabled = true) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Search products
export const useSearchProducts = (query, enabled = true) => {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => searchProducts(query),
    enabled: enabled && !!query && query.length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

// Filter by category
export const useProductsByCategory = (category, enabled = true) => {
  return useQuery({
    queryKey: productKeys.category(category),
    queryFn: () => filterProductsByCategory(category),
    enabled: enabled && !!category,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

// Create product mutation
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};

// Update product mutation
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }) => updateProduct(id, product),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: productKeys.detail(data.id),
        });
      }
    },
  });
};

// Delete product mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
