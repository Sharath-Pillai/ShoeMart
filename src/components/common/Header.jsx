import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Auto-close dropdown after 3 seconds if not interacted with
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);
      // Store timer ID on window to allow clearing from event handlers (simple hack for this scope)
      // Or better, just let it run. If user enters dropdown, we can't easily clear this specific closure's timer without a ref.
      // Let's use a window property or ref. Since I can't add a ref easily in this replace block without changing more code,
      // I'll use a window property for simplicity in this specific context, or just rely on the fact that 
      // if the user is IN the dropdown, we don't want it to close.
      // Actually, let's use a ref properly. I'll add useRef to imports and use it.
      window.userDropdownTimer = timer;
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) {
      return;
    }
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchValue("");
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await fetch(`http://localhost:3000/users/${user.id}`, {
          method: "DELETE",
        });
        logout();
        setOpen(false);
        navigate("/");
        alert("Your account has been deleted.");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <header className="relative flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm lg:px-14">
      <div className="flex items-center gap-6">
        <div className="text-2xl font-bold text-orange-500">
          <Link to="/" className="tracking-wide">
            SHOEMART
          </Link>
        </div>
        <nav>
          <ul className="flex gap-5 text-sm font-semibold uppercase tracking-wide text-gray-400">
            <li className="cursor-pointer transition hover:text-black">
              <Link to="/allcollections">All Collections</Link>
            </li>
            <li className="cursor-pointer transition hover:text-black">
              <Link to="/womenshoelist">Women</Link>
            </li>
            <li className="cursor-pointer transition hover:text-black">
              <Link to="/menshoelist">Men</Link>
            </li>
          </ul>
        </nav>
      </div>

      <form
        className="mx-4 hidden flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 lg:flex"
        onSubmit={handleSearchSubmit}
      >
        <input
          className="flex-1 bg-transparent text-sm outline-none"
          placeholder="Search sneakers, brands or categories"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button
          type="submit"
          className="text-sm font-semibold text-gray-600 transition hover:text-black"
        >
          Search
        </button>
      </form>

      <nav>
        <ul className="flex items-center gap-6 text-gray-400">
          <li className="cursor-pointer transition hover:text-black">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer transition hover:text-black">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="flex gap-6">
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart" className="relative">
              <img
                src="data:image/png;base64,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"
                alt="cart-icon"
                className="w-6 h-6 cursor-pointer"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <div
              onMouseEnter={() => {
                setOpen(true);
                // Reset auto-close timer when re-entering container
              }}
              className="relative"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/709/709699.png"
                alt="user-icon"
                className="w-6 h-6 cursor-pointer"
              />
              {open && (
                <div
                  className="absolute top-8 right-0 bg-white rounded-lg py-2.5 shadow-lg w-[150px] z-10 text-center border border-gray-100"
                  onMouseEnter={() => {
                    // Cancel auto-close when entering dropdown
                    const timerId = window.userDropdownTimer;
                    if (timerId) clearTimeout(timerId);
                  }}
                  onMouseLeave={() => setOpen(false)}
                >
                  {user ? (
                    <>
                      <div className="py-2.5 px-4 whitespace-nowrap text-sm font-semibold text-gray-700 border-b border-gray-100">
                        Hi, {user.firstName || user.username}
                      </div>
                      <Link
                        to="/profile"
                        className="block py-2.5 px-4 whitespace-nowrap cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-100 text-gray-600 hover:text-black"
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block py-2.5 px-4 whitespace-nowrap cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-100 text-gray-600 hover:text-black"
                        onClick={() => setOpen(false)}
                      >
                        Order History
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full  py-2.5 px-4 whitespace-nowrap cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-100 text-red-500 hover:text-red-700"
                      >
                        Sign Out
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="w-full py-2.5 px-4 whitespace-nowrap cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-100 text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete Account
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/signin"
                      className="block py-2.5 px-4 whitespace-nowrap cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-100 text-blue-600 hover:text-blue-800"
                      onClick={() => setOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
