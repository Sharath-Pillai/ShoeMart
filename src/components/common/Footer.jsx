import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="flex-1 px-6">
          <h1 className="text-4xl font-bold ">ShoeMart</h1>
          <p className="text-gray-600 mb-4">
            Praesent eget tortor sit risus egestas nulla pharetra ornare quis
            bibendum est bibendum sapien proin nascetur
          </p>
          <div className="flex gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="facebook"
              className="w-6 h-6"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="twitter"
              className="w-6 h-6"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="instagram"
              className="w-6 h-6"
            />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Shop</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Our Story</li>
              <li>Shop Men</li>
              <li>Shop Women</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Size Chart</li>
              <li>Shoe Care</li>
              <li>Shipping & Returns</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <ul className="text-gray-600 space-y-1">
              <li>FAQs</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        © 2025 Recycled Shoe Store. Powered by Shoe Mart.
      </div>
    </footer>
  );
};

export default Footer;
