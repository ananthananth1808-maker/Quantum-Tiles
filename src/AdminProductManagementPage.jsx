import { useMemo, useState } from 'react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';

const defaultProducts = [
  {
    id: 1,
    name: 'Luxe Arctic Marble',
    category: 'Floor Tiles',
    price: 149,
    stock: 24,
    size: '24" x 24"',
    color: 'Pearl',
    material: 'Polished Marble',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Noir Velvet Slate',
    category: 'Wall Tiles',
    price: 112,
    stock: 18,
    size: '12" x 24"',
    color: 'Black',
    material: 'Textured Slate',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
  },
];

const categories = ['Floor Tiles', 'Wall Tiles', 'Bathroom Tiles', 'Outdoor Tiles'];
const colors = ['Pearl', 'Black', 'Terracotta', 'Ivory', 'Grey'];
const materials = ['Polished Marble', 'Textured Slate', 'Glazed Ceramic', 'Porcelain', 'Honed Granite'];

export default function AdminProductManagementPage() {
  const [products, setProducts] = useState(defaultProducts);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: categories[0],
    price: 0,
    stock: 0,
    size: '24" x 24"',
    color: colors[0],
    material: materials[0],
    image: '',
  });
  const [preview, setPreview] = useState('');

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: '',
      category: categories[0],
      price: 0,
      stock: 0,
      size: '24" x 24"',
      color: colors[0],
      material: materials[0],
      image: '',
    });
    setPreview('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const productData = {
      ...form,
      id: editId || Date.now(),
      image: preview || form.image,
    };

    setProducts((current) => {
      if (editId) {
        return current.map((item) => (item.id === editId ? productData : item));
      }
      return [productData, ...current];
    });

    resetForm();
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      size: product.size,
      color: product.color,
      material: product.material,
      image: product.image,
    });
    setPreview(product.image);
  };

  const handleDelete = (id) => setProducts((current) => current.filter((item) => item.id !== id));

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const totalProducts = products.length;
  const totalStock = useMemo(() => products.reduce((sum, item) => sum + item.stock, 0), [products]);
  const totalValue = useMemo(() => products.reduce((sum, item) => sum + item.price * item.stock, 0), [products]);

  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Admin Product Management</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Manage your tile catalog</h1>
          </div>
          <Button variant="ghost" className="text-sm uppercase tracking-[0.18em]">Refresh</Button>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Product Form</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Add or edit products</h2>
              </div>
              <div className="text-sm text-white/70">{editId ? 'Edit mode' : 'Create mode'}</div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-white/80">
                  <span>Product Name</span>
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    type="text"
                    placeholder="Enter product name"
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-white/80">
                  <span>Category</span>
                  <select
                    value={form.category}
                    onChange={(event) => setForm({ ...form, category: event.target.value })}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  >
                    {categories.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-white/80">
                  <span>Price</span>
                  <input
                    value={form.price}
                    onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
                    type="number"
                    min="0"
                    placeholder="0"
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-white/80">
                  <span>Stock</span>
                  <input
                    value={form.stock}
                    onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })}
                    type="number"
                    min="0"
                    placeholder="0"
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-white/80">
                  <span>Tile Size</span>
                  <input
                    value={form.size}
                    onChange={(event) => setForm({ ...form, size: event.target.value })}
                    type="text"
                    placeholder='24" x 24"'
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-white/80">
                  <span>Color</span>
                  <select
                    value={form.color}
                    onChange={(event) => setForm({ ...form, color: event.target.value })}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  >
                    {colors.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-white/80">
                  <span>Material</span>
                  <select
                    value={form.material}
                    onChange={(event) => setForm({ ...form, material: event.target.value })}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  >
                    {materials.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
                <label className="space-y-2 text-sm text-white/80">
                  <span>Image Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white file:cursor-pointer file:border-0 file:bg-gold/10 file:px-4 file:py-2 file:text-navy"
                  />
                </label>
                <div className="rounded-[1.75rem] border border-white/10 bg-navy/40 p-4">
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Preview</p>
                  {preview ? (
                    <img src={preview} alt="Preview" className="mt-4 h-40 w-full rounded-3xl object-cover" />
                  ) : (
                    <div className="mt-4 flex h-40 items-center justify-center rounded-3xl border border-dashed border-white/10 text-sm text-white/50">
                      Image preview will appear here
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button type="submit" className="px-6 py-3 text-sm uppercase tracking-[0.18em]">{editId ? 'Update Product' : 'Add Product'}</Button>
                <Button variant="ghost" type="button" className="px-6 py-3 text-sm uppercase tracking-[0.18em]" onClick={resetForm}>
                  Reset
                </Button>
              </div>
            </form>
          </Card>

          <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Inventory Overview</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Current catalog snapshot</h2>
              </div>
              <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">{totalProducts} products</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-navy/40 p-4">
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Total Products</p>
                <p className="mt-3 text-3xl font-semibold text-white">{totalProducts}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-navy/40 p-4">
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Total Stock</p>
                <p className="mt-3 text-3xl font-semibold text-white">{totalStock}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-navy/40 p-4">
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Catalog Value</p>
                <p className="mt-3 text-3xl font-semibold text-white">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-8">
          <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow backdrop-blur-xl">
            <div className="border-b border-white/10 p-6">
              <h2 className="text-2xl font-semibold text-white">Product Data Table</h2>
              <p className="mt-2 text-sm text-white/70">Edit, delete, or review product details at a glance.</p>
            </div>
            <div className="overflow-x-auto px-6 py-4">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm text-white/70">
                <thead className="border-b border-white/10 text-white/60">
                  <tr>
                    <th className="px-4 py-4">Product</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Price</th>
                    <th className="px-4 py-4">Stock</th>
                    <th className="px-4 py-4">Size</th>
                    <th className="px-4 py-4">Color</th>
                    <th className="px-4 py-4">Material</th>
                    <th className="px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/5">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="h-14 w-14 rounded-3xl object-cover" />
                          <div>
                            <p className="font-semibold text-white">{product.name}</p>
                            <p className="text-xs text-white/50">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">{product.category}</td>
                      <td className="px-4 py-4">${product.price}</td>
                      <td className="px-4 py-4">{product.stock}</td>
                      <td className="px-4 py-4">{product.size}</td>
                      <td className="px-4 py-4">{product.color}</td>
                      <td className="px-4 py-4">{product.material}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <Button type="button" variant="ghost" className="px-3 py-2 text-xs uppercase tracking-[0.16em]" onClick={() => handleEdit(product)}>
                            Edit
                          </Button>
                          <Button type="button" className="px-3 py-2 text-xs uppercase tracking-[0.16em] bg-rose-500/10 text-rose-200 hover:bg-rose-500/15" onClick={() => handleDelete(product.id)}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
