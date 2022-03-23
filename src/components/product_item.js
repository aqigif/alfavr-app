import { useState } from "react";

export default function ProductItem({ product, index }) {
  const [cartTotal, setCartTotal] = useState(0);

  const handleCart = (target) => () => {
    let newCartTotal = cartTotal;
    if (target === "add") {
      newCartTotal = newCartTotal + 1;
      setCartTotal(newCartTotal);
    } else {
      newCartTotal = newCartTotal - 1;
      setCartTotal(newCartTotal);
    }
  };
  return (
    <li
      key={index}
      className={`relative cursor-pointer p-2`}
      style={{
        borderRadius: 4,
      }}
    >
      <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
        <img
          src={product.imageUrl}
          alt=""
          className="object-cover pointer-events-none group-hover:opacity-75"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 5,
        }}
      >
        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
          {product.name}
        </p>
        <div
          style={{
            display: "flex",
            // padding: 5,
            alignItems: "center",
          }}
        >
          <button
            onClick={handleCart("delete")}
            disabled={cartTotal === 0}
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
          >
            -
          </button>
          <p>{cartTotal}</p>
          <button
            onClick={handleCart("add")}
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}
