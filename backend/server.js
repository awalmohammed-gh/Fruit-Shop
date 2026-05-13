import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";

//App config
const app = express();
const port = process.env.PORT || 3000;

//Allow multiple origins
const allowedOrigins = ["http://localhost:5175"]

//middleware
app.use(express.json());
app.use(cors({origin:allowedOrigins, credentials:true}));
app.use(cookieParser());


//connect to database
await connectDb()
connectCloudinary()

//api endpoint
app.use('/api/user',userRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)

app.get("/", (req, res) => {
  res.json({
    message: "endpoint is through",
  });
});

//start server
app.listen(port, () => {
  console.log(`start server here http://localhost:${port}`);
});
