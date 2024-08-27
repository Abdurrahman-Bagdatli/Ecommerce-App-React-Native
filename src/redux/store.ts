import {combineReducers, legacy_createStore} from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";

const store = legacy_createStore(
    combineReducers // <= eğer birden fazla reducers kullanıyorsan bunu kullanıcaksın.
    ({
    cart:cartReducer,
    product:productReducer,
}),
)

export default store;