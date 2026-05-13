import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/FruitContextApi'
import ProductCard from '../Components/ProductCard';

const AllProducts = () => {

    const {products, searchQuery} = useAppContext();
    const [filterProducts, setFilterProducts] = useState([]);

    useEffect(()=>{
      if(searchQuery.length > 0){
         setFilterProducts(products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
      }else{
        setFilterProducts(products)
      }
    },[products,searchQuery])

  return (
    <div className="mt-16 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col items-end w-max">
        <p className="uppercase text-2xl font-medium">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {/* -------------Product display ----------*/}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 gap-y-6 mt-6">
        {filterProducts
          .filter((item) => item.inStock)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default AllProducts
