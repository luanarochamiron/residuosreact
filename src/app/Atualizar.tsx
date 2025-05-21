import { View, StyleSheet } from "react-native";
import { Campo } from "@/components/Campo";
import { Botao } from "@/components/Botao";
import { Texto } from "@/components/Texto";
import { Titulo } from "@/components/Titulo";
import Index from "./Index";

import { useNavigation } from "expo-router";

export default function Atualizar(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Titulo>Atualizar</Titulo>
            <Campo placeholder="Nome"/>
            <Campo placeholder="Telefone"/>
            <Campo placeholder="Endereço"/>
            <Botao><Texto>Atualizar</Texto></Botao>
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