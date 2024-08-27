import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { IProductResponse } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_TO_PRODUCT } from '../redux/actions/actionTypes';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import colors from '../Theme/colors';
import { fetchProduct } from '../app/features/product/productSlices';
import MyIcon from '../components/MyIcon';
import { addProduct } from '../app/features/cart/cartSlice';
import showToast from '../components/ToastUtils';
export default function ProductScreen() {

  const nagivation = useNavigation();

  // Redux store erişim sağlar ve action u tetikleyebiliriz
  const dispatch = useDispatch();

  /* Redux store'daki state'in belirli bir parçasını alır 
     ve bu parçayı bileşeninizde kullanmanızı sağlar.       */
  const products = useSelector(state => state?.product.products)
  const productLoading = useSelector(state => state?.product.loading)
  /*   useEffect(() => {
      fetch("https://fakestoreapi.com/products").then(Response => Response.json()).then
        ((payload: IProductResponse) => { dispatch({ type: FETCH_TO_PRODUCT, payload }) }).catch
        (error => console.error("error", error));
  
    }, [dispatch]) */

  useEffect(() => {

    dispatch(fetchProduct())


  }, [dispatch])


  const verekle = (data) => {
    const info = {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.image,
      rating: data.rating,
    }
    dispatch(addProduct(info))

    showToast("success", "Your product has been added!")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Indicator} pointerEvents='none'>
        {productLoading && <ActivityIndicator size="large"></ActivityIndicator>}
      </View>



      <FlatList<IProductResponse>
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => { nagivation.navigate("ProductDetail", { products: item }) }}>
              <View style={styles.productContainer}>

                <Image source={{ uri: item?.image }} style={styles.thumbnail} resizeMode="contain"></Image>


                <View style={styles.productText}>
                  <Text numberOfLines={4} textBreakStrategy="highQuality" style={styles.titleText}>{item?.title}</Text>
                  <Text style={styles.categoryText}> by {item?.category}</Text>
                </View>
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity onPress={() => verekle(item)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}>

      </FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    left: 24

  },
  iconContainer: {
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    left: 10,
  },
  Navbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",

  },
  Indicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
    width: 110,
    height: 150,
    borderRadius: 17,
    borderWidth: 1,

    padding: 10
  },
  productText: {
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
  addButtonContainer: {
    position: "absolute",
    backgroundColor: colors.product.buttonColor,
    borderRadius: 10,
    padding: 3,
    top: 125,
    right: 20
  },
  addButton: {
    paddingHorizontal: 5,
    paddingVertical: 2,

  },
  addButtonText: {
    color: "white"
  }

})