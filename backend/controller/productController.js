import {v2 as cloudinary} from "cloudinary"
import Products from "../models/product.js"


//function to add product
export const addProduct = async (req,res) =>{
    try {
        
        const {name, description, category, price, offerPrice, inStock} = req.body

        const images = req.files || [];
        //console.log(images);

        let imagesUrl = await Promise.all(
            images.map(async(image)=>{
                let result = await cloudinary.uploader.upload(image.path, {resource_type:"image"})
                return result.secure_url;
            })
        )

       // console.log(imagesUrl);

      const products = new Products({
        name,
        description,
        category,
        price,
        offerPrice,
        inStock: inStock === "true",
        image:imagesUrl
      });

      await products.save();
      res.status(200).json({success:true, message:"product added"})

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error})
    }
}



//function to get product list
export const productList = async (req,res) =>{
   try {
    
    const allProduct = await Products.find({});
    res.status(200).json({success:true, message:"all product retrieved", products: allProduct})
   } catch (error) {
    console.log(error);
   }
}



//function to get single product
export const singleProduct = async (req,res) =>{
  try {
    
    const {id} = req.body;

    const singlePro = await Products.findById(id)
    res
      .status(200)
      .json({
        success: true,
        message: "all product retrieved",
        products: singlePro,
      });

  } catch (error) {
    console.log(error);
  }
}


//function to change stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    await Products.findByIdAndUpdate(id, {
      inStock: inStock,
    });

    res.status(200).json({
      success: true,
      message: "stock updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//function to remove product

export const removeProduct = async (req,res) =>{
    try {

      const {id} = req.params;
      if(!id){
        return res.status(400).json({success:false, message:"product Id not found"})
      }

        await Products.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
}