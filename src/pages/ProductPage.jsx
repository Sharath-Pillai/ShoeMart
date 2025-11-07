import React from 'react'

const ProductPage = () => {
    return (

        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <div className="max-w-7xl mx-auto p-6">
                {/* Breadcrumb */}
                <nav className="text-xs text-gray-500 mb-4">
                    Home / Sports / Men / Shoes
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left column - Images */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded shadow-sm p-6">
                            <div className="w-full bg-gray-100 rounded-md flex items-center justify-center h-[420px]">
                                <img
                                    src="https://images.unsplash.com/photo-1600180758890-0f4f6b8b2d9b?q=80&w=1200&auto=format&fit=crop"
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
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="h-20 w-full bg-white rounded border flex items-center justify-center"
                                    >
                                        <img
                                            src={`https://images.unsplash.com/photo-1600180758890-0f4f6b8b2d9b?q=80&w=400&auto=format&fit=crop`}
                                            alt={`thumb-${i}`}
                                            className="h-16 object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center column - Details */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded shadow-sm p-6">
                            <h1 className="text-lg font-semibold">
                                adidas Men's Run 70S 2.0 Lace-Up Low Ankle Sneakers | OE
                            </h1>

                            <div className="mt-3">
                                <div className="flex flex-wrap items-baseline gap-3">
                                    <div className="text-2xl font-bold">QAR 245</div>
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
                            </div>

                            {/* Divider line */}
                            <div className="border-t border-gray-200 my-5"></div>

                            {/* Colour section */}
                            <div className="mt-2">
                                <div className="text-sm text-gray-600 mb-2">Colour</div>
                                <div className="flex gap-3 flex-wrap">
                                    {[1, 2, 3].map((i, idx) => (
                                        <button
                                            key={i}
                                            className={`w-12 h-12 border rounded p-1 ${idx === 2 ? "border-2 border-cyan-300" : ""
                                                }`}
                                        >
                                            <img
                                                src="https://images.unsplash.com/photo-1600180758890-0f4f6b8b2d9b?q=80&w=200&auto=format&fit=crop"
                                                alt={`c${i}`}
                                                className="h-full object-contain"
                                            />
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

                                <div className="mt-3 grid grid-cols-6 gap-2">
                                    {["40 2/3", "42", "43 1/3", "44", "44 2/3", "46"].map(
                                        (s, idx) => (
                                            <button
                                                key={idx}
                                                className={`text-sm py-2 rounded border ${idx === 1 ? "bg-cyan-50 border-cyan-300" : ""
                                                    } ${idx > 2 ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                {s}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mt-6">
                                <div className="text-sm text-gray-600">Quantity</div>
                                <div className="mt-2 flex items-center gap-3">
                                    <div className="flex items-center border rounded overflow-hidden">
                                        <button className="px-3 py-2" aria-label="decrease">
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
                                        <input
                                            className="w-16 text-center py-2 outline-none"
                                            defaultValue={1}
                                            readOnly
                                        />
                                        <button className="px-3 py-2" aria-label="increase">
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
                                <button className="flex-1 bg-cyan-600 text-white py-3 rounded shadow w-full">
                                    Add to Basket
                                </button>
                                <button className="bg-black text-white py-3 px-6 rounded w-full sm:w-auto">
                                    Buy Now
                                </button>
                            </div>

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
                            <h3 className="font-semibold mb-3">Product Details</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                These adidas sneakers bring a ’70s vibe to your everyday look.
                                The lightweight upper is lined for comfort while Cloudfoam
                                cushioning keeps you powering through your routine.
                            </p>

                            {/* Material & General Specifications side-by-side */}
                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                                {/* Material */}
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-700 mb-2">
                                        Material
                                    </div>
                                    <div className="border rounded overflow-hidden text-sm text-gray-600">
                                        <div className="bg-gray-50 p-3">Upper Material</div>
                                        <div className="p-3">Leather and Textile</div>
                                        <div className="bg-gray-50 p-3">Sole Material</div>
                                        <div className="p-3">Rubber</div>
                                    </div>
                                </div>

                                {/* General Specifications */}
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-700 mb-2">
                                        General Specifications
                                    </div>
                                    <div className="border rounded overflow-hidden text-sm text-gray-600">
                                        <div className="bg-gray-50 p-3">Brand Product Name</div>
                                        <div className="p-3">RUN 70s 2.0 Shoes</div>
                                        <div className="bg-gray-50 p-3">Occasion</div>
                                        <div className="p-3">Casual</div>
                                        <div className="bg-gray-50 p-3">Pattern</div>
                                        <div className="p-3">Logo</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-cyan-600 text-sm cursor-pointer">
                                See Full Details ▾
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProductPage
