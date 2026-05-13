import express from "express"
import { addToCart, removeItemFromCart, updateCart, userCartData } from "../controller/cartController.js"
import { usersAuth } from "../middleware/userAuth.js";

const cartRouter = express.Router();

cartRouter.post("/update-cart",usersAuth, updateCart);
cartRouter.post("/add-to-cart",usersAuth, addToCart);
cartRouter.post("/update-cart",usersAuth, updateCart);
cartRouter.get("/cart-data",usersAuth, userCartData);
cartRouter.post("/remove-cart",usersAuth, removeItemFromCart);

export default cartRouter;