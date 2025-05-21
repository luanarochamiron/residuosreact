import{View, Text, TextProps,StyleSheet} from "react-native";

export function Texto({...rest}:TextProps){
    return(
        <View style={styles.container}>
            <Text style={styles.txt} {...rest} />
        </View>
    );
}

const styles= StyleSheet.create({
    container:{
        width: "100%",
    },
    txt:{
        textAlign: "center",
        justifyContent: "center",
        fontSize: 15,
        padding: 15,
        fontWeight: 800,
    },
});