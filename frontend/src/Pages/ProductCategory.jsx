import { useParams } from "react-router-dom";
import { useAppContext } from "../Context/FruitContextApi"
import { categories } from "../assets/assets";
import ProductCard from "../Components/ProductCard";



const ProductCategory = () => {
    const {products} = useAppContext();
    const {category} = useParams();

    const searchCategory = categories.find((item) => item.path.toLowerCase() === category);
    const filterProducts = products.filter((product) => product.category.toLowerCase() === category);
    

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium">
            {searchCategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}

      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 gap-y-6 mt-6">
          {filterProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
            <p className="text-2xl font-medium text-primary">No Product Found in this category</p>
        </div>
      )}
    </div>
  );
}

export default ProductCategory
