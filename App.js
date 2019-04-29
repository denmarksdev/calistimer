import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import EMOMScreen from './src/screens/EMOMScreen';
import IsometriaScreen from './src/screens/IsometriaScreen';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  EMOM: EMOMScreen,
  ISO: IsometriaScreen
}, { initialRouteName: 'Home' })

export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 48,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Ubuntu-Bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
