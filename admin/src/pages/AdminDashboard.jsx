import { useEffect, useState } from "react";
import { useAuth } from "../../../frontend/src/context/AuthContext.jsx";

/* ── Skeleton stat card ──────────────────────────────────────────────────── */
const SkeletonStatCard = () => (
  <div className="animate-pulse bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div className="h-3 w-1/2 rounded bg-gray-200 mb-4" />
    <div className="h-8 w-3/4 rounded bg-gray-200" />
  </div>
);

/* ── Skeleton recent-orders row ─────────────────────────────────────────── */
const SkeletonOrderRow = () => (
  <tr className="animate-pulse border-b border-gray-50">
    {[40, 60, 30, 25, 20].map((w, i) => (
      <td key={i} className="py-3 px-2">
        <div className="h-4 rounded bg-gray-200" style={{ width: `${w}%` }} />
      </td>
    ))}
  </tr>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  // Create Admin Form State
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    invitationCode: "",
  });
  const [createMessage, setCreateMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const token = localStorage.getItem("token");

        const [ordersRes, productsRes, usersRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const orders = await ordersRes.json();
        const productsData = await productsRes.json();
        const users = await usersRes.json();

        const ordersList =
          orders.orders || (Array.isArray(orders) ? orders : orders.data || []);
        const productsList = Array.isArray(productsData.products)
          ? productsData.products
          : [];
        const usersList =
          users.users || (Array.isArray(users) ? users : users.data || []);

        const revenue = ordersList.reduce(
          (acc, order) =>
            acc + (order.totalPrice || order.amount || order.total || 0),
          0
        );

        setStats({
          totalOrders: ordersList.length,
          totalRevenue: revenue,
          totalProducts: productsList.length,
          totalUsers: usersList.length,
        });

        setRecentOrders([...ordersList].slice(0, 5));
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 s
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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/admin/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${newAdmin.firstName} ${newAdmin.lastName}`,
            email: newAdmin.email,
            password: newAdmin.password,
            invitationCode: newAdmin.invitationCode,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setCreateMessage({ type: "success", text: "New admin created successfully!" });
        setNewAdmin({
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          mobileNumber: "",
          invitationCode: "",
        });
      } else {
        setCreateMessage({
          type: "error",
          text: data.message || "Failed to create admin.",
        });
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      setCreateMessage({ type: "error", text: "An error occurred." });
    }
  };

  const statCards = [
    {
      label: "Total Revenue",
      value: `QAR ${stats.totalRevenue.toLocaleString()}`,
      gradient: "from-cyan-500 to-blue-600",
      textColor: "text-white",
      labelColor: "text-cyan-100",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      gradient: null,
      textColor: "text-slate-800",
      labelColor: "text-slate-400",
    },
    {
      label: "Products",
      value: stats.totalProducts,
      gradient: null,
      textColor: "text-slate-800",
      labelColor: "text-slate-400",
    },
    {
      label: "Users",
      value: stats.totalUsers,
      gradient: null,
      textColor: "text-slate-800",
      labelColor: "text-slate-400",
    },
  ];

  return (
    <div>
      {/* ── Welcome Banner ──────────────────────────────────────────────── */}
      {user && (
        <div className="mb-8 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-orange-100 text-lg">
                {user.role === "super-admin" ? "Super Administrator" : "Administrator"}{" "}
                • Logged in as {user.email}
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center w-24 h-24 bg-white/20 rounded-full backdrop-blur-sm">
              <span className="text-5xl">🔐</span>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)
          : statCards.map((card) => (
              <div
                key={card.label}
                className={`p-6 rounded-2xl shadow-lg transform transition duration-300 hover:-translate-y-1 ${
                  card.gradient
                    ? `bg-gradient-to-br ${card.gradient} shadow-cyan-500/30`
                    : "bg-white border border-slate-100 shadow-slate-200/50"
                }`}
              >
                <p
                  className={`uppercase tracking-wider font-bold text-xs ${card.labelColor}`}
                >
                  {card.label}
                </p>
                <p
                  className={`text-4xl font-extrabold mt-2 tracking-tight ${card.textColor}`}
                >
                  {card.value}
                </p>
              </div>
            ))}
      </div>

      {/* ── Create Admin (Super Admin only) ─────────────────────────────── */}
      {user?.role === "super-admin" && (
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-black">
              +
            </span>
            Create New Admin
          </h3>
          {createMessage.text && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm font-medium ${
                createMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}
            >
              {createMessage.text}
            </div>
          )}
          <form
            onSubmit={handleCreateAdminSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input type="text" name="firstName" placeholder="First Name" value={newAdmin.firstName} onChange={handleCreateAdminChange} required className="p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors" />
            <input type="text" name="lastName" placeholder="Last Name" value={newAdmin.lastName} onChange={handleCreateAdminChange} required className="p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors" />
            <input type="text" name="username" placeholder="Username" value={newAdmin.username} onChange={handleCreateAdminChange} required className="p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors" />
            <input type="email" name="email" placeholder="Email" value={newAdmin.email} onChange={handleCreateAdminChange} required className="p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors" />
            <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={newAdmin.mobileNumber} onChange={handleCreateAdminChange} required className="p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors" />
            <input type="password" name="password" placeholder="Password" value={newAdmin.password} onChange={handleCreateAdminChange} required className="p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors" />
            <input type="text" name="invitationCode" placeholder="Admin Invitation Code" value={newAdmin.invitationCode} onChange={handleCreateAdminChange} required className="p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors" />
            <div className="md:col-span-2 pt-2">
              <button type="submit" className="bg-cyan-600 text-white font-bold tracking-wide px-8 py-3 rounded-xl hover:bg-cyan-700 transition shadow-lg shadow-cyan-600/30">
                Create Admin
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Recent Orders ────────────────────────────────────────────────── */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>

        {statsLoading ? (
          <table className="w-full text-left border-collapse">
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonOrderRow key={i} />
              ))}
            </tbody>
          </table>
        ) : recentOrders.length === 0 ? (
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
                  <tr
                    key={order._id || order.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-3 px-2 font-medium bg-gray-50/50">
                      #{order._id || order.id}
                    </td>
                    <td className="py-3 px-2">
                      {order.userId?.email || order.userEmail || "N/A"}
                    </td>
                    <td className="py-3 px-2">
                      {order.date ? new Date(order.date).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-3 px-2 font-semibold">
                      QAR {order.amount || order.total}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
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
