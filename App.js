import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllMusic from "./scr/screens/AllMusic";
import AllPlaylists from "./scr/screens/AllPlaylists";
import SignUp from "./scr/screens/navigations/SignUp";
import SignIn from "./scr/screens/navigations/SignIn";
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import { Store } from './scr/screens/redux/store';
import Addtoplaylist from './scr/screens/Addtoplaylist';
import MusicPlayer from './scr/screens/MusicPlayer';
import PlaylistPlayer from './scr/screens/PlaylistPlayer';
import TrackPlayer from 'react-native-track-player';

const Stack = createNativeStackNavigator();
export default function App() {

  
  let [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf")
});

if (!fontsLoaded){
    return <AppLoading/>
}

  return (
    <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="signin" component={SignIn} options={{headerShown: false}} />
      <Stack.Screen name="signup" component={SignUp} options={{headerShown: false}} />
      <Stack.Screen name="allmusic" component={AllMusic} options={{headerShown: false}} />
        <Stack.Screen name="musicplayer" component={MusicPlayer} options={{headerShown: false}} />
        <Stack.Screen name="playlistplayer" component={PlaylistPlayer} options={{headerShown: false}} />
        <Stack.Screen name="allplaylists" component={AllPlaylists} options={{headerShown: false}}/>
        <Stack.Screen name="addtoplaylist" component={Addtoplaylist} options={{headerShown: true, title:"Add To Playlist"}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
