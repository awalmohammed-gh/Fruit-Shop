import express from "express"
import { addProduct,singleProduct,productList,changeStock,removeProduct } from "../controller/productController.js"
import { upload } from "../middleware/multer.js";
import authSeller from "../middleware/authSeller.js";


const productRouter = express.Router();

productRouter.post("/add-product",upload.array("images",10), authSeller,addProduct)
productRouter.get("/list-product", productList)
productRouter.get("/single-product", singleProduct)
productRouter.post("/change-stock",authSeller, changeStock)
productRouter.delete("/remove-product/:id",authSeller, removeProduct)


export default productRouter;