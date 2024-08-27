import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [],
  };
  
export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addProduct:(state,action) => {
           const newProduct = state.carts.find(item => item.id === action.payload.id)
           if(newProduct){
            newProduct.number++
            newProduct.lastPrice = newProduct.price * newProduct.number;
           }
           else{
            state.carts.push({ ...action.payload, number: 1 ,lastPrice :action.payload.price})
           }
        },
        plusPressed: (state, action) => {
            const productId = action.payload.id;
            const product = state.carts.find(item => item.id === productId);
            if (product && product.number < 20) {
              product.number++;
              product.lastPrice = product.price * product.number;
            }
           
          },
          minusPressed: (state, action) => {
            const productId = action.payload.id;
            const product = state.carts.find(item => item.id === productId);
            if (product && product.number > 0) {
              product.number--;
            }
            if (product && product.number < 1){
             state.carts= state.carts.filter(item => item.id !== action.payload.id)
            }
            product.lastPrice = product.price * product.number 
          },
          garbageePressed: (state, action) => {
            const productId = action.payload.id;
            state.carts = state.carts.filter(item => item.id !== productId);
          
          },
          allDelete: (state) => {
            state.carts = [];
        },


          }
        }
);

export const {addProduct, plusPressed, minusPressed,garbageePressed,allDelete} = cartSlice.actions;
export default cartSlice.reducer;


