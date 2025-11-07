import React from "react";

const MenShoePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top nav / breadcrumbs */}
            <header className="bg-white border-b border-red-200">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="#" className="text-sm text-gray-600 hover:underline">&lt; Back</a>
                </div>
            </header>
      {/* Hero / breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">
              Home / Men / Shoes For Men
            </div>
            <h1 className="text-3xl font-semibold mt-2">Shoes For Men</h1>
            <p className="text-gray-500 mt-2">
              Reveal an unmatched collection of shoes for men online at
              Centrepoint Qatar. Whether you're looking for sneakers, formal
              shoes, loafers or running shoes — browse the range below.
            </p>
          </div>

          {/* Category quick links */}
          <div className="hidden lg:flex items-center gap-6">
            {[
              "Sneakers",
              "Sport Shoes",
              "Boots",
              "Formal Shoes",
              "Loafers & Moccasins",
              "Flipflops & Slides",
            ].map((c) => (
              <div
                key={c}
                className="w-28 h-20 bg-white border rounded-md flex flex-col items-center justify-center text-sm text-gray-700 shadow-sm"
              >
                <img
                  src={`https://source.unsplash.com/collection/190727/100x60?sig=${c}`}
                  alt={c}
                  className="w-16 h-10 object-cover mb-1"
                />
                <div className="text-xs">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar filters */}
          <aside className="col-span-3">
            <div className="sticky top-6">
              <div className="bg-white border rounded-md p-4 mb-4">
                <h3 className="font-semibold text-gray-700">NARROW BY</h3>
                <button className="text-sm text-blue-500 mt-1">
                  Clear all filters
                </button>
              </div>

              <div className="bg-white border rounded-md p-4 mb-4">
                <h4 className="font-medium text-gray-600 mb-2">Brand</h4>
                <div className="text-sm text-gray-500">Lee Cooper</div>
              </div>

              <div className="bg-white border rounded-md p-4 mb-4">
                <h4 className="font-medium text-gray-600 mb-2">Colour</h4>
                <div className="grid gap-2 text-sm text-gray-600">
                  {[
                    "White (89)",
                    "Black (84)",
                    "Blue (63)",
                    "Brown (51)",
                    "Beige (18)",
                    "Green (12)",
                    "Grey (8)",
                    "Multicolour (6)",
                    "Cream (3)",
                  ].map((c) => (
                    <label key={c} className="flex items-center gap-2">
                      <input type="checkbox" /> <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-md p-4 mb-4">
                <h4 className="font-medium text-gray-600 mb-2">Size</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {[
                    "40",
                    "41",
                    "42",
                    "43",
                    "44",
                    "45",
                    "46",
                    "40-41",
                    "42-43",
                    "44-45",
                  ].map((s) => (
                    <div
                      key={s}
                      className={`border rounded-md p-2 text-center ${
                        s === "42"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-md p-4">
                <h4 className="font-medium text-gray-600 mb-2">Type</h4>
                <div className="text-sm text-gray-600">All</div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <main className="col-span-9">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">334 Products</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-50 border rounded-md px-3 py-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span className="text-xs">Grid</span>
                </div>
                <select className="border rounded-md px-3 py-1 text-sm">
                  <option>Sort by: Discount</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
            </div>

            <div className="bg-white border rounded-md p-3 mb-4 flex items-center gap-4">
              <div className="text-xs text-gray-500">Filtered By</div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  Lee Cooper <span className="ml-2 text-gray-400">x</span>
                </div>
                <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  42 <span className="ml-2 text-gray-400">x</span>
                </div>
                <button className="text-sm text-blue-500">Clear All</button>
              </div>
            </div>

            {/* Delivery selector */}
            <div className="mb-4">
              <div className="bg-gray-50 border rounded-md px-4 py-3 text-sm flex items-center justify-between">
                <div>
                  <svg
                    className="w-5 h-5 inline-block mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7h18M3 12h18"
                    />
                  </svg>{" "}
                  Deliver to <strong>Al Kharaitiyat</strong>
                </div>
                <div className="text-xs text-gray-500">Change</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white border rounded-md overflow-hidden shadow-sm"
                >
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/photo-1519741492700-5bd1d2e3d7a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60&fm=jpg&crop=faces&sig=${i}`}
                      alt="shoe"
                      className="w-full h-56 object-contain bg-white"
                    />
                    <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="text-sm text-gray-500">Lee Cooper</div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <div className="text-lg font-semibold">QAR 69</div>
                      <div className="text-sm line-through text-gray-400">
                        QAR 189
                      </div>
                      <div className="text-xs text-red-500">63% OFF</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Available in 42, 43
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination / list view switch */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">Showing 1 - 24 of 334</div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border rounded-md">Prev</button>
                <button className="px-3 py-1 border rounded-md">Next</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MenShoePage;
