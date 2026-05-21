import { useEffect, useState } from "react";
import SkeletonRow from "../components/admin/SkeletonRow";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId: id, status }),
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-semibold">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              /* ── Skeleton rows while loading ─────────────────────────────── */
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} cols={6} />
              ))
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{order._id.substring(18)}
                  </td>
                  <td className="px-6 py-4">
                    {order.userId?.email || order.address?.email || "Guest"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">QAR {order.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status || "Order Placed"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status || "Order Placed"}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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

export default AdminOrders;
