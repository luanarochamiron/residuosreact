import { View, StyleSheet,Text} from "react-native";
import { Botao } from "@/components/Botao";
import { Texto } from "@/components/Texto";
import { useNavigation } from "expo-router";
import Cadastrar from "./Cadastrar";

export default function Index(){
    const navigation = useNavigation();

    return(
        <View style = {styles.container}>
            <Botao onPress={() => navigation.navigate('Cadastrar')}><Texto>Cadastrar</Texto></Botao>
            <Botao onPress={() => navigation.navigate('Consultar')}><Texto>Consultar</Texto></Botao>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "898989",
        justifyContent: "center",
    },
});
