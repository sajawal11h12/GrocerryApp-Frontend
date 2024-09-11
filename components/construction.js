import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Practice = () => {
  return (
    <View style={styles.container}>
      <Text>Practice</Text>
      <LottieView 
        style={{ height: 500, width: 300 }} 
        source={require("../assets/securityicon2.json")} 
        autoPlay 
        loop 
      />
    </View>
  )
}

export default Practice

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
