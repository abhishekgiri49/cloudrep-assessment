"use client";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import Link from "next/link";
import React, { useState } from "react";
import BreadcrumbComponent from "@/components/Pages/Common/Breadcrumb";
import { useCart } from "@/lib/cart";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { cart, updateCart } = useCart(); // Move hook to top level

  const product = products.find((p: Product) => p._id === params.productId);

  if (!product) {
    return notFound();
  }

  const addToCart = () => {
    const existingItemIndex = cart.findIndex(
      (item: CartItem) => item._id === product._id
    );

    const updatedCart = [...cart]; // Create a copy of the cart

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      updatedCart[existingItemIndex].quantity = quantity;
    } else {
      // Add new item to cart
      updatedCart.push({ ...product, quantity });
    }

    updateCart(updatedCart); // Update cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsAdded(true);
  };

  const updateCartItem = (newQuantity: number) => {
    const existingItemIndex = cart.findIndex(
      (item: CartItem) => item._id === product._id
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity = newQuantity;
      updateCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    if (isAdded) {
      updateCartItem(newQuantity);
    }
  };
  return (
    <>
      <BreadcrumbComponent
        title="Product Information"
        breadcrumbs={[
          { label: "Home", href: "/", icon: true },
          { label: "Clothing Collection", href: "/collection", active: false },
          {
            label: "Product Information",
            href: `/product/${product._id}`,
            active: true,
          },
        ]}
      />
      <section className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-md md:max-w-none mx-auto">
            <ul className="flex items-center">
              <li className="mr-3">
                <Link href="/" className="text-gray-400 font-medium">
                  Home
                </Link>
                <span className="pl-2 text-gray-400">/</span>
              </li>
              <li className="mr-3">
                <Link
                  href="/category/fashion"
                  className="text-gray-400 font-medium"
                >
                  Fashion
                </Link>
                <span className="pl-2 text-gray-400">/</span>
              </li>
              <li>
                <span className="text-yellow-500 font-medium">
                  {product.name}
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap mt-10 -mx-4">
              {/* Product Images */}
              <div className="w-full md:w-1/2 lg:w-3/5 xl:w-2/3 mb-12 md:mb-0 px-4">
                <div className="max-w-3xl">
                  <div className="lg:flex h-full">
                    <div className="flex-1">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="block h-full w-full max-w-xl object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 px-4">
                <div className="p-8 h-full border border-gray-200 rounded-lg">
                  <div className="pb-8 border-b border-gray-200">
                    <span className="inline-block px-3 py-1 text-sm mb-5 bg-yellow-500 text-white font-medium rounded-full">
                      {product.category}
                    </span>

                    <h4 className="font-bold text-2xl text-black mb-3">
                      {product.name}
                    </h4>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    {product.price && (
                      <span className="block text-xl font-bold text-black">
                        ${product.price.toFixed(2)} USD
                      </span>
                    )}
                  </div>

                  <div className="pt-8 pb-8 border-b border-gray-200">
                    <div className="max-w-xs">
                      <span className="block text-black font-bold">
                        Product information
                      </span>

                      <div className="flex justify-between mt-4">
                        <span className="text-gray-600">Model name:</span>
                        <span className="text-black">{product.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <div className="sm:flex mb-8">
                      <div className="mb-5 sm:mb-0 sm:mr-6">
                        <span className="block mb-3 font-bold text-black">
                          Quantity
                        </span>
                        <QuantitySelector
                          quantity={quantity}
                          setQuantity={handleQuantityChange}
                        />
                      </div>
                    </div>
                    <button
                      onClick={addToCart}
                      className={`inline-block w-full px-12 py-4 text-center text-black font-bold ${
                        isAdded
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      } transition duration-200 rounded`}
                      disabled={isAdded}
                    >
                      {isAdded ? "Added to Cart" : "Add to Cart"}
                    </button>
                    {isAdded && (
                      <Link
                        href="/cart"
                        className="block mt-4 text-center text-blue-600 hover:underline"
                      >
                        View Cart
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (value: number) => void;
}
function QuantitySelector({ quantity, setQuantity }: QuantitySelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  return (
    <div className="flex items-center border border-gray-300 rounded">
      <button
        className="px-3 py-2 text-lg"
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
      >
        -
      </button>
      <input
        className="w-12 px-2 py-2 text-center bg-transparent outline-none"
        type="number"
        min="1"
        value={quantity}
        onChange={handleChange}
      />
      <button
        className="px-3 py-2 text-lg"
        onClick={() => setQuantity((q) => q + 1)}
      >
        +
      </button>
    </div>
  );
}
