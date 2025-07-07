"use client";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import LocalStorageUtils from "@/src/apiService/LocalStorageUtils";
import { useCart } from "@/lib/cart";

const NavBar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const { cart } = useCart();

  const cartItemCount =
    cart.reduce((total: any, item: any) => total + item.quantity, 0) || 0;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    setDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="relative">
      <nav className="relative px-6 lg:px-16 py-7 bg-gray-800">
        <div className="flex justify-between items-center">
          <a className="inline-block text-lg font-bold" href="/">
            <img
              className="h-16"
              src="/sitesettings/logo.png"
              alt=""
              width="auto"
            />
          </a>
          <div className="lg:hidden">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="flex items-center p-3 text-white hover:text-yellow-500"
            >
              <svg
                className="block h-4 w-4"
                stroke="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:w-auto lg:space-x-12">
            <li>
              <a
                className="inline-block text-gray-400 hover:text-gray-200 font-medium"
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="inline-block text-gray-400 hover:text-gray-200 font-medium"
                href="/collection"
              >
                Collection
              </a>
            </li>
            <li>
              <a
                className="inline-block text-gray-400 hover:text-gray-200 font-medium"
                href="#"
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="hidden lg:inline-flex items-center">
            {/* Cart Icon with Badge */}
            <Link
              href="/cart"
              className="relative inline-block mr-6 text-white hover:text-yellow-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="h-8 w-8 border-2 flex items-center justify-center text-sm font-medium bg-muted rounded-full">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </Avatar>
                  <span className="hidden md:inline text-white text-sm font-medium">
                    {`${user?.firstName} ${user?.lastName}`}
                  </span>
                  <svg
                    className={`w-4 h-4 text-white transition-transform ${
                      dropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href="/dashboard/orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setDropdown(false)}
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M8 11v6a2 2 0 002 2h4a2 2 0 002-2v-6M8 11h8"
                        />
                      </svg>
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  className="inline-block px-5 py-3 text-center font-bold text-black bg-yellow-500 hover:bg-yellow-600 transition duration-200"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="inline-block px-5 py-3 text-center font-bold text-black bg-yellow-500 hover:bg-yellow-600 transition duration-200"
                  href="/signup"
                >
                  Create Free Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`${
          mobileNavOpen ? "block" : "hidden"
        } fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50`}
      >
        <div
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 bg-gray-800 opacity-25"
        ></div>
        <nav className="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-2xl font-medium leading-none" href="#">
              <img
                src="/sitesettings/logo.png"
                className="h-6"
                alt=""
                width="auto"
              />
            </a>
            <button onClick={() => setMobileNavOpen(false)}>
              <svg
                className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <a
                  className="block p-4 font-medium text-black hover:bg-gray-50"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 font-medium text-black hover:bg-gray-50"
                  href="/collection"
                >
                  Collection
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 font-medium text-black hover:bg-gray-50"
                  href="#"
                >
                  Contact
                </a>
              </li>
              <li className="mb-1">
                <Link
                  href="/cart"
                  className="flex items-center p-4 font-medium text-black hover:bg-gray-50"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Cart
                  {cartItemCount > 0 && (
                    <span className="ml-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            {user ? (
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <Avatar className="h-8 w-8 border-2 flex items-center justify-center text-sm font-medium bg-gray-100 rounded-full mr-3">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </Avatar>
                  <span className="text-sm font-medium text-gray-800">
                    {`${user?.firstName} ${user?.lastName}`}
                  </span>
                </div>

                <Link
                  href="/dashboard/orders"
                  className="block mb-2 py-3 text-sm text-center border border-gray-200 hover:border-gray-400 font-bold"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full py-3 text-sm text-center text-white bg-red-500 hover:bg-red-600 font-bold transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-6">
                <a
                  className="block mb-2 py-3 text-sm text-center border border-gray-200 hover:border-gray-400 font-bold"
                  href="/login"
                >
                  Login
                </a>
                <a
                  className="block py-3 text-sm text-center text-black bg-yellow-500 hover:bg-yellow-600 font-bold transition duration-200"
                  href="/signup"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
