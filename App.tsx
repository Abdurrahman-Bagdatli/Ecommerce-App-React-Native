import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ProductScreen from './src/pages/ProductScreen';
import CartScreen from './src/pages/CartScreen';
import ProductDetailScreen from './src/pages/ProductDetailScreen';
import { Provider } from 'react-redux';
import store from './src/app/store';
import Title from "./src/components/Title"
import { BiGgarbage, Cart } from './src/components/Icon';
import Toast from 'react-native-toast-message';
const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="product" component={ProductScreen} options={{headerShown:true, headerTitle:() => <Title></Title>,headerRight: () => <Cart></Cart>}}></Stack.Screen>
        <Stack.Screen name="Cart" component={CartScreen} options={{headerRight:() => <BiGgarbage></BiGgarbage>}}></Stack.Screen>
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  <Toast></Toast>
    </Provider>
  )
}

const styles = StyleSheet.create({})