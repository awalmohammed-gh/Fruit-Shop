import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

const MainBanner = () => {
  return (
    <div className="relative">
      {/* Banner Images */}
      <img
        src={assets.mainB}
        className="w-full hidden sm:block md:h-[60vh] lg:h-[70vh] object-cover"
        alt="Fresh fruits banner"
      />
      <img
        src={assets.main_banner_bg_sm}
        className="w-full block sm:hidden h-[50vh] object-cover"
        alt="Fresh fruits banner"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center md:text-left leading-tight drop-shadow-lg">
            Hey there, welcome to Fruit Bay
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 text-center md:text-left mt-4 max-w-xl drop-shadow">
            We're all about bringing you the freshest, juiciest fruits with zero
            hassle. Pick your favorites and enjoy the goodness, anytime.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-8">
            <Link
              to="/products"
              className="group flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-primary hover:bg-primary/90 transition rounded-lg text-white font-medium text-base md:text-lg cursor-pointer w-full sm:w-auto"
            >
              Shop Now
              <MoveRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/products"
              className="group flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition rounded-lg text-white font-medium text-base md:text-lg cursor-pointer w-full sm:w-auto"
            >
              Explore deals
              <MoveRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
