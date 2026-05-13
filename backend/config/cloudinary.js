import {v2 as cloudinary} from "cloudinary";

const connectCloudinary = async () =>{
    try {
         cloudinary.config({
           cloud_name: process.env.CLOUD_NAME,
           api_key: process.env.CLOUD_API,
           api_secret: process.env.CLOUD_SECRET_KEY,
         });
         console.log("cloudinary database is connected");
    } catch (error) {
        console.log("error connecting cloudinary ", error);
    }
}

export default connectCloudinary