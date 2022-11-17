import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native";
import React, { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav";
import { backgroundColor1, backgroundColor2, primaryColor, secondaryColor, themecol } from "./components/styles/Theme1";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePlaylist_global, setIsPlayingMusicOrPlaylist_global, setIsPlayingPlaylist_global, setIsPlaying_global } from './redux/actions';


const AllPlaylists = ({navigation}) => {
    

    const [oldplaylists, setOldplaylists] = useState([])

    const dispatch = useDispatch()
    const getolddata = async () => {
      AsyncStorage.getItem("old_playlists").then((value) =>{
        if(value){
            setOldplaylists(JSON.parse(value))
        }
    })
    AsyncStorage.getItem("active_playlist").then((value) => {
      if(value){
        dispatch(setActivePlaylist_global(JSON.parse(value)))  
        //console.log("active playlist", JSON.parse(value))
      }
    })    
    }
    useEffect(() => {
          getolddata()
    }, [])
    
    //console.log(oldplaylists);
    const [keyword, setKeyword] = useState("");
  //  console.log(keyword)

    const deletePlaylist = (index) => {
      let temp = oldplaylists;
      temp.splice(index, 1);
      setOldplaylists(temp)
      AsyncStorage.setItem("old_playlists", JSON.stringify(temp));
      getolddata();
    
    }

    const activeplaylist = useSelector(state => state.activeplaylist_global)
    console.log("active playlist", activeplaylist)
    const isplayingplaylist = useSelector(state => state.isplayingplaylist_global)

    const setactiveplaylist = (item) => {
        dispatch(setIsPlayingPlaylist_global(true))
        dispatch(setActivePlaylist_global(item)) 
        AsyncStorage.setItem("active_playlist", JSON.stringify(item));
        dispatch(setIsPlayingMusicOrPlaylist_global("playlist"))
        dispatch(setIsPlaying_global(false))
    }

    const playpauseplaylist = () => {
      dispatch(setIsPlayingPlaylist_global(!isplayingplaylist))
      dispatch(setIsPlaying_global(false))
      dispatch(setIsPlayingMusicOrPlaylist_global("playlist"))
    }
    return(
        <View style={styles.container}>
            <View
                style={styles.bottomNav}
            >
            <BottomNav activepage={`allplaylists`} navigation={navigation}/>
            </View>
            <Text style={styles.head1}>All Playlist</Text>
            <ScrollView style={styles.playlistouter}>
                <TextInput style={styles.input1} placeholder="Search" 
                placeholderTextColor={secondaryColor}
                onChangeText={(text) => setKeyword(text)}
                />
            {oldplaylists
            .filter((item) => {
              if(keyword == ""){
                  return item;
              }
              else if (item.name.toLowerCase().includes(keyword.toLowerCase())){
                  return item
              }
          })
            .map((item, index) => 
              <View key={index}>
                {
                  JSON.stringify(item) === JSON.stringify(activeplaylist) ?
                  <TouchableOpacity>
                    <View style={styles.playlistcard1}>
                <Text style={styles.txt11}>{item.name}</Text>
                <View style={styles.playlistcardin}>
                {
                    item.songs.length != 1 ?
                    <Text style={styles.txt21}>{item.songs.length} songs</Text>
                    : 
                    <Text style={styles.txt21}>{item.songs.length} song</Text>
                }
                {
                  isplayingplaylist == true ?
                  <MaterialIcons name="pause-circle-filled" size={40} color="black" style={styles.icon2} 
                onPress={() => {
                  playpauseplaylist()
                }}/>
                : 
                <Feather name="play-circle" size={40} color="black" style={styles.icon1} 
                onPress={() => {
                  setactiveplaylist(item)
                }}/>
                }
                <AntDesign name="delete" size={24} color="black" style={styles.icon2} 
                onPress={() => {
                  deletePlaylist(index)
                }}
                />
                
                </View>
                </View>
                </TouchableOpacity> 
                  
                  :

                  <TouchableOpacity >
                    <View style={styles.playlistcard}>
                <Text style={styles.txt1}>{item.name}</Text>
                <View style={styles.playlistcardin}>
                {
                    item.songs.length != 1 ?
                    <Text style={styles.txt2}>{item.songs.length} songs</Text>
                    : 
                    <Text style={styles.txt2}>{item.songs.length} song</Text>
                }
                <Feather name="play-circle" size={40} color="black" style={styles.icon1} 
                onPress={() => {
                  setactiveplaylist(item)
                }}/>
                
                <AntDesign name="delete" size={24} color="black" style={styles.icon1} 
                onPress={() => {
                  deletePlaylist(index)
                }}
                />
                
                </View>
                </View>
                </TouchableOpacity> 
                  
                }
              </View>
            )}
                
            </ScrollView>
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themecol,
        alignItems: 'center',
        justifyContent: 'center',
      },
      bottomNav:{
        position:"absolute",
        bottom: 0,
        zIndex: 10,
        width: "100%",
        alignItems: "center"
      },
      playlistcard:{
        flexDirection:"row",
        justifyContent:"space-between",
        //backgroundColor: primaryColor,
        width:"90%",
        alignSelf:"center",
        borderColor: secondaryColor,
        borderBottomWidth: 1,
        marginTop: 15,
        paddingVertical: 5,
      },
      playlistcard1:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor: primaryColor,
        width:"90%",
        alignSelf:"center",
        borderColor: secondaryColor,
        borderBottomWidth: 1,
        marginTop: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop:5
      },
      playlistouter:{
        width: "100%",
      },
      playlistcardin:{
        flexDirection:"row",
        alignItems:"center"
      },
      txt1:{
        color: primaryColor,
        fontSize: 17,
        fontFamily: "Poppins-Regular"
      },
      txt2:{
        color: secondaryColor,
        fontSize: 17,
        fontFamily: "Poppins-Regular"
      },
      icon1:{
        color: backgroundColor1,
        fontSize: 20,
        marginHorizontal: 10,
      },
      txt11:{
        color: themecol,
        fontSize: 17,
        fontFamily: "Poppins-Regular",
        marginLeft:10
      },
      txt21:{
        color: secondaryColor,
        fontSize: 17,
        fontFamily: "Poppins-Regular"
      },
      icon2:{
        color: backgroundColor1,
        fontSize: 20,
        marginHorizontal: 10,
      },
      input1:{
        backgroundColor: backgroundColor2,
        width:"90%",
        opacity: 0.5,
        borderRadius: 10,
        marginVertical: 20,
        alignSelf:"center",
        padding: 10,
        color: primaryColor
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

});
export default AllPlaylists;