import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoeContext } from "../../context/shoeContext";

const ProductCard = ({ product, variant = "grid" }) => {
  const { toggleWishlist, isInWishlist } = useContext(ShoeContext);

  if (!product) {
    return null;
  }

  const isSoldOut = !product.is_in_inventory;
  const badgeLabel = product.featured ? "Featured" : product.gender;
  const loved = isInWishlist?.(product.id);
  const stockLabel =
    typeof product.items_left === "number"
      ? `${product.items_left} item${product.items_left === 1 ? "" : "s"} left`
      : product.is_in_inventory
        ? "In stock"
        : "Out of stock";

  const handleWishlistClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist?.(product.id);
  };

  return (
    <article
      className={`group relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow transition hover:-translate-y-1 hover:shadow-xl ${
        variant === "list" ? "flex gap-6 p-5" : ""
      }`}
    >
      <button
        type="button"
        onClick={handleWishlistClick}
        aria-label={loved ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 text-gray-500 shadow transition hover:text-red-500"
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
      </button>

      <Link
        to={`/productdetails/${product.id}`}
        className={`flex flex-1 ${variant === "list" ? "gap-6" : "flex-col"}`}
      >
        <div
          className={`relative ${variant === "list" ? "w-48 flex-shrink-0" : "w-full"} bg-gray-50`}
        >
          {badgeLabel && (
            <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold tracking-wide text-white transition-opacity duration-200 group-hover:opacity-0">
              {badgeLabel}
            </span>
          )}

          {isSoldOut && (
            <span className="absolute right-3 top-3 rounded-full bg-red-600/80 px-3 py-1 text-xs font-semibold text-white">
              Sold Out
            </span>
          )}

          <img
            src={product.imageURL}
            alt={product.name}
            loading="lazy"
            className={`object-contain transition duration-500 group-hover:scale-105 ${
              variant === "list"
                ? "h-48 w-full"
                : "h-60 w-full sm:h-64 md:h-72"
            }`}
          />
        </div>

        <div
          className={`flex flex-1 flex-col ${variant === "grid" ? "p-5" : ""}`}
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {product.brand} • {product.category}
          </div>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-800">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {product.gender === "MEN"
              ? "For Men"
              : product.gender === "WOMEN"
                ? "For Women"
                : "Kids Collection"}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900">
              QAR {product.price}
            </span>
            <span className="text-sm text-gray-400 line-through">
              QAR {Math.round(product.price * 1.35)}
            </span>
            <span className="text-xs font-semibold text-green-600">
              Save QAR {Math.round(product.price * 0.35)}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>{stockLabel}</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {product.is_in_inventory ? "Ready to ship" : "Notify me"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;

