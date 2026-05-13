import express from "express"
import { sellerLogin,sellerLogout,isSellerAuth, sellerData } from "../controller/sellerController.js"
import authSeller from "../middleware/authSeller.js";

const sellerRouter = express.Router();

sellerRouter.post('/seller-login', sellerLogin)
sellerRouter.get('/is-seller-auth',authSeller, isSellerAuth)
sellerRouter.post('/seller-logout',sellerLogout)
sellerRouter.get('/seller-data',authSeller,sellerData)

export default sellerRouter;