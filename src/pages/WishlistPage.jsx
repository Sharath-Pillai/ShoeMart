import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import InnerPageBack from "../components/common/InnerPageBack";
import { ShoeContext } from "../context/shoeContext";

const WishlistPage = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
    isLoading,
  } = useContext(ShoeContext);
  const [view, setView] = useState("grid");

  const hasItems = wishlistItems.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <InnerPageBack />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
              Collection
            </p>
            <h1 className="mt-1 text-3xl font-semibold">My Wishlist</h1>
            <p className="text-sm text-gray-500">
              {hasItems
                ? `You have ${wishlistItems.length} saved item${
                    wishlistItems.length === 1 ? "" : "s"
                  }.`
                : "Start saving products you love to compare or buy later."}
            </p>
          </div>
          {hasItems && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <div className="flex rounded-full border border-gray-200">
                {["grid", "list"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setView(mode)}
                    className={`px-4 py-2 text-sm font-semibold capitalize transition ${
                      view === mode
                        ? "bg-gray-900 text-white"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={clearWishlist}
                className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-600 transition hover:border-gray-400"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="h-44 rounded-xl bg-gray-100" />
                <div className="mt-4 h-4 rounded bg-gray-100" />
                <div className="mt-2 h-4 w-1/2 rounded bg-gray-100" />
                <div className="mt-6 h-10 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        ) : hasItems ? (
          <section
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {wishlistItems.map((item) =>
              view === "grid" ? (
                <article
                  key={item.id}
                  className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="relative">
                    <Link to={`/productdetails/${item.id}`}>
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="h-48 w-full rounded-xl bg-gray-50 object-contain"
                      />
                    </Link>
                    <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-red-100 bg-white/90 px-3 py-1 text-xs font-semibold text-red-600">
                      {!item.is_in_inventory ? "Out of stock" : "Wishlist"}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {item.brand} • {item.category}
                      </p>
                      <Link to={`/productdetails/${item.id}`}>
                        <h3 className="mt-2 text-lg font-semibold text-gray-800 hover:text-cyan-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.gender === "MEN"
                          ? "Designed for men"
                          : item.gender === "WOMEN"
                            ? "Designed for women"
                            : "Kids edition"}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-gray-900">
                          QAR {item.price}
                        </p>
                        <p className="text-xs text-gray-400">
                          Earn 25 Shukrans •{" "}
                          {item.is_in_inventory ? "In Stock" : "Notify me"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(item.id)}
                        className="rounded-full border border-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ) : (
                <article
                  key={item.id}
                  className="flex gap-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="relative flex-shrink-0">
                    <Link to={`/productdetails/${item.id}`}>
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="h-40 w-40 rounded-xl bg-gray-50 object-contain"
                      />
                    </Link>
                    <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-red-100 bg-white/90 px-3 py-1 text-xs font-semibold text-red-600">
                      {!item.is_in_inventory ? "Out of stock" : "Wishlist"}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {item.brand} • {item.category}
                      </p>
                      <Link to={`/productdetails/${item.id}`}>
                        <h3 className="mt-2 text-lg font-semibold text-gray-800 hover:text-cyan-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.gender === "MEN"
                          ? "Designed for men"
                          : item.gender === "WOMEN"
                            ? "Designed for women"
                            : "Kids edition"}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xl font-bold text-gray-900">
                          QAR {item.price}
                        </p>
                        <p className="text-xs text-gray-400">
                          Earn 25 Shukrans •{" "}
                          {item.is_in_inventory ? "In Stock" : "Notify me"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(item.id)}
                        className="rounded-full border border-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </section>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Your wishlist is empty
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Tap the heart icon on any product to save it for later.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;
