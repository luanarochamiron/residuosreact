import { View, StyleSheet } from "react-native";
import { Titulo } from "@/components/Titulo";
import { Botao } from "@/components/Botao";
import { Campo } from "@/components/Campo";
import { Texto } from "@/components/Texto";
import { useNavigation } from "expo-router";
import Index from "./Index";

export default function Excluir(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Titulo>Excluir</Titulo>
            <Campo placeholder="Nome" />
            <Botao><Texto>Excluir</Texto></Botao>
            <Botao onPress={() => navigation.navigate('Index')}><Texto>Voltar</Texto></Botao>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "#989898",
        justifyContent: "center",
    },
});