import { View, StyleSheet,Alert,FlatList,Button} from "react-native";
import { Campo } from "@/components/Campo";
import { Botao } from "@/components/Botao";
import { Texto } from "@/components/Texto";
import { useState, useEffect } from 'react'
import { Titulo } from "@/components/Titulo";
import Index from "./Index";
import { useNavigation } from "expo-router";
import { useResiduosDataBase, ResiduosDataBase } from "@/database/useResiduosDataBase";
import { Residuos } from '@/components/Residuos'

export default function Consultar(){
    const navigation = useNavigation();
    const [id, setId] = useState("")
    const [data, setData] = useState("")
    const [categoria, setCategoria] = useState("")
    const [peso, setPeso] = useState("")
     const [busca, setBusca] = useState("")
    const [residuos, setResiduos] = useState<ResiduosDataBase[]>()
    const residuosDataBase = useResiduosDataBase();

    async function list(){
        try{
            const response = await residuosDataBase.consultar(busca)
            setResiduos(response)
        }catch(error){
            console.log(error)
        }
    }//fim do listar 

    async function details(item:ResiduosDataBase){
        setId(String(item.id))
        setData(item.data)
        setCategoria(item.categoria)
        setPeso(item.peso)
    }//detalha a estrutura de consulta

    async function remove(id:number){
        try{
            await residuosDataBase.remove(id)
            await list()
        }catch(error){
            console.log(error)
        }
    }//fim da função remover

     //Para carregar a lista do banco...
    useEffect(() => {list()}, [busca])

    return(
         <View style={styles.container}>
            <Campo placeholder="Pesquisar" onChangeText={setBusca}/>

            <View style={styles.flat}>
                <FlatList 
                    data={residuos}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => <Residuos data={item} onDelete={() => remove(item.id)} onEditar={() => navigation.navigate('Atualizar', {item}) }/>}
                    contentContainerStyle={{gap:16}}
                />
            </View>


            <Button title="Voltar" onPress={() => navigation.navigate('Index')}/>
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