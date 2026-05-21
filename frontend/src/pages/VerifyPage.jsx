import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import CartContext from '../context/CartContext.jsx'
import Backnavbar from '../components/common/Backnavbar'

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const isBuyNow = searchParams.get("isBuyNow") === "true";
  
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("Verifying payment security...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User authorization token not found.");
        }

        console.log("Verifying Stripe payment:", { success, orderId });

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/verifyStripe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ success, orderId, isBuyNow })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setIsSuccess(true);
          setMessage("Payment verified successfully! Thank you for your order.");
          if (!isBuyNow) {
            await clearCart();
          }
          
          // Auto redirect to tracking after 3 seconds
          setTimeout(() => {
            navigate("/tracking");
          }, 3000);
        } else {
          setIsSuccess(false);
          setMessage(data.message || "Payment verification failed or session cancelled.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setIsSuccess(false);
        setMessage(err.message || "An unexpected error occurred during verification.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      verifyPayment();
    } else {
      setLoading(false);
      setIsSuccess(false);
      setMessage("Invalid verification parameters.");
    }
  }, [success, orderId, isBuyNow, navigate, clearCart]);

  return (
    <div className="w-full bg-[#f9fafb] text-[#1a1a1a] font-sans min-h-screen pb-20">
      <Backnavbar />
      
      <div className="max-w-[600px] mx-auto mt-16 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center space-y-6">
          
          {loading && (
            <div className="space-y-4 py-8">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h2 className="text-xl font-bold text-gray-800">Verifying Payment</h2>
              <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                Please do not refresh this page, close your browser, or press back. We are validating your payment securely with Stripe.
              </p>
            </div>
          )}

          {!loading && isSuccess && (
            <div className="space-y-6 py-6 animate-fade-in">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-100 shadow-sm">
                <span className="text-4xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Payment Completed!</h2>
              <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                {message}
              </p>
              <div className="text-xs text-gray-400 bg-gray-50 py-2.5 px-4 rounded-xl inline-block font-mono">
                Order ID: {orderId}
              </div>
              <div className="pt-4 space-y-2">
                <button 
                  onClick={() => navigate("/tracking")}
                  className="w-full sm:w-auto bg-[#00a4e6] text-white font-bold rounded-xl px-10 py-3 text-sm hover:bg-[#008ac0] transition-colors shadow-md shadow-blue-500/10">
                  Track Your Order
                </button>
                <p className="text-xs text-gray-400 mt-2">Redirecting to order tracking page shortly...</p>
              </div>
            </div>
          )}

          {!loading && !isSuccess && (
            <div className="space-y-6 py-6">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-100 shadow-sm">
                <span className="text-4xl font-light">✕</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-sans">Payment Unsuccessful</h2>
              <p className="text-sm text-red-600/90 max-w-sm mx-auto leading-relaxed">
                {message}
              </p>
              <div className="pt-4 space-y-2">
                <button 
                  onClick={() => navigate("/checkout")}
                  className="w-full sm:w-auto bg-gray-900 text-white font-bold rounded-xl px-10 py-3 text-sm hover:bg-gray-800 transition-colors">
                  Return to Checkout
                </button>
                <div>
                  <button 
                    onClick={() => navigate("/cart")}
                    className="text-sm text-blue-600 font-semibold hover:underline mt-2">
                    Go back to Shopping Cart
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default VerifyPage
