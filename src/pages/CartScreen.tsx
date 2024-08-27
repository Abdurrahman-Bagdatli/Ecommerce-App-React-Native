import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView,Dimensions, Alert } from 'react-native'
import React, { startTransition, useEffect, useState } from 'react'
import { IProductResponse } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_TO_CART, FETCH_TO_PRODUCT } from '../redux/actions/actionTypes';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../Theme/colors';
import { Garbage } from '../components/Icon';
import { plusPressed,minusPressed, garbageePressed, allDelete,  } from '../app/features/cart/cartSlice';
import { Screen } from 'react-native-screens';
import Toast from 'react-native-toast-message'
import showToast from '../components/ToastUtils';

export default function ProductScreen() {

  const screenWidth = Dimensions.get("window").width;
  const nagivation = useNavigation();
  const dispatch = useDispatch();

  const number = useSelector(state => state?.cart.carts?.number)
  /* Redux store'daki state'in belirli bir parçasını alır 
     ve bu parçayı bileşeninizde kullanmanızı sağlar.       */
  const product = useSelector(state => state?.cart.carts)
  const [Money,setMoney] = useState(0);
  const price = () => {
    const productPrice = product?.price
    
    const currentPrice = productPrice * number;
    return currentPrice;
  }
  const plusPress = (id) => {
    dispatch(plusPressed({id}))
   
  }
  const AlertBuyAll = () => {
    if(product.length > 0)
    {
    Alert.alert("Successful","Your purchase has been completed successfully!",[
      {
        text:"Okey",
        onPress:() => {
          dispatch(allDelete())
          showToast("success","Thank you for shopping!")
        }
      }
    ])
  }
  else{
    Alert.alert("error","To purchase, you must first put the product in your cart",[
      {
        text:"Okey",
        onPress:() => {
        showToast("error","Purchase could not be made!")
        }
      }
    ])
  }
    
    
  }
  const minusPress = (id) => {
    dispatch(minusPressed({id}))
  }
  const garbagePress = (id) => {
    dispatch(garbageePressed({id}));
    showToast("success","Your product has been deleted!")
  };
  const cartProducts = useSelector(state => state?.cart?.carts);
  const totalMoney = () => {
    let totalPrice = 0;
    cartProducts.forEach(product => {
      totalPrice += product.lastPrice;
    });
    const formattedAmount = totalPrice.toFixed(2);
    const formattedPrice = formattedAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return formattedPrice;
  }

  const numberRole= (item) => {
   if(item.number === 20)
    {
      showToast("error","You've reached the limit!")
      return item.number;
    }
    else{
      return item.number;
  }
  }
  return (
    <View style={styles.container}>
      <FlatList<IProductResponse>
        data={product}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => { nagivation.navigate("ProductDetail", { products: item }) }}>
              <View style={styles.productContainer}>

                <Image source={{ uri: item?.image }} style={styles.thumbnail} resizeMode="contain"></Image>


                <View style={styles.productText}>
                  <Text numberOfLines={4} textBreakStrategy="highQuality" style={styles.titleText}>{item?.title}</Text>
                  <Text style={styles.categoryText}> by {item?.category}</Text>
                  <Text >{item?.price} USD</Text>
                </View>
               
                <View style={styles.productAmount}>
                  <TouchableOpacity onPress={() => minusPress(item.id)} style={styles.minusButton}><Text style={styles.minus}>-</Text></TouchableOpacity>
                  <Text style={styles.number}>{numberRole(item)} </Text>
                  <TouchableOpacity onPress={() => plusPress(item.id)} style={styles.plusButton}><Text style={styles.plus}>+</Text></TouchableOpacity>
                  <View style={styles.garbage}>
                  <TouchableOpacity onPress={() => garbagePress(item.id)}>
                  <Garbage></Garbage>
                 
                  </TouchableOpacity>
                </View>
                </View>
                   
       
              </View>
            </TouchableOpacity>
          );
        }}>

      </FlatList>
      <View style={styles.sellContainer}>
        <Text>{totalMoney()} USD</Text>
        <TouchableOpacity style={styles.sellButton} onPress={AlertBuyAll}>
          <Text style={{color:"white"}}>Buy All</Text>
          </TouchableOpacity>
      </View>     

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    borderRadius: 30,
    backgroundColor: colors.background,

  },
  productContainer: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.product.border,
    borderRadius: 30,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "white"


  },
  titleContainer: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    padding: 10,

  },
  firstTitle: {
    fontWeight: "700",
    fontSize: 20,
    fontStyle: "italic"


  },
  secondTitle: {
    fontWeight: "500",
    fontSize: 20,
    fontStyle: "italic"
  },
  thumbnail: {
    flex:2,
    width: 110,
    height: 150,
    borderRadius: 17,
    borderWidth: 1,

    padding: 10
  },
  productText: {
    flex:3,
    paddingLeft: 10,
    

  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    width: 124,
    flexShrink: 1,

  },
  categoryText: {
    paddingTop: 15,
    fontSize: 13
  },
  addButton: {
    paddingHorizontal: 5,
    paddingVertical: 2,

  },
  addButtonText: {
    color: "white"
  },
  productAmount: {
    flex:1,
    flexDirection: "column",
    alignItems: "center",

   
  },
  minus:{
   fontWeight:"400",
   fontSize:25,
  },
  plus:{
    fontWeight:"400",
    fontSize:25
  },
  number:{
    flex :1,
    fontWeight:"400",
    fontSize:20,
    marginBottom:0,
    paddingVertical:6,
  },
  garbage:{
    flex :2,
    justifyContent:"flex-end",
  
  },
  minusButton:{
    flex :1,
    borderRadius:23,
    paddingHorizontal:13,
    backgroundColor:"#f0f0f0",
    
    alignItems:"center",

   
    
  },
  plusButton:{
    flex :1,
    backgroundColor:"#1e90ff",
    alignItems:"center",
    borderRadius:23,
    paddingHorizontal:11,

  },
  sellContainer:{
    backgroundColor:"#f0f0f0",
    height:"16%",
    borderRadius:30,
    justifyContent:"center",
    alignItems:"center"
  },
  sellButton:{

    backgroundColor:colors.product.buttonColor,
    padding:10,
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center",
    left:"38%",
    bottom:"22%",
  }
  

})