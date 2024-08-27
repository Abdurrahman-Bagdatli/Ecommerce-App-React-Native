import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../Theme/colors';

export default function ProductDetailScreen() {
  const route = useRoute();
  const { products } = route.params;
  
  const nagivation=useNavigation();

  const intRating = Math.round(parseFloat(products.rating.rate));
  const stars = [];
  const halfStarts = 5 - intRating;
  const starsRating =() => {
  
   for (let index = 0; index < intRating; index++) {
    stars.push("★");
     
   }
   for (let index = 0; index < halfStarts; index++) {
    stars.push("☆");
    
   }
   return(  <Text>{stars}</Text>)
 
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: products.image }} style={styles.image} resizeMode="contain"></Image>
      </View>
      <View style={styles.infoContainer}>
       <View style={styles.starsContainer}>
          {starsRating()}
       </View>
       <View style={{flexDirection:"row",justifyContent:"center"}}>
            <View style={styles.productText}>

              <Text style={styles.heading}>Category: </Text>
              <Text>{products.category}</Text>

            </View>
            <View style={styles.productText}>

              <Text style={styles.heading}>Rating: </Text>
              <Text>{products.rating.rate.toString()}</Text>

            </View>
        </View>
        <View style={styles.productText}>

          <Text style={styles.heading}>Title: </Text>
          <Text>{products.title}</Text>

        </View>
        <View style={styles.productText}>

          <Text numberOfLines={4}>{<Text style={styles.heading}>Description: </Text>} {products.description}</Text>

        </View>
        <View style={styles.productText}>
          <Text style={styles.heading}>Price: </Text>
          <Text>{products.price} dolar</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {nagivation.goBack()} }>
          <Text style={styles.buttonText} >Return to store</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex:6,
  },
  imageContainer:{
    alignItems:"center",
    justifyContent:"center",
   paddingHorizontal:3,
   width:"100%",
   height:"50%",
   flex:3,
  },
  infoContainer:{
   flex:2,
   width:"100%",
   height:"100%",
  },
  buttonContainer:{
    flex:1,
    borderWidth:0,
    justifyContent: 'flex-end',
    },
  starsContainer:{
    justifyContent:"center",
    alignItems:"center",
    paddingVertical:4,
  },
  image:{
    width:"70%",
    height:"100%",
    borderRadius:15,
    borderWidth:1,
    backgroundColor:"white"
  },
  productText: {
    flexDirection: "row",
    padding: 5

  },
  heading: {
   fontSize:15,
   fontWeight:"600"
  },
  button:{
   borderWidth:1,
   borderRadius:12,
   width:"100%",
   height:"40%",
   justifyContent:"center",
   alignItems:"center",
   backgroundColor:"#FF6347",
   
  },
  buttonText:{
  color:"white",
  fontSize:15,
  },
});
