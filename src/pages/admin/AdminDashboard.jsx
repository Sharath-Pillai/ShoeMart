import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          fetch("http://localhost:3000/orders"),
          fetch("http://localhost:3000/shoes"),
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
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

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

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <p className="text-gray-500 text-sm">No recent activity to show.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
