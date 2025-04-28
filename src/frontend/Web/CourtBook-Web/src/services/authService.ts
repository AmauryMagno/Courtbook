import LocalForage  from 'localforage';
import api from "./api"
const BASE_URL = "http://localhost:3005"

export const login = async(param: any) =>{
    try{
        const response = await api.post(`/authenticate`, param)
        console.log(`Requisição JWT: ${response}`)
        const token = response.data.token

        if(token){
            await LocalForage.setItem('@TOKEN_KEY', token)
        }

        return response.data;
    } catch (error){
        console.log(error)
        return null
    }
}

export const searchUsuarios = async() =>{
    try {
        return await api.get(`${BASE_URL}/users`).then(
            response => {
                return response.data;
            },
            error => {
                console.log(error);
                return null;
            }
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}