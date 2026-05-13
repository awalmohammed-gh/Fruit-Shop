import { useState } from "react";
import { useAppContext } from "../Context/FruitContextApi";
import { FaStar } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, navigate, cartItems } =
    useAppContext();
  const [rating, setRating] = useState(0);

  let numOfStar = 5;

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`,
          );
          window.scrollTo(0, 0);
        }}
        className="border border-gray-200 rounded-lg px-3 py-3 bg-white w-full max-w-64 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      >
        <div className="group flex items-center justify-center p-4">
          <img
            className="group-hover:scale-105 transition-transform duration-300 h-32 w-32 object-contain"
            src={product.image?.[0]}
            alt={product.name}
          />
        </div>
        <div className="mt-2">
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            {product.category}
          </p>
          <p className="text-gray-800 font-semibold text-base truncate mt-1">
            {product.name}
          </p>

          {/* Rating Stars */}
          <div className="flex items-center gap-0.5 mt-2">
            {[...Array(numOfStar)].map((_, index) => {
              return (
                <FaStar
                  onClick={(e) => {
                    e.stopPropagation();
                    setRating(index);
                  }}
                  size={14}
                  key={index}
                  className={`${
                    index <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              );
            })}
          </div>

          {/* Price and Cart */}
          <div className="flex items-end justify-between mt-3">
            <div>
              <p className="text-lg font-bold text-primary">
                {currency}
                {product.offerPrice}
              </p>
              <p className="text-xs text-gray-400 line-through">
                {currency}
                {product.price}
              </p>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/40 px-3 py-1.5 rounded-md text-primary cursor-pointer transition-colors duration-200"
                  onClick={() => addToCart(product._id)}
                >
                  <ShoppingCart size={16} />
                  <span className="text-sm font-medium">Add</span>
                </button>
              ) : (
                <div className="flex items-center justify-between gap-2 px-2 py-1 bg-primary/15 rounded-md min-w-[88px]">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer text-primary font-bold px-2 py-1 hover:bg-primary/20 rounded transition-colors"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold text-primary">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer text-primary font-bold px-2 py-1 hover:bg-primary/20 rounded transition-colors"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
