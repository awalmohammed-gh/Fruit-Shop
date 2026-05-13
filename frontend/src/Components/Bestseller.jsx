import { useAppContext } from "../Context/FruitContextApi"
import ProductCard from "./ProductCard"



const Bestseller = () => {
    const {products} = useAppContext()
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-semibold tracking-wider">Best Sellers</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 md:gap-6 gap-y-6 mt-6">
        {products.filter((product) => product.inStock).slice(4,8).map((product,index) =>(
             <ProductCard product={product} key={index} />
        ))}
       
      </div>
    </div>
  );
}

export default Bestseller
