import express from "express";
import { addAddress, getAddresses } from "../controller/addressController.js";
import { usersAuth } from "../middleware/userAuth.js";

const addressRouter = express.Router();

addressRouter.get("/get-address",usersAuth, getAddresses)
addressRouter.post("/add-address",usersAuth, addAddress)

export default addressRouter