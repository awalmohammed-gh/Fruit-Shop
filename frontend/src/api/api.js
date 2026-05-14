import { api } from "./axios";

//product
export const addProduct = (data) => {
  return api.post("/product/add-product", data);
};

export const productList = () => {
  return api.get("/product/list-product");
};

export const stockChange = (data) => {
  return api.post("/product/change-stock", data);
};

export const removeProduct = (id) => {
  return api.delete(`/product/remove-product/${id}`);
};

//authentication
export const sellerLogin = (data) => {
  return api.post("/seller/seller-login", data);
};

export const sellerAuth = () => {
  return api.get("/is-seller-auth");
};

export const userRegister = (data) => {
  return api.post("/user/register", data);
};

export const userLogin = (data) => {
  return api.post("/user/login", data);
};

export const userData = () => {
  return api.get("/user/user-data");
};

export const userAuth = () => {
  return api.get("/user/is-auth");
};

//seller
export const sellerLogout = () => {
  return api.post("/seller/seller-logout");
};


//cart
export const addItemToCart = (data) =>{
  return api.post("/cart/add-to-cart", data);
}


export const cartData = () =>{
  return api.get("/cart/cart-data");
}


export const removeCart = (data) =>{
  return api.post("/cart/remove-cart",data);
}


export const updateCart = (data) =>{
  return api.post("/cart/update-cart",data);
}


//address
export const createAddress = (data) =>{
   return api.post("/address/add-address", data);
}

export const getAddress = () =>{
   return api.get("/address/get-address");
}