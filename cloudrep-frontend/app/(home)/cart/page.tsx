"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import BreadcrumbComponent from "@/components/Pages/Common/Breadcrumb";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/Pages/Common/Alert";
import AuthenticatedCall from "@/src/apiService/AuthenticatedCall";
import { useSelector } from "react-redux";
import LocalStorageUtils from "@/src/apiService/LocalStorageUtils";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

const ShoppingCart = () => {
  const { cart, updateCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const user = useSelector((state: any) => state.auth.user);
  // Calculate totals whenever cart changes
  useEffect(() => {
    const newSubtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [cart]);

  const removeItem = (id: string) => {
    updateCart(cart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    updateCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const handleSubmitCart = async () => {
    if (!user) {
      showErrorAlert("Error!", "Please Login first to checkout");
      window.location.href = "/login";
      return;
    }
    const products = cart.map((item: any) => ({
      productId: item._id, // assuming _id is the product ID
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl, // make sure this field exists in your cart items
      quantity: item.quantity,
    }));

    // Create the data object that matches CreateSaleDto
    const saleData = {
      products: products,
      totalPrice: subtotal,
    };

    await AuthenticatedCall({
      method: "POST",
      url: "/sales",
      data: saleData, // Send data without confirmPassword
    })
      .then((res) => {
        showSuccessAlert("Success!", "Your action was completed successfully.");
        LocalStorageUtils.removeItem("cart");
        window.location.href = "/dashboard/orders";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <BreadcrumbComponent
        title="Cart"
        breadcrumbs={[
          { label: "Home", href: "/", icon: true },
          { label: "Cart", href: "/cart", active: true },
        ]}
      />
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl text-black font-bold mb-12">Shopping Cart</h3>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
              <Link
                href="/collection"
                className="text-yellow-500 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-4">
              {/* Cart Items */}
              <div className="w-full lg:w-7/12 px-4 mb-12 lg:mb-0">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="py-10 border-t border-b border-gray-800 relative"
                  >
                    <button
                      onClick={() => removeItem(item._id)}
                      className="inline-block p-0 absolute top-0 right-0 mt-10 w-auto"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L11 1M1 1L11 11"
                          stroke="#84878A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>

                    <div className="flex flex-wrap -mx-4">
                      <div className="w-full sm:w-1/3 px-4 mb-6 sm:mb-0">
                        <img
                          className="block w-24"
                          src={item.imageUrl}
                          alt={item.name}
                        />
                      </div>

                      <div className="w-full sm:w-2/3 px-4">
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="sm:flex items-start">
                              <div className="flex-shrink-0 mr-4 md:mr-12 lg:mr-32 mb-6 sm:mb-4">
                                <span className="text-black font-medium">
                                  {item.name}
                                </span>
                                <div>
                                  <span className="inline-block mr-5 text-sm font-medium text-gray-400">
                                    {item.category}
                                  </span>
                                </div>
                              </div>

                              <div className="mb-6 sm:mb-4">
                                <div className="flex items-center mb-4">
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item._id,
                                        item.quantity - 1
                                      )
                                    }
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l bg-gray-100 hover:bg-gray-200"
                                    disabled={item.quantity <= 1}
                                  >
                                    <span className="text-lg font-bold">-</span>
                                  </button>
                                  <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                                    <span className="text-sm font-medium">
                                      {item.quantity}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item._id,
                                        item.quantity + 1
                                      )
                                    }
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r bg-gray-100 hover:bg-gray-200"
                                  >
                                    <span className="text-lg font-bold">+</span>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <h6 className="text-sm font-bold text-black">
                              ${(item.price * item.quantity).toFixed(2)}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-5/12 px-4">
                <div className="lg:max-w-md lg:ml-auto p-8 bg-blueGray-900">
                  <h5 className="text-xl font-bold text-black mb-6">
                    Order summary
                  </h5>

                  <div className="mb-4 pb-4 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">
                        Subtotal
                      </span>
                      <span className="text-sm font-medium text-gray-400">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-black">Order total</span>
                      <span className="font-bold text-black">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitCart}
                    className="block px-6 py-3 text-center font-bold text-black bg-yellow-500 hover:bg-yellow-600 transition duration-200 w-full"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
