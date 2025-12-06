import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  // Create Admin Form State
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
  });
  const [createMessage, setCreateMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          fetch("http://localhost:3000/orders"),
          fetch("http://localhost:3000/products"),
          fetch("http://localhost:3000/users"),
        ]);

        const orders = await ordersRes.json();
        const products = await productsRes.json();
        const users = await usersRes.json();

        const revenue = orders.reduce((acc, order) => acc + order.total, 0);

        setStats({
          totalOrders: orders.length,
          totalRevenue: revenue,
          totalProducts: products.length,
          totalUsers: users.length,
        });

        // Get last 5 orders and reverse them to show newest first
        const sortedOrders = [...orders].reverse().slice(0, 5);
        setRecentOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleCreateAdminChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleCreateAdminSubmit = async (e) => {
    e.preventDefault();
    setCreateMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newAdmin,
          role: "admin",
          active: true,
          id: Math.random().toString(36).substr(2, 9), // Simple ID generation
        }),
      });

      if (response.ok) {
        setCreateMessage({ type: "success", text: "New admin created successfully!" });
        setNewAdmin({
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          mobileNumber: "",
        });
      } else {
        setCreateMessage({ type: "error", text: "Failed to create admin." });
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      setCreateMessage({ type: "error", text: "An error occurred." });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">QAR {stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Total Orders</p>
          <p className="text-3xl font-bold text-cyan-600 mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Products</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Users</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Create Admin Section - Only for Super Admin */}
      {user?.role === "super-admin" && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Admin</h3>
          {createMessage.text && (
            <div
              className={`mb-4 p-3 rounded text-sm ${
                createMessage.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {createMessage.text}
            </div>
          )}
          <form onSubmit={handleCreateAdminSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={newAdmin.firstName}
              onChange={handleCreateAdminChange}
              required
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newAdmin.lastName}
              onChange={handleCreateAdminChange}
              required
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newAdmin.username}
              onChange={handleCreateAdminChange}
              required
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newAdmin.email}
              onChange={handleCreateAdminChange}
              required
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
             <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={newAdmin.mobileNumber}
              onChange={handleCreateAdminChange}
              required
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={handleCreateAdminChange}
              required
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
              >
                Create Admin
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500 uppercase">
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">User Email</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium bg-gray-50/50">#{order.id}</td>
                    <td className="py-3 px-2">{order.userEmail || "N/A"}</td>
                    <td className="py-3 px-2">
                      {order.date ? new Date(order.date).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-3 px-2 font-semibold">QAR {order.total}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status || "Placed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
