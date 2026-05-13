import React, { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useEffect } from "react";
import { Trash2, Upload } from "lucide-react";
import { addProduct } from "../../api/api";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [preview, setPreview] = useState([null, null, null, null]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  useEffect(() => {
    const urls = images.map((image) =>
      image ? URL.createObjectURL(image) : null,
    );
    setPreview(urls);

    return () => {
      urls.forEach((img) => {
        if (img) {
          URL.revokeObjectURL(img);
        }
      });
    };
  }, [images]);

  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      e.preventDefault();
      const formData = new FormData();

      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("category", category);
      formData.append("price", productPrice);
      formData.append("offerPrice", offerPrice);

      images.forEach((image) => {
        if (image) {
          formData.append(`images`, image);
        }
      });

      const { data } = await addProduct(formData);
      if (data.success) {
        toast.success(data.message);
        setCategory("");
        setProductName("");
        setProductDescription("");
        setOfferPrice(0);
        setProductPrice(0);
        setImages([null, null, null, null]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }finally{
      setLoading(false)
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
        {/* Image Upload */}
        <div>
          <p className="text-base font-medium mb-4">Product Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((_, index) => (
              <div key={index}>
                {preview[index] ? (
                  <div className="relative group aspect-square">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={preview[index]}
                      alt="upload"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-opacity duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label
                    className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg aspect-square cursor-pointer hover:border-primary transition-colors"
                    htmlFor={`image${index}`}
                  >
                    <div className="flex flex-col justify-center items-center gap-2">
                      <Upload className="text-gray-400" size={24} />
                      <p className="text-xs text-gray-500">Upload</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id={`image${index}`}
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">Upload up to 4 images</p>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="product-name" className="text-sm font-medium">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-primary transition-colors"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-2">
          <label htmlFor="product-description" className="text-sm font-medium">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-primary transition-colors"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="product-price" className="text-sm font-medium">
              Product Price (GHS)
            </label>
            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-primary transition-colors"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="offer-price" className="text-sm font-medium">
              Offer Price (GHS)
            </label>
            <input
              id="offer-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
