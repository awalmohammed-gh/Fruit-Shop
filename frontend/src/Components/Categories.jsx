import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../Context/FruitContextApi";

const Categories = () => {

    const {navigate }= useAppContext()

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl">Categories</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 text-center md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 mt-6 gap-6 gap-y-8">
        {categories.map((category, index) => (
          <div
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="group cursor-pointer py-4 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
            style={{ backgroundColor:category.bgColor }}
          >
            <img
              className="group-hover:scale-108 transition max-w-28"
              src={category.image}
              alt={category.text}
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
