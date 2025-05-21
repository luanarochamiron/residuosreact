import{View, TouchableOpacity,TouchableOpacityProps , StyleSheet} from "react-native"

export function Botao({...rest}:TouchableOpacityProps){
    return(
        <View style={styles.btn}>
            <TouchableOpacity  {...rest} />
        </View>
    );
}

const styles= StyleSheet.create({
    btn:{
        width: "80%",
        height: "8%",
        borderRadius: 50,
        backgroundColor: "#787878",
        borderWidth: 2,
        marginLeft: "10%",
        marginTop: 15,
    },
}
);