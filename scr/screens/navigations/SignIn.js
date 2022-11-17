import React from "react";
import {Text, View, Image, StyleSheet, TextInput} from "react-native";
import { primaryColor } from "../components/styles/Theme1";
import Icon from "@expo/vector-icons/AntDesign"

const SignIn = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Image source ={require("../images/musicimage.png")}
                style={{width: "90%", height:"40%", marginTop: 100, marginHorizontal: 18}}
            />
            <Text
                style={{fontSize: 28, fontFamily: "Poppins-SemiBold", alignSelf: "center", marginTop: -70}}
            >Let's Sign You In!</Text>
            <Text
                style={{fontFamily: "Poppins-Regular", marginHorizontal: 50, 
                textAlign: "center", marginTop: -5, opacity: 0.6}}
            >Where words fail, music speaks.</Text>
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
                    <Icon name="mail" color="purple" size={24}/>
                    <TextInput
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
                    <Icon name="lock" color="purple" size={24}/>
                    <TextInput
                    secureTextEntry
                        style={{paddingHorizontal: 10}}
                    />
                </View>
                <View style={{marginHorizontal: 55, alignItems: "center", 
                justifyContent: "center", marginTop: 30, backgroundColor: "#511660", paddingVertical: 10, borderRadius: 23}}>
                    <Text 
                    onPress={()=> navigation.navigate("allmusic")}
                    style={{color: "white", fontFamily: "Poppins-SemiBold"}}>Already a member</Text>
                </View>
                <Text
                    onPress={()=>navigation.navigate("signup")}
                    style={{alignSelf: "center", color: "#511660", fontFamily: "Poppins-SemiBold", paddingVertical: 30}}
                >New User? Sign Up Here.</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        color: "white",
    }
})
export default SignIn;