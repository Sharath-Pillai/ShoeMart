import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ── Skeleton order card shown while data loads ─────────────────────────── */
const SkeletonOrderCard = () => (
  <div className="animate-pulse bg-white border rounded-lg shadow-sm overflow-hidden">
    {/* header */}
    <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between gap-4">
      {[55, 35, 40, 30].map((w, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-3 rounded bg-gray-200" style={{ width: `${w}px` }} />
          <div className="h-4 rounded bg-gray-300" style={{ width: `${w + 20}px` }} />
        </div>
      ))}
    </div>
    {/* body */}
    <div className="p-6 space-y-4">
      {[1, 2].map((j) => (
        <div key={j} className="flex items-center gap-4 py-2 border-b last:border-0">
          <div className="w-16 h-16 shrink-0 rounded-md bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
          </div>
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  </div>
);

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/myorders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold">
          Please sign in to view your order history.
        </p>
        <Link
          to="/signin"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

      {loading ? (
        /* ── Skeleton cards ───────────────────────────────────────────── */
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <SkeletonOrderCard key={i} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">
            You haven't placed any orders yet.
          </p>
          <Link
            to="/allcollections"
            className="text-blue-600 hover:underline font-medium"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold">
                    Order ID
                  </p>
                  <p className="font-medium text-gray-900">#{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold">Date</p>
                  <p className="font-medium text-gray-900">
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold">
                    Total Amount
                  </p>
                  <p className="font-medium text-gray-900">QAR {order.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold">
                    Status
                  </p>
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full font-bold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status || "Processing"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {order.items &&
                    order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 py-2 border-b last:border-0"
                      >
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover mix-blend-multiply"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} | Size: {item.size}
                          </p>
                        </div>
                        <div className="font-medium text-gray-900">
                          QAR {item.price}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
