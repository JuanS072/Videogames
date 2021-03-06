import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Clear, fetchID } from '../store/action';
import { Link } from "react-router-dom"
import './videogame.css'
export default function Details(props){
  const dispatch = useDispatch()
  useEffect(()=>{
        dispatch(fetchID(props.match.params.id))
        return ()=>{
          dispatch(Clear())
        }
    }, [dispatch])
    const Gamesid = useSelector(state=>state.Gamedetails)
  

   
    return <div  className='detailss' >
      <div>
        <div className='center'>
        <Link to ="/home">
      <button className='back'>Back</button>
    </Link>
        </div>
     
    <div>
    {
      Gamesid.id ? <div className='details'>
        <h1>{Gamesid.name}</h1>
        <img src= {Gamesid.img? Gamesid.img : Gamesid.image} alt="imagen not Found" width="500px" heigth="500px" />
        <div className='top'>
        <span className='span'>Genres</span>
       <h2>{Gamesid? Gamesid.genero + ' ' : Gamesid.genero?.map( el =>(<div key={el}>{el.name + (' ')}</div>) )}</h2>
        <span className='span'>Plataforms</span>
        <h2>{Gamesid.platforms}</h2>
        <span className='span'>Released</span>
        <h2>{Gamesid.released}</h2>
        <span className='span'>Description</span>
        <h2>{Gamesid.Descripción}</h2>
        <span className='span'>Rating</span>
        <h2>{Gamesid.rating}</h2>
        </div>
      </div>: <p className='center'>Loading...</p>
    }
     </div>
     </div>
     <div className='center'>
        <Link to ="/home">
      <button className='back'>Back</button>
    </Link>
        </div>
   </div>


}


/*
const dispatch = useDispatch()
const [GamesId, setGamesid] = useState([]);

 useEffect(()=>{
       dispatch(fetchID())
   }, [])

  function onClose(id) {
    setGamesid(setGamid => setGamid.filter(c => c.id !== id));
  }



function onFilter(GameId) {
 -------------------------
  //let games  = GamesId.filter(c => c.id === parseInt(match.params.GameId))
  ---------------------------


   let games = GamesId.filter(c => c.id === parseInt(GameId));
    if(games.length > 0) {
        return games[0];
    } else {
        return null;
    }
  }



<Route
  exact path='/videogames/:idVideogame'
  render={({match}) =>{ return <Details Games={onFilter(match.params.GameId)}/>}}
/>

*/