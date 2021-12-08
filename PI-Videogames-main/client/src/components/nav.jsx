import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { fetchGenres, fetchVideogames} from "../store/action";

import SearchBar from "./SearchBar";
import "./videogame.css";

function Nav() {
  let dispatch = useDispatch()



useEffect(() => {
 dispatch(fetchGenres());
},[dispatch])


  function HandleClick(e){
    e.preventDefault()
   dispatch(fetchVideogames())
 }  

  return (
    <nav className='navbar'>
     <Link to='/' className='title' >  <h1>Videogames</h1> </Link>
    <Link to='/videogame' className='button2'><h3 className='button3'>Crear Juego</h3></Link>
    <button onClick={e =>{HandleClick(e)}} className='buttonReset'>Reload Page</button>
     <div>
     <SearchBar/>
    </div>
    </nav>
  );
};

export default Nav;





/*

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideogames} from "../store/action";
import Videogame from "./videogame";
import Paginado from "./pages";
import Nav from "./nav"
 export default function Home(){
   let videogame = useSelector((state)=> state.filteredGames)
   let dispatch = useDispatch()
   const [currentpage, setCurrenpage] = useState(1);
   const [gamesPage, setGamespage] = useState(15)
  const indiceLastGames = currentpage * gamesPage;
  const indiceFirstGames = indiceLastGames - gamesPage
  const currentGamesPage = videogame.slice(indiceFirstGames, indiceLastGames)

  const paginado = (pagnum)=>{
    setCurrenpage(pagnum)
  }

   useEffect(()=>{
       dispatch(fetchVideogames())
   }, [])


     return <div>
       <Nav/>
       <div className='DivHome'>
       <Paginado
       gamesPage={gamesPage}
       videogame={videogame.length}
       paginado={paginado}
       />
       {
      currentGamesPage?.map(e=>{
         return <div className='column'>
         <Videogame name={e.name} image={e.image} platforms={e.platforms} genre={e.genero} rating={e.rating} id ={e.id} />
         </div>
        
       })
       }
   </div>
  </div>
 }

*/