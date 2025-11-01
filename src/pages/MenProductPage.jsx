import React from 'react'

const MenProductsPage = () => {
  return (
    <div className="bg-[#f5f5f3] min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-5xl font-semibold text-gray-800 mb-10">Men</h1>

        {/* Filter + Sorting Row */}
        <div className="flex flex-wrap items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#7a7a57] text-white px-4 py-2 uppercase text-sm tracking-wider">
              <span className="text-lg">☰</span> Filter Shoes
            </button>
            <p className="text-gray-500 text-sm">Showing all 8 results</p>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <p className="text-sm">Default sorting</p>
            <span className="text-lg">⌄</span>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
              <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <div className="relative bg-white p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0c58d2e4-9775-4477-b002-67db08f5fbc2/air-zoom-alphafly-next-2-mens-road-racing-shoes-XQL8qT.png"
              alt="Black Runner"
              className="w-full h-[300px] object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Black Runner</h3>
            <p className="text-gray-600">$120</p>
          </div>

          {/* Product Card 2 (with sale tag) */}
          <div className="relative bg-white p-4 hover:shadow-lg transition-shadow duration-300">
            <span className="absolute top-3 right-3 bg-[#7a7a57] text-white text-xs px-3 py-1 rounded-full">
              Sale!
            </span>
            <img
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/94027f7a-8c15-49f3-9871-51cfc1b1823b/air-max-97-mens-shoes-LJmK45.png"
              alt="Blue Retro"
              className="w-full h-[300px] object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Blue Retro</h3>
            <p className="text-gray-600">$110</p>
          </div>

          {/* Product Card 3 */}
          <div className="relative bg-white p-4 hover:shadow-lg transition-shadow duration-300">
            <img
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a8028f8d-df45-4201-a98d-94680e49f054/air-max-90-g-mens-golf-shoes-dL9C35.png"
              alt="Green Street"
              className="w-full h-[300px] object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Green Street</h3>
            <p className="text-gray-600">$95</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenProductsPage