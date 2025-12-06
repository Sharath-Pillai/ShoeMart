import React, { useEffect } from 'react'
import Backnavbar from '../components/common/Backnavbar'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, clearCart, isLoading } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 20;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Build order
      const order = {
        userId: user.id, // Keeping userId for backward compatibility if needed, or strictly switching to email.
        userEmail: user.email, // Link order to email for persistence across account deletions
        items: cartItems.map(item => ({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          quantity: item.quantity,
          price: item.productPrice,
          color: item.color,
          size: item.size
        })),
        total: total,
        date: new Date().toISOString(), // Use ISO string for better sorting/formatting later
        status: "Order Placed"
      };

      // Save order
      await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });

      // Clear cart
      await clearCart();

      alert("Payment successful! Order placed.");
      navigate("/tracking");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="w-full bg-white text-[#1a1a1a] font-sans">
      {/* Top nav / breadcrumbs */}
            <Backnavbar/>
      <div className="max-w-[1200px] mx-auto pt-6 pb-16 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-6">Select a shipping method</h2>

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="border rounded-lg p-4 text-center cursor-pointer">Click & Collect<br/>Pickup your order from a location of your choice.</div>
            <div className="border rounded-lg p-4 text-center cursor-pointer bg-blue-50 border-blue-500">Home Delivery<br/>Get your product delivered to your home.</div>
          </div>

          <div className="text-sm font-medium mb-3">Select your shipping address</div>

          <div className="border rounded-lg p-4 text-sm mb-4">
            <div className="flex items-center gap-2"><input type="radio" checked readOnly /> {user?.firstName} {user?.lastName} <span className="text-[10px] bg-gray-200 px-2 rounded">DEFAULT</span></div>
            <div className="mt-1 text-[#555]">Building no: 64 Street No.901,<br/>Umm Salal Al Kharaityat<br/>Mobile Number: {user?.mobileNumber}</div>
          </div>

          <div className="text-blue-600  text-sm cursor-pointer mb-6">+ <span className='underline'>Add a new Address</span></div>

          <h2 className="text-xl font-semibold mb-2">Select a payment method</h2>

          <div className=" border-b pb-10 pt-2 text-sm">
            <div className="flex items-center gap-2 mb-3"><input type="radio" checked readOnly /> Credit Card <span className="text-gray-500">Pay using Mastercard/Visa/Amex cards</span></div>
            <div className="border rounded-lg p-4 text-sm">
              <div className="mb-2 flex items-center gap-2 font-medium">Card number <span>💳</span></div>
              <input className="border rounded w-full px-3 py-2 text-sm mb-4" placeholder="Enter your card number" />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input className="border rounded w-full px-3 py-2 text-sm" placeholder="MM / YY" />
                <input className="border rounded w-full px-3 py-2 text-sm" placeholder="CVV" />
              </div>

              <input className="border rounded w-full px-3 py-2 text-sm mb-4" placeholder="Name on card" />

              <div className="flex items-center gap-2 text-xs text-[#555]"><input type="checkbox" checked readOnly /> Save this card for a faster checkout experience</div>
            </div>
          </div>

          <div className="pt-10 text-sm">
            <div className="flex items-center gap-2 mb-2"><input type="radio" readOnly /> Debit Card</div>
            <div className="text-gray-500 ml-6">Pay using NAPS cards</div>
          </div>
        </div>

        <div className="border rounded-lg p-5 h-fit text-sm">
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-4 mb-4 border-b pb-4">
              <img src={item.productImage} className="rounded w-20 h-20 object-contain" alt={item.productName} />
              <div>
                <div className="font-medium text-base">{item.productName}</div>
                <div className="text-[#555]">Colour: {item.color}</div>
                <div className="text-[#555]">Size: {item.size}</div>
                <div className="mt-2">Qty: {item.quantity}</div>
                <div className="font-semibold mt-2">Price: QAR {item.productPrice}</div>
              </div>
            </div>
          ))}

          <div className="flex justify-between mb-2"><span>Subtotal:</span><span>QAR {subtotal}</span></div>
          <div className="flex justify-between mb-2"><span>Shipping:</span><span>{shipping === 0 ? "Free" : `QAR ${shipping}`}</span></div>
          <div className="text-green-600 text-xs mb-3">Arriving tomorrow</div>

          {shipping > 0 && <div className="bg-yellow-50 border px-3 py-2 rounded text-xs mb-4">Still Need Free Shipping? Add QAR {200 - subtotal} more</div>}

          <div className="flex justify-between font-semibold text-base mb-8"><span>Total</span><span>QAR {total}</span></div>

          <div className="text-xs mb-2">Your order will earn you</div>
          <div className="font-semibold mb-2 flex items-center gap-2">🪙 {(total / 10).toFixed(0)} rewards</div>
        </div>
      </div>

      {/* bottom extra area */}
      <div className="max-w-[1200px] mx-auto mt-4 pb-20">
        <div className="text-xs mb-6 text-[#666]"> <input type="checkbox" /> By continuing to checkout you agree to our <span className="underline cursor-pointer text-blue-600">Terms and Conditions</span></div>

        <button 
          onClick={handleCheckout}
          className="bg-[#00a4e6] text-white font-semibold rounded-lg px-10 py-3 text-sm hover:bg-[#008ac0] transition-colors">
          Pay Now
        </button>

      </div>
    </div>
  )
}

export default CheckoutPage