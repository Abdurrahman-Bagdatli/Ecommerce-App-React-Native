import { configureStore } from "@reduxjs/toolkit";
import  cartSlice  from "./features/cart/cartSlice";
import  productSlice  from "./features/product/productSlices";
export default configureStore({
    reducer:{
        cart:cartSlice,
        product:productSlice,
    },
});