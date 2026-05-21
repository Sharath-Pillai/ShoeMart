import React, { useEffect, useState } from 'react';
import Backnavbar from '../components/common/Backnavbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/* ── Skeleton tracking card shown while data loads ──────────────────────── */
const SkeletonTrackCard = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    {/* header */}
    <div className="bg-gray-50 px-4 md:px-6 py-4 border-b border-gray-100 flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-4 w-28 rounded bg-gray-300" />
      </div>
      <div className="flex flex-col gap-2 items-end">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-300" />
      </div>
    </div>

    {/* items */}
    <div className="p-4 md:p-6 space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0">
          <div className="w-20 h-20 rounded bg-gray-200 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
            <div className="h-3 w-1/3 rounded bg-gray-200" />
          </div>
          <div className="h-4 w-14 rounded bg-gray-200" />
        </div>
      ))}

      {/* progress bar skeleton */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="h-2 w-full rounded-full bg-gray-200" />
        <div className="flex justify-between mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-10 rounded bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TrackingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      navigate('/signin');
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/myorders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();

      if (data.success && data.orders) {
        data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Backnavbar />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Order Tracking</h1>

        {loading ? (
          /* ── Skeleton cards ─────────────────────────────────────────── */
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <SkeletonTrackCard key={i} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-cyan-600 text-white px-6 py-2 rounded-full hover:bg-cyan-700 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="bg-gray-50 px-4 md:px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Order ID
                    </p>
                    <p className="font-semibold text-sm md:text-base">
                      #{order._id.substring(18)}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Date Placed
                    </p>
                    <p className="font-medium text-sm">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="flex flex-col gap-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 md:w-16 md:h-16 object-contain rounded bg-gray-50"
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm md:text-base">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Size: {item.size} | Color: {item.color || 'Default'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="font-semibold text-sm">QAR {item.price}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {order.status || 'Order Placed'}
                      </span>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-lg font-bold text-gray-900">
                        QAR {order.amount}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    {order.status === 'Cancelled' ? (
                      <div className="text-center text-red-600 font-bold py-2 bg-red-50 rounded-lg">
                        Order Cancelled
                      </div>
                    ) : (
                      <>
                        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500"
                            style={{
                              width:
                                order.status === 'Delivered'
                                  ? '100%'
                                  : order.status === 'Out For Delivery'
                                  ? '85%'
                                  : order.status === 'Shipped'
                                  ? '65%'
                                  : order.status === 'Packing'
                                  ? '35%'
                                  : '10%',
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs mt-2">
                          <span
                            className={`${
                              [
                                'Order Placed',
                                'Packing',
                                'Shipped',
                                'Out For Delivery',
                                'Delivered',
                              ].includes(order.status || 'Order Placed')
                                ? 'text-green-600 font-medium'
                                : 'text-gray-400'
                            }`}
                          >
                            Placed
                          </span>
                          <span
                            className={`${
                              ['Packing', 'Shipped', 'Out For Delivery', 'Delivered'].includes(
                                order.status
                              )
                                ? 'text-green-600 font-medium'
                                : 'text-gray-400'
                            }`}
                          >
                            Packing
                          </span>
                          <span
                            className={`${
                              ['Shipped', 'Out For Delivery', 'Delivered'].includes(
                                order.status
                              )
                                ? 'text-green-600 font-medium'
                                : 'text-gray-400'
                            }`}
                          >
                            Shipped
                          </span>
                          <span
                            className={`${
                              order.status === 'Delivered'
                                ? 'text-green-600 font-medium'
                                : 'text-gray-400'
                            }`}
                          >
                            Delivered
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
