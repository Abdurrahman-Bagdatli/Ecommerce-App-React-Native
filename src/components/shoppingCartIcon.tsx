import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
export default function shoppingCartIcon() {
  const myIcon = <Icon name="rocket" size={30} color="#900" />;
  return (
    <TouchableOpacity>
        <Animated.View>
            <Text>{myIcon}</Text>
        </Animated.View>
       
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})