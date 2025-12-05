import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const PRICE_BUCKETS = [
  { id: "all", label: "Any price", range: [0, Infinity] },
  { id: "under-75", label: "Under QAR 75", range: [0, 75] },
  { id: "75-125", label: "QAR 75 - 125", range: [75, 125] },
  { id: "125-200", label: "QAR 125 - 200", range: [125, 200] },
  { id: "above-200", label: "Above QAR 200", range: [200, Infinity] },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "name", label: "Name A → Z" },
];

const ProductExplorer = ({
  title,
  description,
  breadcrumb,
  products = [],
  initialSearch = "",
  isLoading = false,
  emptyStateMessage = "No products match your filters. Try adjusting them.",
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceBucket, setPriceBucket] = useState("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [view, setView] = useState("grid");

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const brandOptions = useMemo(
    () => [...new Set(products.map((item) => item.brand))],
    [products]
  );
  const categoryOptions = useMemo(
    () => [...new Set(products.map((item) => item.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const [min, max] =
      PRICE_BUCKETS.find((bucket) => bucket.id === priceBucket)?.range ??
      PRICE_BUCKETS[0].range;

    return products
      .filter((product) => {
        const matchesSearch =
          !search.trim() ||
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase());

        const matchesBrand =
          selectedBrands.length === 0 || selectedBrands.includes(product.brand);

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);

        const matchesPrice = product.price >= min && product.price <= max;

        const matchesInventory = !onlyInStock || product.is_in_inventory;

        return (
          matchesSearch &&
          matchesBrand &&
          matchesCategory &&
          matchesPrice &&
          matchesInventory
        );
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "price-low-high":
            return a.price - b.price;
          case "price-high-low":
            return b.price - a.price;
          case "name":
            return a.name.localeCompare(b.name);
          case "newest":
            return b.id - a.id;
          default:
            return (b.featured || 0) - (a.featured || 0);
        }
      });
  }, [
    products,
    search,
    selectedBrands,
    selectedCategories,
    priceBucket,
    onlyInStock,
    sortOption,
  ]);

  const toggleValue = (value, listSetter) => {
    listSetter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceBucket("all");
    setOnlyInStock(false);
  };

  const renderFilters = () => (
    <aside className="space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">Filters</h3>
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">Brand</p>
        <div className="space-y-2">
          {brandOptions.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleValue(brand, setSelectedBrands)}
                className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">Category</p>
        <div className="space-y-2">
          {categoryOptions.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleValue(category, setSelectedCategories)}
                className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">Price</p>
        <div className="space-y-2">
          {PRICE_BUCKETS.map((bucket) => (
            <label
              key={bucket.id}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="radio"
                name="price"
                value={bucket.id}
                checked={priceBucket === bucket.id}
                onChange={() => setPriceBucket(bucket.id)}
                className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-600"
              />
              {bucket.label}
            </label>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
        <span>Only in stock</span>
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
          checked={onlyInStock}
          onChange={() => setOnlyInStock((prev) => !prev)}
        />
      </label>
    </aside>
  );

  const renderToolbar = () => (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
          />
        </svg>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search brand, product or collection"
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
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

        <select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
          className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:border-cyan-500 focus:ring-cyan-500"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const hasActiveFilters =
    search.trim() ||
    selectedBrands.length ||
    selectedCategories.length ||
    priceBucket !== "all" ||
    onlyInStock;

  return (
    <section className="px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-10 text-white shadow-xl">
          {breadcrumb && (
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              {breadcrumb}
            </p>
          )}
          <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-white/80">
              {description}
            </p>
          )}
          <div className="text-sm text-white/60">
            {filteredProducts.length} curated products
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
          {renderFilters()}
          <div className="space-y-6">
            {renderToolbar()}

            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <span>
                Showing {filteredProducts.length} of {products.length} products
              </span>
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="font-semibold text-cyan-600 hover:text-cyan-700"
                  >
                    Reset filters
                  </button>
                  <div className="flex flex-wrap gap-2">
                    {search.trim() && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700"
                      >
                        Search: “{search}” ✕
                      </button>
                    )}
                    {selectedBrands.map((brand) => (
                      <button
                        type="button"
                        key={brand}
                        onClick={() =>
                          setSelectedBrands((prev) =>
                            prev.filter((item) => item !== brand)
                          )
                        }
                        className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {brand} ✕
                      </button>
                    ))}
                    {selectedCategories.map((category) => (
                      <button
                        type="button"
                        key={category}
                        onClick={() =>
                          setSelectedCategories((prev) =>
                            prev.filter((item) => item !== category)
                          )
                        }
                        className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {category} ✕
                      </button>
                    ))}
                    {priceBucket !== "all" && (
                      <button
                        type="button"
                        onClick={() => setPriceBucket("all")}
                        className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {
                          PRICE_BUCKETS.find(
                            (bucket) => bucket.id === priceBucket
                          )?.label
                        }{" "}
                        ✕
                      </button>
                    )}
                    {onlyInStock && (
                      <button
                        type="button"
                        onClick={() => setOnlyInStock(false)}
                        className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        In stock ✕
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div
                    key={index}
                    className="h-72 animate-pulse rounded-2xl bg-gray-100"
                  />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  No matches yet
                </h3>
                <p className="mt-2 text-sm text-gray-600">{emptyStateMessage}</p>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid gap-6"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={view}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductExplorer;

