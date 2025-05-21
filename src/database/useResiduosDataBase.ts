import { useSQLiteContext } from 'expo-sqlite';

export type ResiduosDataBase = {
    id : number
    data: string      
    categoria: string
    peso: number
}// criando o local de variaveis do banco 

export function useResiduosDataBase(){
    const dataBase = useSQLiteContext()

    async function create(data: Omit<ResiduosDataBase, "id">){
        const statement = await data.prepareAsync(
            "insert into residuos(data, categoria,peso) values ($data, $categoria, $peso)"
        )
    }
}//fim da funçaõ