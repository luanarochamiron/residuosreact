import{ View, TextInput, TextInputProps, StyleSheet} from "react-native";

export function Campo({...rest}: TextInputProps){
    return(
        <TextInput style={styles.camp} {...rest}/>
    );
}

const styles = StyleSheet.create({
    camp:{
        width: "80%",
        height: "8%",
        borderWidth: 2,
        borderColor: "#ffff",
        textAlign: "center",
        borderRadius: 20,
        marginBottom: 10,
        marginLeft: "10%",
        fontSize: 15,
        padding: 20,
    },
})