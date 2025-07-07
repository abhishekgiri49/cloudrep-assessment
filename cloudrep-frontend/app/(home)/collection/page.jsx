"use client";
import BreadcrumbComponent from "@/components/Pages/Common/Breadcrumb";
import React from "react";
import products from "@/data/products.json";
import { toast } from "react-toastify";
import Link from "next/link";

const Collection = () => {
  const addToCart = (product) => {
    // Get existing cart from localStorage or initialize empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      // Update quantity if product exists
      existingItem.quantity += 1;
    } else {
      // Add new product with quantity 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show success notification
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <>
      <BreadcrumbComponent
        title="Clothing Collection"
        breadcrumbs={[
          { label: "Home", href: "/", icon: true },
          { label: "Clothing Collection", href: "/collection", active: true },
        ]}
      />
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="flex flex-wrap mb-20">
                {products.map((item) => (
                  <div key={item._id} className="w-full sm:w-1/2 xl:w-1/4 p-4">
                    <div className="block p-5 hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-100">
                      <Link href={`/product/${item._id}`} className="block">
                        <img
                          className="block w-full h-80 mb-8 object-cover"
                          src={item.imageUrl}
                          alt={item.name}
                        />
                        <div className="text-center">
                          <span className="font-bold text-black">
                            ${item.price.toFixed(2)}
                          </span>
                          <h6 className="font-bold text-black mt-2 mb-3">
                            {item.name}
                          </h6>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                      <div className="flex justify-between mt-4">
                        <Link
                          href={`/product/${item._id}`}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;
