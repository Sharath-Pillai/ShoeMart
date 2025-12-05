import { useContext, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ShoeContext } from "../context/shoeContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import InnerPageBack from "../components/common/InnerPageBack";

const ProductPage = () => {
  const { id } = useParams();
  const { shoes, isLoading, toggleWishlist, isInWishlist } =
    useContext(ShoeContext);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const product = useMemo(
    () => shoes.find((item) => item.id === Number(id)),
    [shoes, id]
  );
  const colorOptions = ["Classic White", "Jet Black", "Sunburst Orange"];
  const sizeOptions = ["40 2/3", "42", "43 1/3", "44", "44 2/3", "46"];
  const extraImages = useMemo(
    () => [
      product?.imageURL,
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1508963493744-76fce69379c0?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60",
    ],
    [product?.imageURL]
  );
  const maxQuantity = product?.items_left || 6;
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1]);
  const [quantity, setQuantity] = useState(1);
  const [actionMessage, setActionMessage] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const loved = product ? isInWishlist?.(product.id) : false;

  const handleQuantityChange = (direction) => {
    setQuantity((prev) => {
      if (direction === "decrease") {
        return Math.max(1, prev - 1);
      }
      return Math.min(maxQuantity, prev + 1);
    });
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/signin", { state: { from: location } });
      return;
    }
    await addToCart(product, quantity, selectedColor, selectedSize);
    setActionMessage(
      `${quantity} × ${product.name} (${selectedSize}, ${selectedColor}) added to your bag.`
    );
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate("/signin", { state: { from: location } });
      return;
    }
    await addToCart(product, quantity, selectedColor, selectedSize);
    navigate("/cart");
  };

  const handleWishlistToggle = () => {
    toggleWishlist?.(product.id);
    setActionMessage(
      loved
        ? "Removed from your wishlist."
        : "Saved to wishlist. Check it out later!"
    );
  };

  if (!product && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600">
        Product not found.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Top nav / breadcrumbs */}
      <InnerPageBack />
      <div className="max-w-7xl mx-auto p-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4">Home / {product.gender.toLowerCase()} / Shoes</nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - Images */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded shadow-sm p-6">
              <div className="w-full bg-gray-100 rounded-md flex items-center justify-center h-[420px]">
                <img
                  src={extraImages[activeImageIndex]}
                  alt="shoe"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* View Collection under main image */}
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"
                  />
                </svg>
                <span>View Collection</span>
              </div>

              {/* Thumbnail images */}
              <div className="mt-4 grid grid-cols-5 gap-3">
                {extraImages.map((src, index) => (
                  <button
                    key={src}
                    className={`h-20 w-full rounded border flex items-center justify-center bg-white transition ${
                      activeImageIndex === index
                        ? "border-cyan-500 shadow"
                        : "border-transparent hover:border-gray-200"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${index + 1}`}
                      className="h-16 object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center column - Details */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded shadow-sm p-6">
              <h1 className="text-lg font-semibold">{product.name}</h1>
              <p className="mt-1 text-sm text-gray-500 uppercase tracking-[0.3em]">
                {product.brand} • {product.category}
              </p>

              <div className="mt-3">
                <div className="flex flex-wrap items-baseline gap-3">
                  <div className="text-2xl font-bold">QAR {product.price}</div>
                  <div className="text-sm text-gray-400 line-through">
                    QAR 351
                  </div>
                  <div className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded">
                    30% OFF
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Save QAR 106 • Earn 25 Shukrans
                </div>
              <div className="mt-2 text-xs text-orange-600 bg-orange-50 inline-block px-3 py-1 rounded">
                  Added to cart 5 times in the last 24 hours
                </div>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-400">
                <button
                  type="button"
                  onClick={handleWishlistToggle}
                  className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 ${loved ? "fill-red-500 stroke-red-500" : "stroke-current"}`}
                    fill={loved ? "currentColor" : "none"}
                    strokeWidth="1.6"
                  >
                    <path d="M12 20.5l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 016.5 4 5 5 0 0112 6.09 5 5 0 0117.5 4 4.5 4.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 10.68L12 20.5z" />
                  </svg>
                  {loved ? "Wishlisted" : "Add to Wishlist"}
                </button>
                <button className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-600 transition hover:border-gray-400">
                  Share
                </button>
              </div>
              </div>

              {/* Divider line */}
              <div className="border-t border-gray-200 my-5"></div>

              {/* Colour section */}
              <div className="mt-2">
                <div className="text-sm text-gray-600 mb-2">Colour</div>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                        selectedColor === color
                          ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Size{" "}
                    <span className="text-xs text-cyan-600 ml-2">
                      (Size Guide)
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {sizeOptions.map((size) => {
                    const disabled = ["44 2/3", "46"].includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => !disabled && setSelectedSize(size)}
                        disabled={disabled}
                        className={`text-sm py-2 rounded border transition ${
                          selectedSize === size
                            ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <div className="text-sm text-gray-600">Quantity</div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      className="px-3 py-2"
                      aria-label="decrease"
                      onClick={() => handleQuantityChange("decrease")}
                      disabled={quantity === 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="w-16 text-center text-sm font-semibold">
                      {quantity}
                    </div>
                    <button
                      className="px-3 py-2"
                      aria-label="increase"
                      onClick={() => handleQuantityChange("increase")}
                      disabled={quantity === maxQuantity}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="text-sm text-gray-500">
                    Order now, only{" "}
                    <span className="text-red-600 font-semibold">6 left</span>!
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  className="flex-1 bg-cyan-600 text-white py-3 rounded shadow w-full"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-black text-white py-3 px-6 rounded w-full sm:w-auto"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>

              {actionMessage && (
                <div className="mt-4 rounded-xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm text-cyan-800">
                  {actionMessage}
                </div>
              )}

              {/* Payment and Delivery info */}
              <div className="mt-4 text-sm text-gray-500">
                Ways you can pay:{" "}
                <span className="ml-2 inline-block align-middle">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                    alt="visa"
                    className="inline h-4 mr-2"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Mastercard-logo.svg"
                    alt="master"
                    className="inline h-4 mr-2"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/39/Cash_on_delivery_icon.svg"
                    alt="cod"
                    className="inline h-4"
                  />
                </span>
              </div>

              {/* Delivery Info moved below */}
              <div className="mt-3 text-sm text-gray-600">
                <div>Get it today</div>
                <div className="text-xs text-gray-400">
                  Order within 4 hours & 6 minutes
                </div>
                <div className="text-green-600 text-sm font-medium mt-1">
                  Delivered to AlKhor
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded shadow-sm p-6 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Product Details</h3>
                <button
                  type="button"
                  onClick={() => setDetailsExpanded((prev) => !prev)}
                  className="flex items-center gap-2 text-sm font-semibold text-cyan-600"
                >
                  {detailsExpanded ? "Hide Full Details" : "See Full Details"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 transition-transform ${
                      detailsExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                These adidas sneakers bring a ’70s vibe to your everyday look.
                The lightweight upper is lined for comfort while Cloudfoam
                cushioning keeps you powering through your routine.
              </p>

              {detailsExpanded && (
                <div className="mt-6 space-y-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Material
                    </div>
                    <div className="border rounded overflow-hidden text-sm text-gray-600">
                      <div className="bg-gray-100 p-3">Upper Material</div>
                      <div className="p-3">Leather and Textile</div>
                      <div className="bg-gray-100 p-3">Sole Material</div>
                      <div className="p-3">Rubber</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      General Specifications
                    </div>
                    <div className="border rounded overflow-hidden text-sm text-gray-600">
                      <div className="bg-gray-100 p-3">Brand Product Name</div>
                      <div className="p-3">RUN 70s 2.0 Shoes</div>
                      <div className="bg-gray-100 p-3">Occasion</div>
                      <div className="p-3">Casual</div>
                      <div className="bg-gray-100 p-3">Pattern</div>
                      <div className="p-3">Logo</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
