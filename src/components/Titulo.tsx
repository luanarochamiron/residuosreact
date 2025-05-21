import {View, Text, TextProps, StyleSheet} from "react-native";
 export function Titulo({...rest}: TextProps){
    return(
        <Text {...rest} style={styles.tit}/>
    );
 }

 const styles = StyleSheet.create({
    tit:{
        fontSize: 50,
        textAlign: "center",
        color: "#fffff",
        fontWeight: 600,
        marginBottom: "20%",
    },
 })