import { useMemo, useState, useEffect } from "react";
import Backnavbar from "../components/common/Backnavbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, isLoading } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const handleUpdateQuantity = (id, direction, currentQuantity) => {
    const nextQuantity =
      direction === "increase"
        ? Math.min(currentQuantity + 1, 5)
        : Math.max(1, currentQuantity - 1);

    if (nextQuantity === currentQuantity) return;
    updateQuantity(id, nextQuantity);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  const shipping = subtotal > 200 ? 0 : 20;
  const estimates = {
    tax: subtotal * 0.07,
    discount: appliedPromo === "SHOELUV" ? subtotal * 0.1 : 0,
  };
  const total = subtotal + shipping + estimates.tax - estimates.discount;

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SHOELUV") {
      setAppliedPromo("SHOELUV");
    } else {
      setAppliedPromo(null);
    }
  };

  if (!user) {
      return (
          <div className="min-h-screen flex flex-col">
              <Backnavbar />
              <div className="flex-1 flex items-center justify-center flex-col gap-4">
                  <p>Please sign in to view your cart.</p>
                  <div className="flex gap-4">
                      <button onClick={() => navigate("/signin")} className="bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
                      <button onClick={() => navigate("/")} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Go Home</button>
                  </div>
              </div>
          </div>
      )
  }

  if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Backnavbar />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
              Shopping Bag
            </p>
            <h1 className="text-3xl font-semibold">Your Cart</h1>
            <p className="text-sm text-gray-500">
              {cartItems.length} item{cartItems.length === 1 ? "" : "s"} in your
              bag
            </p>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-400">
            Continue Shopping
          </button>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)]">
          <section className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add products to proceed with checkout.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="h-32 w-32 rounded-xl bg-gray-50 object-contain"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                              {item.productBrand}
                            </p>
                            <h3 className="text-lg font-semibold">
                              {item.productName}
                            </h3>
                          </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm font-semibold text-red-500"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="mt-3 grid gap-3 text-sm text-gray-500 sm:grid-cols-3">
                            <div>
                              <p className="text-xs uppercase tracking-wide text-gray-400">
                                Color
                              </p>
                              <p className="font-medium">{item.color}</p>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-wide text-gray-400">
                                Size
                              </p>
                              <p className="font-medium">{item.size}</p>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-wide text-gray-400">
                                Quantity
                              </p>
                              <div className="mt-1 flex items-center overflow-hidden rounded-lg border border-gray-200">
                                <button
                                  className="px-3 py-2 text-sm font-semibold text-gray-600 disabled:opacity-30"
                                  onClick={() => handleUpdateQuantity(item.id, "decrease", item.quantity)}
                                  disabled={item.quantity === 1}
                                >
                                  -
                                </button>
                                <div className="w-12 text-center text-sm font-semibold">
                                  {item.quantity}
                                </div>
                                <button
                                  className="px-3 py-2 text-sm font-semibold text-gray-600 disabled:opacity-30"
                                  onClick={() => handleUpdateQuantity(item.id, "increase", item.quantity)}
                                  disabled={item.quantity === 5}
                                >
                                  +
                                </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-100 pt-3 text-sm font-semibold">
                        <span className="text-gray-500">
                          In Stock
                        </span>
                        <span>QAR {item.productPrice * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Promo & voucher
                  </p>
                  <p className="text-xs text-gray-500">
                    SHOELUV saves 10% on orders over QAR 150
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={applyPromo}
                    className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {appliedPromo && (
                <div className="mt-3 flex items-center justify-between rounded-full bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
                  <span>Promo “{appliedPromo}” applied</span>
                  <button
                    onClick={() => {
                      setAppliedPromo(null);
                      setPromoCode("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">
                  Order Summary
                </p>
                <span className="text-xs font-semibold text-yellow-600">
                  Earn {(subtotal / 10).toFixed(0)} rewards
                </span>
              </div>

              <dl className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd>QAR {subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : `QAR ${shipping.toFixed(2)}`}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Est. Tax</dt>
                  <dd>QAR {estimates.tax.toFixed(2)}</dd>
                </div>
                {estimates.discount > 0 && (
                  <div className="flex items-center justify-between text-green-600">
                    <dt>Promo discount</dt>
                    <dd>- QAR {estimates.discount.toFixed(2)}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-base font-semibold text-gray-900">
                  <dt>Total</dt>
                  <dd>QAR {total.toFixed(2)}</dd>
                </div>
              </dl>

              <button 
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0}
                className="mt-6 w-full rounded-full bg-cyan-600 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:bg-gray-300 disabled:cursor-not-allowed">
                Checkout Securely
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                Checkout with: Visa • Mastercard • Cash • Apple Pay
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-gray-600 shadow-sm">
              <p className="font-semibold text-gray-800">Delivery estimate</p>
              <p className="mt-2 text-gray-500">
                Ships to <span className="font-semibold">Doha, Qatar</span>{" "}
                between 23–26 Nov by SHOEMART Express.
              </p>
              <button className="mt-3 text-sm font-semibold text-cyan-600">
                Change address
              </button>
            </div>

            <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 p-6 text-sm text-gray-500">
              <p>
                Need help? Call us at <strong>800-SHOE</strong> or chat with
                support anytime.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
