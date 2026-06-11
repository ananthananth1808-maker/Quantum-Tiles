import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

const sampleProducts = [
  {
    id: 1,
    name: "Premium Marble White",
    category: "Marble",
    price: 2499,
    stock: 45,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
  },
  {
    id: 2,
    name: "Royal Granite Black",
    category: "Granite",
    price: 1899,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
  },
];

const [showModal, setShowModal] = useState(false);

const handleSaveProduct = async () => {
  try {
    const { error } = await supabase
      .from("products")
      .insert([
        {
          name: newProduct.name,
          description: newProduct.description,
          price: Number(newProduct.price),
          category: newProduct.category,
          image_url: newProduct.image,
          stock: Number(newProduct.stock),
        },
      ]);

    if (error) throw error;

    alert("Product Added Successfully ✅");

    setShowModal(false);

    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
    });

    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Failed to add product ❌");
  }
};
export default function AdminProductsPage() {
  const [search, setSearch] = useState("");

  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Product Management
          </h1>
          <p className="text-white/60 mt-2">
            Manage all tile products.
          </p>
        </div>

        <Button onClick={() => setShowModal(true)}>
  + Add Product
</Button>
      </div>

      {/* Search */}
      <Card className="mb-6 bg-white/5 border-white/10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none"
        />
      </Card>

      {/* Products Table */}
      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="p-4">Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="border-b border-white/5"
                >
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  </td>

                  <td className="text-white">
                    {product.name}
                  </td>

                  <td className="text-white/70">
                    {product.category}
                  </td>

                  <td className="text-green-400 font-semibold">
                    ₹{product.price}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        product.stock > 20
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <Button variant="ghost">
                        Edit
                      </Button>

                      <Button>
                        Delete
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className="w-full max-w-2xl rounded-3xl bg-slate-900 p-8">
      <h2 className="mb-6 text-3xl font-bold text-white">
        Add Product
      </h2>

      <div className="grid gap-4">

        <input
          placeholder="Product Name"
          className="rounded-xl bg-slate-800 p-3 text-white"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          className="rounded-xl bg-slate-800 p-3 text-white"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              category: e.target.value,
            })
          }
        />

        <input
          placeholder="Price"
          type="number"
          className="rounded-xl bg-slate-800 p-3 text-white"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: e.target.value,
            })
          }
        />

        <input
          placeholder="Stock"
          type="number"
          className="rounded-xl bg-slate-800 p-3 text-white"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              stock: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          rows="4"
          className="rounded-xl bg-slate-800 p-3 text-white"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              description: e.target.value,
            })
          }
        />

        <input
          placeholder="Image URL"
          className="rounded-xl bg-slate-800 p-3 text-white"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              image: e.target.value,
            })
          }
        />

        <div className="flex justify-end gap-3 mt-4">

          <Button
            variant="ghost"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>

         <Button onClick={handleSaveProduct}>
  Save Product
</Button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}