import { useEffect, useState } from "react";
import SkeletonRow from "../components/admin/SkeletonRow";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    gender: "MEN",
    category: "CASUAL",
    subcategory: "",
    description: "",
    price: "",
    is_in_inventory: true,
    items_left: "",
    image: "",
    slug: "",
    sizes: [],
    bestseller: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/product`,
      );
      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isEditing) {
        const duplicate = products.find(
          (p) => p.name.toLowerCase() === formData.name.toLowerCase(),
        );
        if (duplicate) {
          alert("A product with this name already exists.");
          return;
        }
      }

      const token = localStorage.getItem("token");
      const url = currentProduct
        ? `${import.meta.env.VITE_BACKEND_URL}/api/product/${currentProduct._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/product/add`;

      const method = currentProduct ? "PUT" : "POST";
      const body = { ...formData };
      body.price = Number(body.price);
      body.items_left = Number(body.items_left);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert(
          isEditing
            ? "Product updated successfully!"
            : "Product added successfully!",
        );
        fetchProducts();
        resetForm();
      } else {
        const error = await res.json();
        alert(`Error: ${error.message || "Failed to save product"}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({ ...product, sizes: product.sizes || [] });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setFormData({
      name: "",
      brand: "",
      gender: "MEN",
      category: "CASUAL",
      subcategory: "",
      description: "",
      price: "",
      is_in_inventory: true,
      items_left: "",
      image: "",
      slug: "",
      sizes: [],
      bestseller: false,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Product Management
      </h2>

      {/* ── Add / Edit Form ─────────────────────────────────────────────── */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm"
          >
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="KIDS">KIDS</option>
          </select>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm"
          >
            <option value="CASUAL">CASUAL</option>
            <option value="FORMAL">FORMAL</option>
            <option value="RUNNING">RUNNING</option>
            <option value="FOOTBALL">FOOTBALL</option>
          </select>
          <input
            type="text"
            name="subcategory"
            placeholder="Subcategory (e.g., Sneakers, Loafers)"
            value={formData.subcategory}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm"
            required
          />
          <input
            type="number"
            name="items_left"
            placeholder="Stock Quantity"
            value={formData.items_left}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm md:col-span-2"
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm md:col-span-2 min-h-24"
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {["5", "6", "7", "8", "9", "10", "11", "12", "13"].map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={size}
                    checked={formData.sizes?.includes(size)}
                    onChange={(e) => {
                      const newSizes = e.target.checked
                        ? [...(formData.sizes || []), size]
                        : (formData.sizes || []).filter((s) => s !== size);
                      setFormData({ ...formData, sizes: newSizes });
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">{size}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="is_in_inventory"
              checked={formData.is_in_inventory}
              onChange={handleInputChange}
            />
            <label className="text-sm text-gray-600">In Stock</label>
          </div>

          <div className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="bestseller"
              checked={formData.bestseller}
              onChange={(e) =>
                setFormData({ ...formData, bestseller: e.target.checked })
              }
            />
            <label className="text-sm text-gray-600">Mark as Bestseller</label>
          </div>

          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition"
            >
              {isEditing ? "Update Product" : "Add Product"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── Products Table ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-semibold">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Brand</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              /* ── Skeleton rows ──────────────────────────────────────── */
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {/* image cell */}
                  <td className="px-6 py-4">
                    <div className="h-10 w-10 rounded bg-gray-200" />
                  </td>
                  {/* text cells */}
                  {[70, 55, 40, 50].map((w, j) => (
                    <td key={j} className="px-6 py-4">
                      <div
                        className="h-4 rounded bg-gray-200"
                        style={{ width: `${w}%` }}
                      />
                    </td>
                  ))}
                  {/* actions cell */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <div className="h-5 w-8 rounded bg-gray-200" />
                      <div className="h-5 w-12 rounded bg-gray-200" />
                    </div>
                  </td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <img
                      // src={product.image}
                      // alt={product.name}
                      // className="h-10 w-10 rounded object-cover bg-gray-100"
                      // loading="lazy"
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      alt={product.name}
                      className="h-10 w-10 rounded object-cover bg-gray-100"
                      loading="lazy"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4">QAR {product.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        product.is_in_inventory
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.items_left} left
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
