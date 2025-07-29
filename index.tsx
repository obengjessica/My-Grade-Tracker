import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import UserLogin from "./userLogin";
import { LinearGradient } from 'expo-linear-gradient';
import Home from './home';

// This timing props
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function LoginScreen() {

  const router = useRouter();
   const [initialRoute, setInitialRoute] =  useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
  const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  setInitialRoute(isLoggedIn === 'true' ? 'Home' : 'UserLogin');
};

    checkLoginStatus();
  }, []);

  if (!initialRoute) return null;
  

  return (
    
    <LinearGradient
          colors={['#f0f4ff', '#e1d6f7', '#f9d4ec']}
          style={styles.gradient}
        >
          <UserLogin/>
  // </LinearGradient>
  );
}

export const screenOptions ={
  headerShown: false,
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "purple",
  },
});
