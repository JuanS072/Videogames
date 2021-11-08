import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const CLEAR ='CLEAR';
export const SEARCH_VIDEOGAMES= 'SEARCH_VIDEOGAMES';
export const GENERO = 'GENERO';
export const CREATED = 'CREATED';
export const POSTEO = 'POSTEO';
export const ID ='ID;'
export const SORT = 'SORT';
export const FILTERGENRES = 'FILTERGENRES';
export const FILTEREDRATING = 'FILTEREDRATING';
export const SORTALFA = 'SORTALFA';

export function Clear(){
    return {
        type : CLEAR
    }
}

export function fetchID(id){
    return function(dispatch){
        axios.get('http://localhost:3001/videogames/' + id)
        .then((result)=>{
            dispatch({
                type: ID,
                payload : result.data
            })
        })
        .catch((error) =>{
            console.log(error, 'este error')
        })
    }
}

export function fetchGenres(){
    return function(dispatch){
        axios.get('http://localhost:3001/genres')
        .then((result)=>{
            dispatch({
                type: GENERO,
                payload : result.data
            })
        })
        .catch((error)=>{
            console.log(error, 'aca esta el error')
        })
    }
}

export function postVideogame(payload){
    return async function (dispatch){
        const respuesta = await axios.post('http://localhost:3001/videogame', payload)
        console.log(respuesta);
        return respuesta;
    }
}

export function fetchVideogames(){
    return function(dispatch){
        axios.get('http://localhost:3001/videogames/')
        .then((result)=>{
            dispatch({
                type: GET_VIDEOGAMES,
                payload : result.data
            })
        })
        .catch((error)=>{
            console.log(error, 'aca esta el error')
        })
    }
}


export function searchVideogames(search){
    return function(dispatch){
        axios.get('http://localhost:3001/videogames?name='+ search)
        .then((result)=>{
            dispatch({
                type: SEARCH_VIDEOGAMES,
                payload : result.data
            })
        })
        .catch((error)=>{
            console.log(error, 'aca esta el error')
        })
    }
}

export function sort(order){
    return {
        type: SORT,
        payload: order
    }
}

// export function sortalgabetico(order){
//     return {
//         type: SORTALFA,
//         payload: order
//     }
// }

export function filteredrating(payload){
console.log(payload,'payload')
    return {
        type: FILTEREDRATING,
        payload
    }
}

export function filtergenres(payload){
    console.log(payload, 'payload')
    return {
        type: FILTERGENRES,
        payload
    }
}

export function createIndb(payload){
    return{
        type: CREATED,
        payload
    }
}