import React, { useEffect, useState, useContext } from "react";
import Backnavbar from "../components/common/Backnavbar";
import { useAuth } from "../context/AuthContext";
import CartContext from "../context/CartContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const { user } = useAuth();
  const {
    cartItems: contextCartItems,
    clearCart,
    isLoading,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Selected payment method
  const [selectedMethod, setSelectedMethod] = useState("creditCard");

  // Card form states
  const [creditCardData, setCreditCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const [debitCardData, setDebitCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  // Loading state during submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const isBuyNow = !!location.state?.buyNowItems;
  const cartItems = isBuyNow ? location.state.buyNowItems : contextCartItems;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0,
  );
  const shipping = subtotal > 200 ? 0 : 20;
  const total = subtotal + shipping;

  // Helper to load Razorpay SDK dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Card input formatting & validation handlers
  const handleCardNumberChange = (e, type) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      value = parts.join(" ");
    } else {
      value = value.replace(/(.{4})/g, "$1 ").trim();
    }

    if (type === "credit") {
      setCreditCardData((prev) => ({ ...prev, cardNumber: value }));
    } else {
      setDebitCardData((prev) => ({ ...prev, cardNumber: value }));
    }
  };

  const handleExpiryChange = (e, type) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.substring(0, 4);
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    if (type === "credit") {
      setCreditCardData((prev) => ({ ...prev, expiry: value }));
    } else {
      setDebitCardData((prev) => ({ ...prev, expiry: value }));
    }
  };

  const handleCvvChange = (e, type) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 3);
    if (type === "credit") {
      setCreditCardData((prev) => ({ ...prev, cvv: value }));
    } else {
      setDebitCardData((prev) => ({ ...prev, cvv: value }));
    }
  };

  const handleNameChange = (e, type) => {
    const value = e.target.value.toUpperCase();
    if (type === "credit") {
      setCreditCardData((prev) => ({ ...prev, nameOnCard: value }));
    } else {
      setDebitCardData((prev) => ({ ...prev, nameOnCard: value }));
    }
  };

  const validateCardForm = (data) => {
    const cardDigits = data.cardNumber.replace(/\s/g, "");
    if (cardDigits.length !== 16) {
      alert("Please enter a valid 16-digit card number.");
      return false;
    }
    if (!data.expiry.includes("/") || data.expiry.length !== 5) {
      alert("Please enter a valid expiration date (MM/YY).");
      return false;
    }
    if (data.cvv.length !== 3) {
      alert("Please enter a valid 3-digit CVV code.");
      return false;
    }
    if (!data.nameOnCard.trim()) {
      alert("Please enter the name on the card.");
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Validate if Credit or Debit is selected
    if (selectedMethod === "creditCard") {
      if (!validateCardForm(creditCardData)) return;
    } else if (selectedMethod === "debitCard") {
      if (!validateCardForm(debitCardData)) return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      // Base order data structure matching backend expectations
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.productName,
          price: item.productPrice,
          image: item.productImage,
          size: item.size,
          quantity: item.quantity,
        })),
        amount: total,
        isBuyNow,
        address: {
          firstName: user.firstName || user.name || "Guest",
          lastName: user.lastName || "User",
          email: user.email,
          street: "Building no: 64 Street No.901",
          city: "Umm Salal",
          state: "Al Kharaityat",
          zipcode: "00000",
          country: "Qatar",
          phone: user.mobileNumber || "00000000",
        },
      };

      // ────────────────── STRIPE FLOW ──────────────────
      if (selectedMethod === "stripe") {
        console.log("Initiating Stripe Checkout:", orderData);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/stripe`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
          },
        );

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to create Stripe payment session",
          );
        }

        // Redirect to stripe checkout
        if (data.session_url) {
          window.location.replace(data.session_url);
        } else {
          throw new Error("Stripe session URL not returned from backend");
        }
        return;
      }

      // ────────────────── RAZORPAY FLOW ──────────────────
      if (selectedMethod === "razorpay") {
        console.log("Initiating Razorpay Checkout:", orderData);

        const resScript = await loadRazorpayScript();
        if (!resScript) {
          throw new Error(
            "Razorpay SDK failed to load. Please check your internet connection.",
          );
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/razorpay`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
          },
        );

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to initiate Razorpay order");
        }

        const { razorpayOrder, orderId, isBuyNow: razorpayIsBuyNow } = data;

        const options = {
          key:
            import.meta.env.VITE_RAZORPAY_KEY_ID || "wmcivDStc9SkbA8Xs3unKU6Q",
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Shoemart",
          description: "Payment for order #" + orderId,
          order_id: razorpayOrder.id,
          handler: async (paymentResponse) => {
            try {
              setIsSubmitting(true);
              const verifyRes = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/order/verifyRazorpay`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    razorpay_order_id: paymentResponse.razorpay_order_id,
                    orderId: orderId,
                    isBuyNow: razorpayIsBuyNow,
                  }),
                },
              );

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                if (!isBuyNow) {
                  await clearCart();
                }
                alert("Payment processed securely and verified!");
                navigate("/tracking");
              } else {
                alert("Payment verification failed: " + verifyData.message);
              }
            } catch (err) {
              console.error("Razorpay verification error:", err);
              alert("Could not verify your payment. Please contact support.");
            } finally {
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: `${user.firstName || ""} ${user.lastName || ""}`,
            email: user.email,
            contact: user.mobileNumber || "",
          },
          theme: {
            color: "#00a4e6",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setIsSubmitting(false);
        return;
      }

      // ────────────────── CREDIT CARD & DEBIT CARD FLOW (Backend placeOrder endpoint) ──────────────────
      const finalOrderData = {
        ...orderData,
        paymentMethod:
          selectedMethod === "creditCard" ? "Credit Card" : "Debit Card",
      };

      console.log("Placing Card Order:", finalOrderData);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/place`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalOrderData),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to place order");
      }

      if (!isBuyNow) {
        await clearCart();
      }

      alert("Order placed successfully via card payment!");
      navigate("/tracking");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert(error.message || "Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="w-full bg-[#f9fafb] text-[#1a1a1a] font-sans min-h-screen pb-20">
      <Backnavbar />

      <div className="max-w-300 mx-auto pt-8 pb-16 px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Forms Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Methods Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-500">🚚</span> Select a shipping method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm">
              <div className="border border-gray-200 rounded-xl p-4 text-center cursor-pointer transition-all hover:bg-gray-50">
                <span className="font-semibold text-gray-800">
                  Click & Collect
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Pickup your order from a location of your choice.
                </p>
              </div>
              <div className="border border-blue-500 bg-blue-50/50 rounded-xl p-4 text-center cursor-pointer transition-all">
                <span className="font-semibold text-blue-700">
                  Home Delivery
                </span>
                <p className="text-xs text-blue-600 mt-1">
                  Get your product delivered to your home.
                </p>
              </div>
            </div>

            <div className="text-sm font-semibold text-gray-700 mb-3">
              Select your shipping address
            </div>

            <div className="border border-gray-150 bg-gray-50/30 rounded-xl p-4 text-sm mb-4">
              <div className="flex items-center gap-2 font-semibold text-gray-800">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="accent-blue-500"
                />
                {user?.firstName} {user?.lastName}
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full ml-2">
                  DEFAULT
                </span>
              </div>
              <div className="mt-2 text-gray-600 leading-relaxed pl-5">
                Building no: 64 Street No.901,
                <br />
                Umm Salal Al Kharaityat
                <br />
                <span className="font-medium">Mobile Number:</span>{" "}
                {user?.mobileNumber || "Not Provided"}
              </div>
            </div>

            <div className="text-blue-600 text-sm font-medium cursor-pointer flex items-center gap-1 hover:text-blue-700">
              <span>+</span>{" "}
              <span className="underline">Add a new Address</span>
            </div>
          </div>

          {/* Payment Methods Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-blue-500">💳</span> Select a payment method
            </h2>
            <p className="text-xs text-gray-500 pb-2">
              All transactions are secure and encrypted.
            </p>

            <div className="space-y-3">
              {/* Option 1: Credit Card */}
              <div
                className={`border rounded-xl transition-all ${selectedMethod === "creditCard" ? "border-blue-500 ring-2 ring-blue-500/10" : "border-gray-200"}`}
              >
                <label className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === "creditCard"}
                      onChange={() => setSelectedMethod("creditCard")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-500"
                    />
                    <div>
                      <span className="font-semibold text-gray-800 text-sm block">
                        Credit Card
                      </span>
                      <span className="text-xs text-gray-500">
                        Pay using Mastercard / Visa / Amex cards
                      </span>
                    </div>
                  </div>
                  <span className="text-lg">💳</span>
                </label>

                {/* Collapsible Card Form */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${selectedMethod === "creditCard" ? "max-h-95 opacity-100 border-t border-gray-100 bg-gray-50/50 p-5" : "max-h-0 opacity-0"}`}
                >
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-gray-700">
                        Card number
                      </div>
                      <input
                        className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl bg-white w-full px-4 py-2.5 text-sm transition-all outline-none"
                        placeholder="4111 2222 3333 4444"
                        value={creditCardData.cardNumber}
                        onChange={(e) => handleCardNumberChange(e, "credit")}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-gray-700">
                          Expiry Date
                        </div>
                        <input
                          className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl bg-white w-full px-4 py-2.5 text-sm transition-all outline-none"
                          placeholder="MM / YY"
                          value={creditCardData.expiry}
                          onChange={(e) => handleExpiryChange(e, "credit")}
                        />
                      </div>
                      <div>
                        <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-gray-700">
                          CVV
                        </div>
                        <input
                          type="password"
                          className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl bg-white w-full px-4 py-2.5 text-sm transition-all outline-none"
                          placeholder="123"
                          value={creditCardData.cvv}
                          onChange={(e) => handleCvvChange(e, "credit")}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-gray-700">
                        Name on card
                      </div>
                      <input
                        className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl bg-white w-full px-4 py-2.5 text-sm transition-all outline-none"
                        placeholder="JOHN DOE"
                        value={creditCardData.nameOnCard}
                        onChange={(e) => handleNameChange(e, "credit")}
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-blue-500"
                      />
                      <span>
                        Save this card securely for a faster checkout experience
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Option 2: Debit Card */}
              <div
                className={`border rounded-xl transition-all ${selectedMethod === "debitCard" ? "border-blue-500 ring-2 ring-blue-500/10" : "border-gray-200"}`}
              >
                <label className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === "debitCard"}
                      onChange={() => setSelectedMethod("debitCard")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-500"
                    />
                    <div>
                      <span className="font-semibold text-gray-800 text-sm block">
                        Debit Card
                      </span>
                      <span className="text-xs text-gray-500">
                        Pay securely using Debit or NAPS cards
                      </span>
                    </div>
                  </div>
                  <span className="text-lg">💳</span>
                </label>

                {/* Collapsible Debit Card Form */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${selectedMethod === "debitCard" ? "max-h-95 opacity-100 border-t border-gray-100 bg-gray-50/50 p-5" : "max-h-0 opacity-0"}`}
                >
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-gray-700">
                        Card number
                      </div>
                      <input
                        className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl bg-white w-full px-4 py-2.5 text-sm transition-all outline-none"
                        placeholder="4222 5555 6666 7777"
                        value={debitCardData.cardNumber}
                        onChange={(e) => handleCardNumberChange(e, "debit")}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-gray-700">
                          Expiry Date
                        </div>
                        <input
                          className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl bg-white w-full px-4 py-2.5 text-sm transition-all outline-none"
                          placeholder="MM / YY"
                          value={debitCardData.expiry}
                          onChange={(e) => handleExpiryChange(e, "debit")}
                        />
                      </div>
                      <div>
                        <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-gray-700">
                          CVV
                        </div>
                        <input
                          type="password"
                          className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl bg-white w-full px-4 py-2.5 text-sm transition-all outline-none"
                          placeholder="999"
                          value={debitCardData.cvv}
                          onChange={(e) => handleCvvChange(e, "debit")}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-gray-700">
                        Name on card
                      </div>
                      <input
                        className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl bg-white w-full px-4 py-2.5 text-sm transition-all outline-none"
                        placeholder="JOHN DOE"
                        value={debitCardData.nameOnCard}
                        onChange={(e) => handleNameChange(e, "debit")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Option 3: Stripe Payment */}
              <div
                className={`border rounded-xl transition-all ${selectedMethod === "stripe" ? "border-blue-500 ring-2 ring-blue-500/10" : "border-gray-200"}`}
              >
                <label className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === "stripe"}
                      onChange={() => setSelectedMethod("stripe")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-500"
                    />
                    <div>
                      <span className="font-semibold text-gray-800 text-sm block">
                        Stripe Gateway
                      </span>
                      <span className="text-xs text-gray-500">
                        Pay securely with Credit Cards/Apple Pay via Stripe
                        Checkout
                      </span>
                    </div>
                  </div>
                  <span className="font-extrabold text-blue-600 tracking-wide text-xs bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    stripe
                  </span>
                </label>

                {/* Collapsible Info for Stripe */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${selectedMethod === "stripe" ? "max-h-37.5 opacity-100 border-t border-gray-100 bg-blue-50/10 p-5" : "max-h-0 opacity-0"}`}
                >
                  <div className="text-sm text-gray-600 flex items-start gap-2.5">
                    <span className="text-blue-500 text-base mt-0.5">ℹ️</span>
                    <p className="leading-relaxed">
                      You will be securely redirected to{" "}
                      <strong>Stripe Checkout</strong> page to complete your
                      transaction. Once verified, you will be redirected back
                      here.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 4: Razorpay Payment */}
              <div
                className={`border rounded-xl transition-all ${selectedMethod === "razorpay" ? "border-blue-500 ring-2 ring-blue-500/10" : "border-gray-200"}`}
              >
                <label className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedMethod === "razorpay"}
                      onChange={() => setSelectedMethod("razorpay")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-500"
                    />
                    <div>
                      <span className="font-semibold text-gray-800 text-sm block">
                        Razorpay Secure
                      </span>
                      <span className="text-xs text-gray-500">
                        Pay with Card, UPI, NetBanking or Wallet
                      </span>
                    </div>
                  </div>
                  <span className="font-extrabold text-indigo-600 tracking-wide text-xs bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                    razorpay
                  </span>
                </label>

                {/* Collapsible Info for Razorpay */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${selectedMethod === "razorpay" ? "max-h-37.5 opacity-100 border-t border-gray-100 bg-indigo-50/10 p-5" : "max-h-0 opacity-0"}`}
                >
                  <div className="text-sm text-gray-600 flex items-start gap-2.5">
                    <span className="text-indigo-500 text-base mt-0.5">ℹ️</span>
                    <p className="leading-relaxed">
                      A secure payment window from <strong>Razorpay</strong>{" "}
                      will overlay on the screen to process card payments, UPI,
                      NetBanking, and other popular Indian payment methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Cart Summary Section */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
            <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b">
              Order Summary
            </h3>

            <div className="max-h-80 overflow-y-auto pr-1 space-y-4 mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-gray-50 pb-4"
                >
                  <img
                    src={item.productImage}
                    className="rounded-xl w-16 h-16 object-contain bg-gray-50 border border-gray-100"
                    alt={item.productName}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-800 truncate">
                      {item.productName}
                    </div>
                    <div className="flex gap-x-3 text-xs text-gray-500 mt-0.5">
                      <span>Color: {item.color || "Default"}</span>
                      <span>Size: {item.size}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                      <div className="font-bold text-sm text-gray-950">
                        QAR {item.productPrice}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-gray-600 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  QAR {subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">
                  {shipping === 0 ? "Free" : `QAR ${shipping}`}
                </span>
              </div>
              <div className="text-green-600 text-xs font-semibold flex items-center gap-1 mt-1">
                <span>🕒</span> Arriving tomorrow
              </div>
            </div>

            {shipping > 0 && (
              <div className="bg-amber-50 border border-amber-100 px-3.5 py-2.5 rounded-xl text-xs text-amber-700 mt-4 leading-relaxed">
                Add <strong>QAR {200 - subtotal}</strong> more to your cart to
                get <strong>Free Shipping!</strong>
              </div>
            )}

            <div className="flex justify-between font-bold text-base text-gray-900 mt-6 pt-4 border-t">
              <span>Total Amount</span>
              <span>QAR {total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="max-w-300 mx-auto px-4 lg:px-8 border-t border-gray-100 pt-6 flex flex-col items-center lg:items-start bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm mt-4">
        <label className="flex items-center gap-2 text-xs text-gray-500 mb-4 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="accent-blue-500 w-4 h-4"
          />
          <span>
            By continuing to checkout, you agree to our{" "}
            <span className="underline text-blue-600 hover:text-blue-700">
              Terms and Conditions
            </span>
          </span>
        </label>

        <button
          onClick={handleCheckout}
          disabled={isSubmitting}
          className={`w-full lg:w-auto bg-[#00a4e6] text-white font-bold rounded-xl px-12 py-3.5 text-sm transition-all hover:bg-[#008ac0] shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-98 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing Security Gateway...
            </span>
          ) : selectedMethod === "stripe" ? (
            "Proceed with Stripe Pay"
          ) : selectedMethod === "razorpay" ? (
            "Proceed with Razorpay"
          ) : (
            "Pay Securely Now"
          )}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
