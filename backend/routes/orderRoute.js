import express from "express";
import { allUserOrders, placeOrder, updateStatus, usersOrder } from "../controller/orderController.js";
import { usersAuth } from "../middleware/userAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place-order",usersAuth ,placeOrder)
orderRouter.get("/user-order",usersAuth ,usersOrder)
orderRouter.get("/all-order" ,allUserOrders)
orderRouter.post("/update-status" ,updateStatus)

export default orderRouter;