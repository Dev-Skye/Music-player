import React from "react";
import {View, Text, StyleSheet} from "react-native";
import BottomNav from "./components/BottomNav";
import { backgroundColor1, primaryColor, themecol } from "./components/styles/Theme1";

const PlaylistPlayer = ({navigation}) => {
    return(
        <View style={styles.container}>
            <View style={styles.bottomnav}>
                <BottomNav activepage={"player"} navigation={navigation}/>
            </View>
            <Text style={styles.head1}>No Song Playing</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: themecol,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: backgroundColor1,
        width: "100%",
        height: "100%"
    },
    head1: {
        color: primaryColor,
        fontSize: 18,
        backgroundColor: themecol,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: "Poppins-SemiBold",
        borderRadius: 20,
        width: "50%",
        textAlign: "center",
        alignItems: "center",
      },
bottomnav:{
    position: "absolute",
    bottom:0,
    width: "100%",
    alignItems:"center",
    zIndex:10
}
})

export default PlaylistPlayer;