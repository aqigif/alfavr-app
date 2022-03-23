/* This example requires Tailwind CSS v2.0+ */

import { useState } from "react";
import ProductItem from "../../../components/product_item";

const products = [
  {
    name: "Coca Cola",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimage%2Fvector-motion-graphics-8.gif&f=1&nofb=1",
  },
  {
    name: "Coca Cola",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimage%2Fvector-motion-graphics-8.gif&f=1&nofb=1",
  },
  {
    name: "Coca Cola",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimage%2Fvector-motion-graphics-8.gif&f=1&nofb=1",
  },
  {
    name: "Coca Cola",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimage%2Fvector-motion-graphics-8.gif&f=1&nofb=1",
  },
  {
    name: "Coca Cola",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimage%2Fvector-motion-graphics-8.gif&f=1&nofb=1",
  },
  {
    name: "Coca Cola",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimage%2Fvector-motion-graphics-8.gif&f=1&nofb=1",
  },
  {
    name: "Coca Cola",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimage%2Fvector-motion-graphics-8.gif&f=1&nofb=1",
  },
  {
    name: "Coca Cola",
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimage%2Fvector-motion-graphics-8.gif&f=1&nofb=1",
  },
];

export default function DrinkMenuContent({ onClose }) {
  return (
    <div>
      <ul
        // role="list"
        className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-3 sm:gap-x-2 lg:grid-cols-4 xl:gap-x-8"
      >
        {products.map((product, index) => (
          <ProductItem product={product} index={product} />
        ))}
      </ul>
    </div>
  );
}
