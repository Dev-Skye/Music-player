import {StyleSheet, Text, View, Image, Animated} from "react-native";
import React, {useEffect, useState} from "react";
import BottomNav from "./components/BottomNav";
import { backgroundColor1, backgroundColor2, primaryColor, secondaryColor, themecol } from "./components/styles/Theme1";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import musicimg from "./images/musicimg.png";
import { setIsPlaying_global } from "./redux/actions";

const MusicPlayer = ({navigation}) => {
    const isplaying = useSelector(state => state.isplaying_global);
    const isplayingplaylist = useSelector(state => state.isplayingplaylist_global);
    const isplayingmusicorplaylist = useSelector(state => state.isplayingmusicorplaylist_global);

    const tempimg = "https://thumbs.dreamstime.com/b/black-girl-listening-to-music-26569174.jpg"
    
    let rotateValueHolder = new Animated.Value(0);
    const startImageRotateFunction =  () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder,{
            toValue: 1,
            duration: 3000,
            useNativeDriver: false
        }).start(() => startImageRotateFunction());
    }

    useEffect(() => {
        if(isplaying == true) {
            startImageRotateFunction()
        }
        else{
            rotateValueHolder.setValue(0);
            rotateValueHolder.stopAnimation()
        } 
    }, [isplaying])

    const RotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
        })


    const activesong_global = useSelector(state => state.activesong_global)

    //console.log("player page - ",  activesong_global)

    const dispatch = useDispatch()
    const playpausesong = () => {
        dispatch(setIsPlaying_global(!isplaying))
      }
    

      console.log(isplayingmusicorplaylist)
    return(
        <View style={styles.container}>
            <View style={styles.bottomNav}>
            <BottomNav activepage={`player`} navigation={navigation}/>
            </View>
            
            {
                activesong_global?.uri   ?
                <View style={styles.container}>
                    <Animated.Image source={musicimg} style={[styles.imgbig, {transform:[{rotate: RotateData}]}]}/>
            <View style={styles.container2}>
            <Text style={styles.text1}>{activesong_global?.filename}</Text>
            <Text style={styles.text2}>{activesong_global?.artistname}</Text>
            </View>
            <View  style={styles.container3}>
                <View style={styles.musiccompletedout}>
                <View style={styles.musiccompletedin}></View>
                </View>
                <View style={styles.timecount}>
                <Text style={styles.time}>00:00</Text>
                <Text style={styles.time}>01:00</Text>
            </View>
            </View>
            <View style={styles.container4}>
                <MaterialCommunityIcons name="skip-previous" size={50} color="black" style={styles.icon}/>
                {isplaying == false ? <AntDesign name="play" size={50} color="black" style={styles.icon}
                onPress={() => playpausesong()} /> 
                 :  <MaterialIcons name="pause-circle-filled" size={50} color="black" style={styles.icon}
                 onPress={() => playpausesong()}/>}

                <MaterialCommunityIcons name="skip-next" size={50} color="black" style={styles.icon}
                />
            </View>
                </View>

                : 

                <View style={styles.container}>
                    <Text style={styles.text1}>No Song Selected</Text>
                </View>
            }

        </View>
    )
}


const styles = StyleSheet.create({
    imgbig:{
        width: 300,
        height: 300,
        borderRadius: 150,
        marginVertical:20
    },
    icon:{
        color: primaryColor,
    },
    text1:{
        fontSize: 20,
        color: primaryColor,
        width: 300,
        fontFamily: "Poppins-SemiBold",
        textAlign: "center",
        alignSelf: "center"
    },
    time:{
        fontSize: 15,
        color: secondaryColor,
    },

    musiccompletedout:{
        width: "100%",
        height: 3,
        backgroundColor: secondaryColor,
        borderRadius: 5,
    },
    musiccompletedin:{
        width: "30%",
        height: 3,
        backgroundColor: primaryColor,
    },
    timecount:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginVertical: 7,
    },
    container3:{
        width: "80%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30
    },
    container4:{
        width: "50%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 70,
    },
    text2:{
        fontSize: 15,
        color: secondaryColor,
        width: 300,
        marginTop: -5,
        fontFamily: "Poppins-Regular",
        textAlign: "center",
        alignSelf: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themecol,
        width: "100%",
        height: "100%"
      },
      bottomNav:{
        position:"absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        zIndex: 10
      }
});
export default MusicPlayer;