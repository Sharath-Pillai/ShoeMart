import React from 'react'

const CheckoutPage = () => {
  return (
    <div className="w-full bg-white text-[#1a1a1a] font-sans">

      <div className="max-w-[1200px] mx-auto pt-6 pb-16 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-6">Select a shipping method</h2>

          <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
            <div className="border rounded-lg p-4 text-center cursor-pointer">Click & Collect<br/>Pickup your order from a location of your choice.</div>
            <div className="border rounded-lg p-4 text-center cursor-pointer bg-blue-50 border-blue-500">Home Delivery<br/>Get your product delivered to your home.</div>
          </div>

          <div className="text-sm font-medium mb-3">Select your shipping address</div>

          <div className="border rounded-lg p-4 text-sm mb-8">
            <div className="flex items-center gap-2"><input type="radio" checked readOnly /> Sharath pillai <span className="text-[10px] bg-gray-200 px-2 rounded">DEFAULT</span></div>
            <div className="mt-1 text-[#555]">Building no: 64 Street No.901,<br/>Umm Salal Al Kharaityat<br/>Mobile Number: +974 30357887</div>
          </div>

          <div className="text-blue-600 underline text-sm cursor-pointer mb-12">➕ Add a new Address</div>

          <h2 className="text-xl font-semibold mb-6">Select a payment method</h2>

          <div className="border-b pb-6 text-sm text-gray-500">🔸 Shukran Pay<br/>Available balance: QAR 0</div>

          <div className="pt-6 text-sm">
            <div className="flex items-center gap-2 mb-3"><input type="radio" checked readOnly /> Credit Card <span className="text-gray-500">Pay using Mastercard/Visa/Amex cards</span></div>
            <div className="border rounded-lg p-4 text-sm">
              <div className="mb-2 flex items-center gap-2 font-medium">Card number <span>💳 🟦 🟥</span></div>
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
          <div className="flex gap-4 mb-4">
            <img src="https://via.placeholder.com/80x100" className="rounded" />
            <div>
              <div className="font-medium text-base">Striped Regular Fit Polo T-shirt</div>
              <div className="text-[#555]">Colour: Multicolour</div>
              <div className="text-[#555]">Size: L</div>
              <div className="mt-2">Qty: 1</div>
              <div className="font-semibold mt-2">Price: QAR 59</div>
            </div>
          </div>

          <div className="flex justify-between mb-2"><span>Subtotal:</span><span>QAR 59</span></div>
          <div className="flex justify-between mb-2"><span>Standard Ground Shipping:</span><span>QAR 10</span></div>
          <div className="text-green-600 text-xs mb-3">Arriving tomorrow</div>

          <div className="bg-yellow-50 border px-3 py-2 rounded text-xs mb-4">Still Need Free Shipping? Add QAR 141 more</div>

          <div className="flex justify-between font-semibold text-base mb-4"><span>Total</span><span>QAR 69</span></div>

          <div className="text-xs mb-3">Your order will earn you</div>
          <div className="font-semibold mb-6 flex items-center gap-2">🪙 12 Shukrans</div>

          <div className="text-xs">Ways you can pay:</div>
          <div className="flex gap-3 text-2xl mt-2">💳 🟥 🟡 💰 🪙 </div>
        </div>
      </div>

      {/* bottom extra area */}
      <div className="max-w-[1200px] mx-auto mt-12 pb-20">
        <div className="border rounded-lg p-6 mb-6 text-sm">
          <div className="flex items-center gap-2 mb-2">🏷 Promos & Vouchers <span className="text-blue-600 underline cursor-pointer">View / Enter code</span></div>
          <div className="flex items-center gap-2 text-blue-600 underline cursor-pointer">🎁 Have a Gift Card? Use it here</div>
        </div>

        <div className="text-xs mb-6 text-[#666]">By continuing to checkout you agree to our <span className="underline cursor-pointer text-blue-600">Terms and Conditions</span></div>

        <button className="bg-[#00a4e6] text-white font-semibold rounded-lg px-10 py-3 text-sm">Pay Now</button>

        <div className="mt-10 text-xs text-[#555] max-w-[700px]">
          ✅ Your credit card details are securely encrypted and passed directly to our PCI DSS compliant Payment Gateway for processing.
          We only store your credit card’s last 4 digits and the expiration date. Your traffic to this page is secured using either a 256-bit or
          128-bit SSL certificate depending on your browser version.
        </div>

        <div className="mt-16 text-center text-xs text-[#666]">© 2024 Retail World Limited.<br/>Terms & Conditions - Privacy Policy</div>
      </div>
    </div>
  )
}

export default CheckoutPage