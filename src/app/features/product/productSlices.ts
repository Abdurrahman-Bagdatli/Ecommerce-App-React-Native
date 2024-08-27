import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { resetCache } from "../../../../metro.config";

export const fetchProduct = createAsyncThunk("fetchProduct",async () => {
    const reponse = await fetch("https://fakestoreapi.com/products");
    const data = await reponse?.json();
    return data;
})

export const productSlice = createSlice({
    name:"product",
    initialState:{products: [], loading:false,errorMesage:" ",count:3
        },
        reducers:{},
        extraReducers: builder => {
            builder
            .addCase(fetchProduct.pending,state => {
                // 1 Askıya alınmışsa yani beklemede ise istek bu çalısır
                state.loading = true;
                state.errorMesage = "";
            })
            .addCase(fetchProduct.rejected,(state,action) => {
                // 2 istek reddedildiyse
                state.loading = false;
                state.products = [];
                state.errorMesage = action.error.message || "";
            })
            .addCase(fetchProduct.fulfilled, (state,action)  => {
                // 3 istek kabul edildiyse
                state.loading=false;
                state.products=action.payload;
                state.count = action.payload.length;
            })
       
        }
});


export default productSlice.reducer;