import { Link } from "react-router-dom";

const Backnavbar = () => {
  return (
    <header className="bg-white border-b border-red-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-sm text-gray-600 hover:underline">
          &lt; Back
        </Link>
      </div>
    </header>
  );
};

export default Backnavbar;
