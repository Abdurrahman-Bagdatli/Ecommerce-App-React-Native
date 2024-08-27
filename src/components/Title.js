import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Title() {
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.firstTitle}>E </Text>
                <Text style={styles.secondTitle}>Commerce</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",

    
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
})