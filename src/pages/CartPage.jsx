import React from "react";

const CartPage = () => {
  return (
    <div className="w-full bg-white text-[#1a1a1a] font-sans">
      {/* Top nav / breadcrumbs */}
      <header className="bg-white border-b border-red-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            &lt; Back
          </a>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto pt-4">
        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* item list */}
          <div className="col-span-2 border rounded-lg p-4">
            <div className="flex gap-4">
              <img
                src="https://via.placeholder.com/110x140"
                className="rounded"
              />
              <div className="flex-1 text-sm">
                <div className="font-medium text-base">
                  Striped Regular Fit Polo T-shirt
                </div>
                <div className="mt-1 text-[#555]">Colour: Multicolour</div>
                <div className="text-[#555]">Size: L</div>

                <div className="mt-4 font-semibold">QAR 59</div>

                <div className="mt-4 flex items-center gap-2 text-sm text-[#444] underline cursor-pointer">
                  Remove
                </div>
              </div>
            </div>

            {/* promo */}
            <div className="mt-6 border-t pt-6 flex justify-between">
              <div className="text-sm flex items-center gap-2">
                🏷 Promos & Vouchers
              </div>
              <div className="text-sm underline text-blue-600 cursor-pointer">
                View / Enter code
              </div>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="font-medium">Subtotal:</span>
              <span>QAR 59</span>
            </div>
          </div>

          {/* right summary */}
          <div className="border rounded-lg p-4">
            <div className="bg-yellow-50 border rounded-lg p-3 text-sm">
              Still Need Free Shipping? <br />
              Add QAR 141 more for Free Shipping
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span>Subtotal (1 item):</span>
              <span className="font-semibold">QAR 59</span>
            </div>

            <div className="mt-6 border p-3 rounded-lg">
              <div className="text-xs mb-1">Your order will earn you</div>
              <div className="text-sm font-semibold flex items-center gap-2">
                🪙 12 Shukrans
              </div>

              <div className="mt-3 bg-[#f8e3d9] rounded p-3 text-xs">
                Classic Tier <br /> 3 purchases before 22 Dec 2025 to unlock
                Silver Tier
              </div>
            </div>

            <button className="w-full bg-[#00a4e6] text-white font-semibold rounded-lg mt-6 py-3 text-sm">
              Checkout Now
            </button>

            <div className="mt-6 text-xs">Ways you can pay:</div>
            <div className="flex gap-3 text-2xl mt-2">💳 🟡 🧾 💰 🪙 </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
