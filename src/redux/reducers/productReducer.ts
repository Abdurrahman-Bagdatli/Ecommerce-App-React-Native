import {  FETCH_TO_PRODUCT  } from '../actions/actionTypes';
const initialState = {
    products: []
}

const productReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case FETCH_TO_PRODUCT:
            return {...state , products:action?.payload};
        default:
            return state;
    }
}
export default productReducer;