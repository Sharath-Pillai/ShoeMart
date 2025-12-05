import { useEffect, useState } from "react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    gender: "MEN",
    category: "CASUAL",
    price: "",
    is_in_inventory: true,
    items_left: 10,
    imageURL: "",
    slug: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/shoes");
      const data = await res.json();
      setProducts(data.filter(p => p.is_active !== false));
    } catch (error) {
      console.error("Error fetching products:", error);
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
      // Check for duplicates
      if (!isEditing) {
        const duplicate = products.find(
          (p) => p.name.toLowerCase() === formData.name.toLowerCase()
        );
        if (duplicate) {
          alert("A product with this name already exists.");
          return;
        }
      }

      const url = isEditing
        ? `http://localhost:3000/shoes/${currentProduct.id}`
        : "http://localhost:3000/shoes";
      const method = isEditing ? "PATCH" : "POST";

      const body = { ...formData };
      if (!isEditing) {
        // Generate a simple numeric ID if not present (JSON Server usually handles this, but let's be safe if we need specific format)
        // Actually, JSON server handles ID generation automatically for POST.
        // We just need to ensure we're not sending an empty ID or something weird.
        // Also, let's ensure price/items_left are numbers
        body.price = Number(body.price);
        body.items_left = Number(body.items_left);
        body.is_active = true; // Ensure new products are active
      }

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData(product);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`http://localhost:3000/shoes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: false }),
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
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
      price: "",
      is_in_inventory: true,
      items_left: 10,
      imageURL: "",
      slug: "",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Management</h2>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            name="imageURL"
            placeholder="Image URL"
            value={formData.imageURL}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 text-sm md:col-span-2"
            required
          />
          <div className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="is_in_inventory"
              checked={formData.is_in_inventory}
              onChange={handleInputChange}
            />
            <label className="text-sm text-gray-600">In Stock</label>
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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="h-10 w-10 rounded object-cover bg-gray-100"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
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
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
