import { StatusBar, Image } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { Ionicons } from '@expo/vector-icons';

const Headie = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView style={{ height: 300, width: 300, top: -30 }} source={require('../assets/Userauthentication.json')} autoPlay loop />
      <StatusBar style="auto" />

      <View>
        <Text style={{ color: "white", fontSize: 20, top: 40, fontWeight: "100" }}>User authentication!</Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('welcome')}>
          <Text style={styles.btn}>next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Headie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkslategrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    top: 160,
    fontSize: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 30
  }
});
