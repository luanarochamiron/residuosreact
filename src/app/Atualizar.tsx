import { View, StyleSheet,Alert} from "react-native";
import { Campo } from "@/components/Campo";
import { Botao } from "@/components/Botao";
import { Texto } from "@/components/Texto";
import { Titulo } from "@/components/Titulo";
import { useState, useEffect } from 'react'
import { useNavigation } from "expo-router";
import { useRoute } from '@react-navigation/native' 
import { useResiduosDataBase, ResiduosDataBase } from '@/database/useResiduosDataBase'

export default function Atualizar(){
        const navigation = useNavigation();
        const [id, setId] = useState("")
        const [data, setData] = useState("")
        const [categoria, setCategoria] = useState("")
        const [peso, setPeso] = useState("")
        const [residuos, setResiduos] = useState<ResiduosDataBase[]>()
        const residuosDataBase = useResiduosDataBase();
        const route = useRoute();
        const { item } = route.params;

        //Determinar os conteúdos dos campos
        useEffect(() => {
        if(item){
            setId(item.id.toString());
            setData(item.data);
            setCategoria(item.categoria);
            setPeso(item.peso);
        }
        }, []);

        //Método Atualizar
    async function atualizar(){
        try{
            await residuosDataBase.atualizar({
                id: Number(id),
                data, 
                categoria, 
                peso
            });

            Alert.alert(
                "Sucesso!",
                "Dados dos Residuos atualizados com sucesso!",
                [
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate("Consultar"),
                    },
                ],
                { cancelable: false }
            );
        }catch(error){
            console.log(error)
        }
    }//fim do atualizar    

    async function salvarAtualizacao(){
        try{
            if(id){
                await atualizar()
            }
        }catch(error){
            console.log(error)
        }
        setId("");
        setData("");
        setCategoria("");
        setPeso("");
    }//fim do salvarAtualizacao


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