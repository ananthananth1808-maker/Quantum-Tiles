import { supabase } from '../../shared/api/supabase';

// Fetch all products with full details
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch products error:', error);
    throw new Error(error.message);
  }

  return data || [];
};

// Fetch single product
export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Fetch product error:', error);
    throw new Error(error.message);
  }

  return data;
};

// Create new product
export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select();

  if (error) {
    console.error('Create product error:', error);
    throw new Error(error.message);
  }

  return data?.[0];
};

// Update product
export const updateProduct = async (id, product) => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Update product error:', error);
    throw new Error(error.message);
  }

  return data?.[0];
};

// Delete product
export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete product error:', error);
    throw new Error(error.message);
  }

  return true;
};

// Search products
export const searchProducts = async (query) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(
      `name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Search products error:', error);
    throw new Error(error.message);
  }

  return data || [];
};

// Filter products by category
export const filterProductsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Filter products error:', error);
    throw new Error(error.message);
  }

  return data || [];
};

// Related products
export const getRelatedProducts = async (category, productId, limit = 4) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('id', productId)
    .limit(limit);

  if (error) {
    console.error('Related products error:', error);
    throw new Error(error.message);
  }

  return data || [];
};