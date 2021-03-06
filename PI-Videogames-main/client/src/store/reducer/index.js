import { ASCENDENTE, DATABASE, DESCENDENTE } from "../../components/constantes/sort";
import { CLEAR, CREATED, FILTEREDRATING, FILTERGENRES, GENERO, GET_VIDEOGAMES, ID, POSTEO, SEARCH_VIDEOGAMES, SORT, SORTALFA } from "../action";

const initialState = {
    videogames: [],
    filteredGames:[],
    filteredGenres:[],
    filteredRaating:[],
    Gamedetails:{}
}

export default function reducer(state = initialState, action){

switch(action.type){
    case GET_VIDEOGAMES :
    
        return {
            ...state,
            videogames : action.payload,
            filteredGames : action.payload
        }
    case SEARCH_VIDEOGAMES:
        return {
            ...state,
            filteredGames : action.payload
        }
        case SORTALFA:
            let ordergamesalfa=[...state.videogames]
            ordergamesalfa.sort((a,b)=>{
                if (a.name > b.name){
                    return 1;
                }else if(a.name < b.name){
                    return -1 ;
                }
                return 0;
            })
           
            return {
                ...state,
                filteredGames : ordergamesalfa
            }
    case SORT:
        let ordergames=[...state.videogames]
        ordergames = ordergames.sort((a, b)=>{
            if(a.name < b.name){
                return action.payload === ASCENDENTE ? -1 : 1;
            }
            if(a.name > b.name){
                return action.payload === DESCENDENTE ? 1 : -1;
            }
            return 0;
        })
        return {
            ...state,
            filteredGames: action.payload ==='todos' ? state.videogames : ordergames
        }
        case CREATED:
            const allGames = state.videogames
        const createdfilter = action.payload === DATABASE ? allGames.filter(e => e.createinBD) : allGames.filter(e => !e.createinBD)
        return{
            ...state,
            filteredGames : action.payload === 'todos' ? state.videogames : createdfilter
            }
            case GENERO: 
                return {
                    ...state,
                    filteredGames: action.payload,
                    filteredGenres: action.payload 
                } 
                case FILTERGENRES:
                    const allGeneres = state.videogames
                    const  filtereGenres = action.payload ===  'todos' ?  allGeneres : allGeneres.filter(el => el.genero?.includes(action.payload))
                    return{
                        ...state,
                        filteredGames: filtereGenres
                    } 
                    case FILTEREDRATING:
                        let orderrating=[...state.videogames]
                     orderrating = orderrating.sort((a, b)=>{
                  if(a.rating < b.rating){
                     return action.payload === 'ratinga' ? -1 : 1;
                     }
                     if(a.rating > b.rating){
                         return action.payload === 'ratingb' ? 1 : -1;
                         }
                           return 0;
                     })
                        return{
                            ...state,
                            filteredGames: action.payload ==='todos' ? state.videogames : orderrating
                        }
            case POSTEO :
                return{
                    ...state
                }
                case ID:
                    return {
                        ...state,
                        Gamedetails: action.payload
                    }
                    case CLEAR :
                        return {
                            ...state,
                            Gamedetails : {}
                        }
        default :
         return state

    }
}



// case FILTEREDRATING:
//     const allRatings = state.videogames
//     console.log(allRatings,'allrat')
//     const filteredRatings = action.payload === 'todos' ? allRatings : allRatings.filter(el => el.rating == action.payload)
//  console.log(filteredRatings, 'ratings')
//     return{
//         ...state,
//         filteredGames: filteredRatings
//     }