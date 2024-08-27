import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../Theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { allDelete } from '../app/features/cart/cartSlice';
import showToast from './ToastUtils';

const Cart = () => {
  const productCount = useSelector(state => state.cart.carts.length);
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{flexDirection: "row"}} onPress={() => { navigation.navigate("Cart") }}>
      <Icon name="shopping-cart" size={25} color={colors.product.buttonColor} />
      <Text style={{fontSize:16}}>{productCount}</Text>
    </TouchableOpacity>
  )
}

const Garbage = () => {
    return(
       
        <Icon name="trash" size={25} color={colors.product.buttonColor} />

    )
}

const BiGgarbage = () => {
  const dispatch = useDispatch();
  const deleteCart = () => {
   dispatch(allDelete())
   showToast("success","cart cleared!")
  }
  const cancelDeleteCart = () => {
    showToast("info","deletion canceled!")
  }
  return(
     <TouchableOpacity onPress={() => Alert.alert("Delete","Delete everything?",[{
      text:"tamam",
      onPress:() => deleteCart()
     },{
      text:"cancel",
      onPress: () => {cancelDeleteCart()}
      
     }])}>
      <Icon name="trash-alt" size={25} color={colors.product.buttonColor} style={{padding:10}}/>
      </TouchableOpacity>
      

  )
}

export {Cart,Garbage,BiGgarbage};

