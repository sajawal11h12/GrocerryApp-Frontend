import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native';
import grocery from "../assets/grocery.png";
const WELCOMESCREEN=({navigation})=> {
  return (
    <View style={styles.container}>
      <Text style={styles.txt1}>
        Welcome!
      </Text>

      <View>
      <Image style={styles.img} source={grocery}/>
      </View>

      

      <View  style={styles.headbtn}>

     
      <View>
      <TouchableOpacity onPress={()=>navigation.navigate('login')}>
        <Text style={styles.btn}>LogIn</Text>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity  >
        <Text onPress={()=>navigation.navigate('signupscreen')} style={styles.btn}>SignUp</Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>


   
     );
    }
    const styles=StyleSheet.create({
container:{
backgroundColor:'darkorange',
height:'100%',width:'100%'
},
txt1:{
  color:'black',
  fontStyle:"italic",
  textAlign:'center',
  height:'40',
  marginTop:'20%',
  fontSize:60,
  fontWeight:'200',
  
},
img:{
  height:300,
  width:300,
  marginTop:250,
  marginLeft:50,
  
},


headbtn:{
  flexDirection:'row',
 
  justifyContent:'space-evenly',
  marginTop:40
},
btn:{
  color:'darkorange',
  fontSize:15,
  padding:5,
  backgroundColor:'black',
 
  borderColor:'white',
  borderRadius:10,
  paddingVertical:10,
  paddingHorizontal:25,
  elevation:10
}
    })
 

export default WELCOMESCREEN;