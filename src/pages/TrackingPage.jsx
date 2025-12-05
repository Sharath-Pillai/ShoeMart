import React, { useEffect, useState } from 'react'
import Backnavbar from '../components/common/Backnavbar'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const TrackingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      navigate("/signin");
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`http://localhost:3000/orders?userId=${user.id}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Backnavbar />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">You haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate("/")}
              className="mt-4 bg-cyan-600 text-white px-6 py-2 rounded-full hover:bg-cyan-700 transition">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Order ID</p>
                    <p className="font-semibold">#{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Date Placed</p>
                    <p className="font-medium text-sm">{order.date}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-contain rounded bg-gray-50" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.productName}</h4>
                          <p className="text-xs text-gray-500">Size: {item.size} | Color: {item.color}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-semibold text-sm">QAR {item.price}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-lg font-bold text-gray-900">QAR {order.total}</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar for visual flair */}
                  <div className="mt-6">
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-green-500 w-1/4"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span className="text-green-600 font-medium">Order Placed</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TrackingPage
