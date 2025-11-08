import React from "react";

const Toppromobar = () => {
  return (
    // <p className="bg-gray-100 text-center text-xs py-2 text-gray-400">
    //   Free Express Shipping on all orders with all duties included
    // </p>
    <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg> Free Shipping</span>
              <span className="flex items-center gap-2">Click & Collect</span>
              <span className="flex items-center gap-2">Home Delivery</span>
            </div>
            <div className="text-right">
              <span className="mr-4">Deliver to <strong>Alappuzha</strong></span>
              <span className="text-yellow-500">Hi, Sharath</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Toppromobar;
