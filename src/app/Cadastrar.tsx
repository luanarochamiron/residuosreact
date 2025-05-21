import { View, StyleSheet } from "react-native";
import { Campo } from "@/components/Campo";
import { Botao } from "@/components/Botao";
import { Texto } from "@/components/Texto";
import { Titulo } from "@/components/Titulo";
import Index from "./Index";
import {useState } from 'react';
import { useNavigation } from "expo-router";
import { useResiduosDataBase, ResiduosDataBase } from "@/database/useResiduosDataBase";

export default function Cadastrar(){
    const navigation = useNavigation();
    const [id, setId] = useState("")
    const [data, setData] = useState("")
    const [categoria, setCategoria] = useState("")
    const [peso, setPeso] = useState("")
    const [residuos, setResiduos] = useState<ResiduosDataBase[]>()
    const residuosDataBase = useResiduosDataBase();

    async function create(){
        try{
            const response = await residuosDataBase.create({
                data,
                categoria,
                peso
            })
                Alert.alert("Residuo cadastrado com sucesso! ID: " + response.insertdRowId)
        }catch(error){
            console.log(error)
        }
    }//fim do create
    return(
        <View style={styles.container}>
            <Titulo>Cadastrar</Titulo>
            <Campo placeholder="data" onChangeText={setData} value={data}/>
            <Campo placeholder="categoria" onChangeText={setCategoria} value={categoria}/>
            <Campo placeholder="peso" onChangeText={setPeso} value={peso}/>
            <Botao onPress={create}><Texto>Cadastrar</Texto></Botao>
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