import React from 'react'
import MainBanner from '../Components/MainBanner'
import Categories from '../Components/Categories'
import Bestseller from '../Components/Bestseller'
import BottomBanner from '../Components/BottomBanner'
import Newsletter from '../Components/Newsletter'

const Home = () => {
  return (
    <div className="">
      <MainBanner />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10 ">
        <Categories />
        <Bestseller />
      </div>
      <BottomBanner />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <Newsletter />
      </div>
    </div>
  );
}

export default Home
