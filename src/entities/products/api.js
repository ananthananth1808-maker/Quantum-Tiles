import { supabase } from "../../shared/lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}