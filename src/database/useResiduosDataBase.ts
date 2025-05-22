import { useSQLiteContext } from 'expo-sqlite';

export type ResiduosDataBase = {
    id : number
    data: string      
    categoria: string
    peso: string
}// criando o local de variaveis do banco 

export function useResiduosDataBase(){
    const dataBase = useSQLiteContext()

    async function create(data: Omit<ResiduosDataBase, "id">){
        const statement = await dataBase.prepareAsync(
            "insert into residuos(data, categoria,peso) values ($data, $categoria, $peso)"
        )

        try{
            const result = await statement.executeAsync({
                $data: data.data,
                $categoria: data.categoria,
                $peso: data.peso
            })
            //Coletando o último id cadastrado e devolvendo 
            const insertdRowId = result.lastInsertRowId.toLocaleString()
            return { insertdRowId }

        }catch(error){
            throw error 
        }finally{
            await statement.finalizeAsync()
        }
    }//fim do create 

    async function consultar(data:string){
        try{
            const query = "select * from residuos where data like ?"//Interrogação: Substituir por qualquer item de busca
            const response = await dataBase.getAllAsync<ResiduosDataBase>(query,`%${data}%`)
            return response
        }catch(error){
            throw error
        }
    }//fim do consultar

    async function atualizar(data: ResiduosDataBase){
        const statement = await dataBase.prepareAsync(
            "update residuos set data = $data, categoria = $categoria, peso = $peso where id = $id"
        )

        try{
            await statement.executeAsync({
                $id: data.id,
                $data: data.data,
                $categoria: data.categoria,
                $peso: data.peso
            })
        }catch(error){
            throw error
        }finally{
            await statement.finalizeAsync()
        }
    }//fim do atualizar

    async function remove(id:number){
        try{
            await dataBase.execAsync("Delete from residuos where id = " + id)
        }catch(error){
            throw(error)
        }
    }//fim do remover

    return { create, consultar, atualizar,remove } 
}//fim da funçaõ