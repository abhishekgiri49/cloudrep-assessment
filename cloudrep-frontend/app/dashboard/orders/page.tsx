"use client";

import AuthenticatedCall from "@/src/apiService/AuthenticatedCall";
import { useEffect, useState } from "react";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    minPrice: "",
    maxPrice: "",
    productName: "",
  });

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, filters]);

  const getOrders = async () => {
    await AuthenticatedCall({
      method: "GET",
      url: "/sales",
    })
      .then((res) => {
        // console.log(res.data);

        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    // Start with all orders
    let results = [];
    console.log("here");
    // Manual filtering without array methods
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      let include = true;
      // console.log(i);
      // console.log(filters);

      // Date range filter
      if (filters.dateFrom) {
        const orderDate = new Date(order.saleDate).getTime();
        const filterDate = new Date(filters.dateFrom).getTime();
        if (orderDate < filterDate) {
          include = false;
        }
      }

      if (include && filters.dateTo) {
        const orderDate = new Date(order.saleDate).getTime();
        const filterDate = new Date(filters.dateTo).getTime() + 86400000; // Add 1 day to include the entire day
        if (orderDate > filterDate) {
          include = false;
        }
      }
      // console.log(include);
      // Price range filter
      if (include && filters.minPrice) {
        const minPrice = parseFloat(filters.minPrice);
        if (order.totalPrice < minPrice) {
          include = false;
        }
      }

      if (include && filters.maxPrice) {
        const maxPrice = parseFloat(filters.maxPrice);
        if (order.totalPrice > maxPrice) {
          include = false;
        }
      }

      // Product name filter
      if (include && filters.productName) {
        let foundProduct = false;
        // console.log(filters);
        // Check each product in the order
        for (let j = 0; j < order.products.length; j++) {
          const product = order.products[j];
          // console.log(product);
          if (
            product.name
              .toLowerCase()
              .includes(filters.productName.toLowerCase())
          ) {
            foundProduct = true;
            break;
          }
        }
        // console.log(foundProduct);
        include = foundProduct;
      }

      if (include) {
        results.push(order);
      }
    }
    // console.log(results);
    setFilteredOrders(results);
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      minPrice: "",
      maxPrice: "",
      productName: "",
    });
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Orders</h1>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min="0"
              step="0.01"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={filters.productName}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Search by product name"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Products
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {moment(order.saleDate).format("LLL")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {order.products.map((product: any) => (
                          <span
                            key={product._id}
                            className="bg-gray-100 px-2 py-1 rounded text-xs"
                            title={`${product.name} (${product.quantity}x)`}
                          >
                            {product.name.substring(0, 15)}
                            {product.name.length > 15 ? "..." : ""}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-lg text-sm font-medium transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No orders found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
