import { supabase } from '../../shared/api/supabase';

// Optimized fields for product listing - only fetch required data
const PRODUCT_LIST_FIELDS = 'id, name, price, category, image_url';
const PRODUCT_DETAIL_FIELDS = '*';

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_LIST_FIELDS);

  if (error) {
    console.error('Supabase error:', error);
    console.error('Message:', error.message);
    console.error('Details:', error.details);
    console.error('Hint:', error.hint);
    throw new Error(error.message);
  }

  return data || [];
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_DETAIL_FIELDS)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(error.message);
  }

  return data;
};

export const getRelatedProducts = async (category, productId, limit = 4) => {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_LIST_FIELDS)
    .eq('category', category)
    .neq('id', productId)
    .limit(limit);

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(error.message);
  }

  return data || [];
};