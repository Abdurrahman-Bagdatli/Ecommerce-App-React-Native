import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ADD_TO_CART, FETCH_TO_PRODUCT,REMOVE_TO_CART } from '../actions/actionTypes';

const initialState = {
    carts: []
}

const cartReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {...state, carts:[...state?.carts,action.payload]};
        case REMOVE_TO_CART:
            return {...state, carts: state?.carts?.filter(x => x.id !== action.payload)};
        default:
            return state;
    }
}
export default cartReducer;