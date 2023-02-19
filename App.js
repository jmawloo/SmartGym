import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import Machine from './Machine';
import Tutorial from './Tutorial';

//Navigation import
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screen One
const WelcomePage = props => {

  //onPress To Navigate
  const onPress = () => {
    props.navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('./assets/SmartGymLogo.png')}/>
      <Text style={styles.welcomeTitle}>SmartGym</Text>
      <TouchableOpacity style={styles.nextButton}onPress={onPress}>
        <Text style={styles.submitText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const hueGreen = '#3CE700';
//Screen Two
const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.sectionText}>Welcome to SmartGym</Text>
      <Tutorial text={'We collect gym data for you!'} image={require('./assets/Sparkle.png')}/>
      <Text style={styles.sectionText}>Activities</Text>
      <Machine text={'Leg Press'} image={require('./assets/LegPress.png')} statusColor={'red'}/>
      <Machine text={'Squat Rack'} image={require('./assets/SquatRack.png')} statusColor={hueGreen}/>
      <Machine text={'Treadmill'} image={require('./assets/Treadmill.png')} statusColor={hueGreen}/>
      <Machine text={'Stationary Bike'} image={require('./assets/StationaryBike.png')} statusColor={hueGreen}/>
      <Machine text={'Seated Row'} image={require('./assets/SeatedRow.png')} statusColor={hueGreen}/>

    </View>
    
  );
};

const App = () => {
  //const
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=" " component={WelcomePage} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#00DFE9',
    padding:40,
  },

  welcomeTitle:{
    marginTop:20,
    fontSize:24,
    fontWeight: 'bold'
  },
  
  button:{
    color: '#ff0000',
    marginTop:80,
    width:150,
    height:50,
    padding: 20,
    backgroundColor: '#00D2DB',
    alignItems:'center',

  },

  nextButton:{
    padding: 10,
    alignContent:'center',
    alignItems:'center',
    width:80,
    marginTop:30,
    backgroundColor:'#00D2DB',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'rgba(158, 150, 150, .5)',
  },

  submitText:{
    color: '#000000',
    textAlign: 'center',
    fontSize:17.5,
    fontWeight: 'bold'
  },

  sectionText:{
    fontSize:17.5,
    fontWeight: 'bold',
    marginBottom:20,
  }
});


// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, Image } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// export default function App() {

//   return (
//     <View style={styles.container}>
//       <Image source={require('./assets/SmartGymLogo.png')}/>
//       <Text style={styles.welcomeTitle}>SmartGym</Text>
//       <StatusBar style="auto" />
//       <Button style={styles.buttonStyle}
//   onPress={()=> navigation.navigate('Home')}
//   title="Next"
// />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   welcomeTitle:{
//     marginTop:20,
//     fontSize:24,
//     fontWeight: 'bold'
//   },
  
//   button:{
//     color: '#ff0000',
//     marginTop:80,
//     width:150,
//     height:50,
//     padding: 20,
//     backgroundColor: '#00D2DB',
//     alignItems:'center',
//   }
// });
