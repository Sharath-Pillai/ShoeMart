import React from "react";
import { useNavigate } from "react-router-dom";

const InnerPageBack = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b border-red-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-sm text-gray-600 hover:underline"
          //  onClick={()=>window.history.back()} //plain react
          onClick={() => navigate(-1)}
        >
          &lt; Back
        </a>
      </div>
    </header>
  );
};

export default InnerPageBack;
