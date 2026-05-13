import userModel from "../models/User.js";


//function to add to cart
export const addToCart = async(req,res) =>{
  try {
      const userId = req.userId;
     // console.log(userId);
      const {itemId} = req.body;
     // console.log(itemId);

      if(!userId){
         return res.status(400).json({success:false, message:"Unauthorized"})
      }

      const user = await userModel.findById(userId);
      if(!user){
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const userCart = user.cartItems || {};

      if(userCart[itemId]){
        userCart[itemId] += 1
      }else{
        userCart[itemId] = 1
      }

      await userModel.findByIdAndUpdate(userId, { cartItems: userCart });
        res.status(200).json({
          success: true,
          message: "Item added to cart",
          cartData: userCart,
        });

  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, message:"Server error when adding item to cart"})
  }
}

// function update cart
export const updateCart = async (req, res) => {
  try {
    const {itemId, quantity } = req.body;
    const userId = req.userId;

    
      if (!userId) {
        return res
          .status(400)
          .json({ success: false, message: "Unauthorized" });
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      let userCart = user.cartItems || {};
      userCart[itemId] = quantity


    await userModel.findByIdAndUpdate(userId, {cartItems:userCart})
    res.json({success:true, message:'cart updated'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


//function to cart data
export const userCartData = async(req,res) =>{
  try {
      const userId = req.userId;
      const user = await userModel.findById(userId);
      if(!user){
        return res.status(404).json({success:false, message:"User not found"})
      }

      const userData = user.cartItems || {}

      res.status(200).json({success:true, cartItems:userData })
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, message:"Server error when updating cart"})
  }
}


//function to remove cart

export const removeItemFromCart = async(req,res) =>{
   try {
        const { itemId } = req.body;
        const userId = req.userId;

        if (!userId) {
          return res
            .status(400)
            .json({ success: false, message: "Unauthorized" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        let userCart = user.cartItems || {};
         delete userCart[itemId];
  

        await userModel.findByIdAndUpdate(userId, {cartItems:userCart});
        res.status(200).json({success:true, message:"item removed from cart"})
   } catch (error) {
     console.error(error);
     return res
       .status(500)
       .json({ success: false, message: "Server error when removing item from cart" });
   }
}