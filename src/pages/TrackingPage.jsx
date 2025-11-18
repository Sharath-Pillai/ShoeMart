import React from 'react'

const TrackingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Order Tracking</h1>
                    <nav className="flex items-center gap-6 text-sm text-gray-600">
                        <span>Home</span>
                        <span>Orders</span>
                        <span className="font-medium text-gray-900">Tracking</span>
                        <span>Help</span>
                    </nav>
                </div>
            </header>

            {/* Main Tracking Section */}
            <main className="max-w-4xl mx-auto px-6 py-10">
                {/* Order Info */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Order #987654321</h2>
                            <p className="text-sm text-gray-500">Placed on: 02 November 2025</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-600 text-sm">Estimated Delivery:</p>
                            <p className="text-base font-semibold text-green-600">08 November 2025</p>
                        </div>
                    </div>
                </section>

                {/* Tracking Steps */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-6">Delivery Progress</h3>

                    <div className="relative">
                        <div className="absolute left-4 top-0 h-full border-l-2 border-gray-200" />

                        {[
                            { title: "Order Placed", date: "02 Nov 2025, 10:30 AM", done: true },
                            { title: "Order Processed", date: "03 Nov 2025, 02:00 PM", done: true },
                            { title: "Shipped", date: "04 Nov 2025, 05:45 PM", done: true },
                            { title: "Out for Delivery", date: "08 Nov 2025, 09:00 AM", done: false },
                            { title: "Delivered", date: "--", done: false },
                        ].map((step, index) => (
                            <div key={index} className="relative pl-10 pb-8 last:pb-0">
                                <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center rounded-full border-2 bg-white z-10
                  ${step.done ? 'border-green-500' : 'border-gray-300'}">
                                    {step.done ? (
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                        </svg>
                                    )}
                                </div>

                                <div className="ml-4">
                                    <h4 className={`text-sm font-semibold ${step.done ? 'text-green-600' : 'text-gray-700'}`}>{step.title}</h4>
                                    <p className="text-xs text-gray-500">{step.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Order Summary */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-6">Items in this Order</h3>
                    <div className="divide-y">
                        {[1, 2].map((item) => (
                            <div key={item} className="py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1520975912044-6f5a6e0b8c6a?auto=format&fit=crop&w=100&q=60"
                                        alt="Product"
                                        className="w-16 h-16 rounded-md object-cover border"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">Slogan Print T-shirt</p>
                                        <p className="text-xs text-gray-500">Size: M | Qty: 1</p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-gray-800">QAR 45</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Subtotal:</p>
                            <p className="text-lg font-semibold text-gray-800">QAR 90</p>
                        </div>
                    </div>
                </section>

                {/* Support Section */}
                <section className="mt-10 text-center text-gray-600 text-sm">
                    <p>Need help with your order? <a href="#" className="text-blue-600 hover:underline">Contact Support</a></p>
                </section>
            </main>

            <footer className="mt-12 bg-white border-t py-6">
                <div className="max-w-6xl mx-auto px-6 text-sm text-gray-500">© Company Name</div>
            </footer>
        </div>
    )
}

export default TrackingPage

