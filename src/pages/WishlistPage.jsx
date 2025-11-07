import React from "react";

const WishlistPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Top nav / breadcrumbs */}
      <header className="bg-white border-b border-red-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            &lt; Back
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold">My Wish Lists</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 13l10-5v6a2 2 0 0 1-2 2h-16a2 2 0 0 1-2-2v-6l10 5z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid of product cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, idx) => (
            <article
              key={idx}
              className="bg-white border border-gray-100 rounded-lg shadow-sm p-4"
            >
              <div className="flex flex-col h-full">
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-1520975912044-6f5a6e0b8c6a?auto=format&fit=crop&w=500&q=60&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VhcnxlbnwwfHwwfHw%3D`}
                    alt="product"
                    className="h-40 w-full object-cover rounded-md"
                  />

                  {/* Out of stock badge */}
                  <div className="absolute left-3 top-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-red-600 flex items-center gap-2 border border-red-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 10-2 0v2a1 1 0 002 0zm-1 3a1 1 0 00-.707 1.707A1 1 0 0010 12a1 1 0 00.707-.293A1 1 0 0010 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs">Out of stock</span>
                  </div>
                </div>

                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      QAR{" "}
                      {
                        [40, 9, 79, 15, 39, 15, 12, 45, 45, 49, 29, 19][
                          idx % 12
                        ]
                      }
                    </p>
                    <h3 className="mt-2 text-sm font-medium text-gray-700">
                      {
                        [
                          "Styli Broderie Tiered Midi Skirt",
                          "Tank Top with Spaghetti Straps",
                          "Lee Cooper Logo Embroidered Sweatshirt",
                          "Slogan Print T-shirt with Crew Neck",
                          "Minnie Mouse Print T-shirt with Crew Neck",
                          "Typographic Print Crew Neck T-shirt with Short Sleeves",
                          "T-shirt with Crew Neck and Cap Sleeves",
                          "Set of 2 - Printed Sleepshirt with Short Sleeves",
                          "Slogan Print Sleepshirt with Round Neck and Short Sleeves",
                          "Peanuts Print Neoprene Shorts with Drawstring",
                          "Basic Jersey Dress with Pockets",
                          "Ribbed Tank Top",
                        ][idx % 12]
                      }
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      Short description or detail goes here to mimic the design
                      from the screenshot. This is only a layout placeholder.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="text-sm text-red-600 border border-red-100 px-3 py-1 rounded-full">
                        Remove
                      </button>
                    </div>

                    <div className="text-xs text-gray-400">
                      <button
                        className="flex items-center gap-1 text-sm text-gray-500 hover:underline"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Skeleton example row (for loading state visuals) */}
        <section className="mt-8">
          <h2 className="text-sm text-gray-500 mb-3">Skeleton previews</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-lg shadow-sm animate-pulse"
              >
                <div className="h-36 bg-gray-200 rounded-md" />
                <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
                <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
                <div className="mt-4 h-8 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <footer className="mt-10 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1–12 of 48 results
          </div>
          <nav className="inline-flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-200 rounded-md text-sm">
              Previous
            </button>
            <div className="inline-flex items-center divide-x rounded-md overflow-hidden border border-gray-200">
              <button className="px-3 py-2 text-sm bg-white">1</button>
              <button className="px-3 py-2 text-sm">2</button>
              <button className="px-3 py-2 text-sm">3</button>
            </div>
            <button className="px-3 py-2 border border-gray-200 rounded-md text-sm">
              Next
            </button>
          </nav>
        </footer>
      </main>
    </div>
  );
};

export default WishlistPage;
