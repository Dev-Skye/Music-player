import React, { useEffect } from "react";
import {Text, View, Image, StyleSheet, TextInput} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {ResponseType, useAuthRequest} from "expo-auth-session";

const SignUp = ({navigation}) => {

    const discovery = {
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        tokenEndpoint: "https://accounts.spotify.com/api/token",
    };

    const [request, response, promptAsync] = useAuthRequest({
        responseType: ResponseType.Token,
        clientId: "e6bb9986b71e4d14ae7bb398c3c48c09",
        clientSecret: "c243807b92704df0b31e86cc32d5149b",
        scopes: [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-top-read",
            "user-modify-playback-state",
            "streaming",
            "user-read-email",
            "user-read-private",
        ],
        usePKCE: false,
        redirectUri: "https://open.spotify.com/"
    }, discovery);

    useEffect(() => {
        if(response?.type === "success"){
            const {access_token} = response.params;
            console.log("accesstoken", access_token)
        }
    }, [response])


    return(
        <View style={styles.container}>
            <Image source ={require("../images/musicimage.png")}
                style={{width: "90%", height:"40%", marginTop: 100, marginHorizontal: 18}}
            />
            <Text
                style={{fontSize: 28, fontFamily: "Poppins-SemiBold", alignSelf: "center", marginTop: -70}}
            >Getting Started?</Text>
            <Text
                style={{fontFamily: "Poppins-Regular", marginHorizontal: 50, 
                textAlign: "center", marginTop: -5, opacity: 0.6, fontSize: 15}}
            >Create an account to continue.</Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 60,
                    borderRadius: 23,
                    paddingHorizontal: 10,
                    borderColor:"purple",
                    paddingVertical: 10
                }}>
                    <TextInput
                    placeholder="Email"
                    placeholderTextColor="#511660"
                    style={{paddingHorizontal: 10}}
                    />
                </View>


                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 15,
                    borderRadius: 23,
                    paddingHorizontal: 10,
                    borderColor:"purple",
                    paddingVertical: 10
                }}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#511660"
                    secureTextEntry
                    style={{paddingHorizontal: 10}}
                    />
                </View>

                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 15,
                    borderRadius: 23,
                    paddingHorizontal: 10,
                    borderColor:"purple",
                    paddingVertical: 10
                }}>
                  <TextInput
                    secureTextEntry
                    placeholder="Confirm Password"
                    placeholderTextColor="#511660"
                    style={{paddingHorizontal: 10}}
                    />
                    </View>
                <View style={{marginHorizontal: 55, alignItems: "center", 
                justifyContent: "center", marginTop: 30, backgroundColor: "#511660", paddingVertical: 10, borderRadius: 23}}>
                    <Text 
                    onPress={()=>navigation.navigate("allmusic")}
                    style={{color: "white", fontFamily: "Poppins-SemiBold"}}>Sign Up</Text>
                </View>
                <View style={{marginHorizontal: 55, alignItems: "center", 
                 flexDirection:"row", paddingHorizontal: 30, marginTop: 10, backgroundColor: "#1DB954", paddingVertical: 5, borderRadius: 23}}>
                    <MaterialCommunityIcons name="spotify" size={35} color="black" />
                    <Text 
                    onPress={() => promptAsync()}
                    style={{color: "white", fontFamily: "Poppins-SemiBold", paddingHorizontal: 10}}>Continue with Spotify</Text>
                </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        color: "white",
    }
})
export default SignUp;