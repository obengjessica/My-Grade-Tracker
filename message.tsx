import React , {Component} from 'react';
import { Text, View, StyleSheet } from "react-native";

class Message extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to My-Grade-Tracker</Text>
        <Text style={styles.text}>Happy Learning!</Text>
      </View>
    );
  }
}
export default Message;

const styles =StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
  },
  text:{
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },

  }
)

const handleLogin = () => {
   
  }