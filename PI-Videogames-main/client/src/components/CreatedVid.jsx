import React , { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { fetchGenres, postVideogame } from "../store/action"
import './videogame.css'

function Validacion(input){
    let errors = {}
    if(!input.name){
        errors.name = 'Se necesita ingresar un name';
    }else if(!input.image){
        errors.image = 'Se necesita ingresar una image';
    }else if(!input.platforms){
        errors.platforms = 'Se necesita ingresar una plataforma'
    }else if (!input.Descripción){
        errors.Descripción = 'Se necesita ingresar una Descripción'
    }else if(!input.released){
        errors.released = 'Se necesita ingresar una released'
    }
    return errors;
}


export default function VideogameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const generos = useSelector((state)=>state.filteredGenres)
    console.log(generos)
    const [errors, setErrors]= useState({})
    const [input , setInput]= useState({
        name:"",
        image:"",
        generos:[],
        platforms:[],
        Descripción:"",
        released : "",
    })
        
    function handleSubmit(e){
    e.preventDefault()
    dispatch(postVideogame(input))
    alert('VideoGames Creado Correctamente!!')
    setInput({
        name:"",
        image:"",
        generos:[],
        platforms:[],
        Descripción:"",
        released:"",
    })
    console.log(input)
    console.log(setInput, 'set')
    history.push('/home')
    }
    function selectHandle(e){
        setInput({
            ...input,
            generos:[...input.generos,e.target.value]
        })
    }

    function handleDelete(el){
        setInput({
            ...input,
            generos: input.generos.filter((genre)=> genre !== el)
        })
    }

    function handleChange(e){
     setInput({
         ...input,
         [e.target.name] : e.target.value
     })
     setErrors(Validacion({
        ...input,
        [e.target.name] : e.target.value
     }))
    }
    useEffect(()=>{
        dispatch(fetchGenres())
    },[])
    
    return( 
        <div className='h1h2'>
            <Link to="/home">
                <button>Volver</button>
            </Link>
            <div className='form'>
            <h1>Crea tus Videogames</h1>
            <form onSubmit={(e) =>handleSubmit(e)}>
                <div>
                    <label className ='label1'>Nombre</label>
                    <input 
                    className='input'
                    type="text"
                    value= {input.name}
                    name="name"
                    onChange={handleChange}/>
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className ='label2'>Imagen</label>
                    <input 
                    className='input'
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={handleChange}/>
                     {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}
                </div>
                <div>
                    <label className ='label3'>platforms</label>
                    <input 
                    className='input'
                    type="text"
                    value={input.platforms}
                    name="platforms"
                    onChange={handleChange}/>
                     {errors.platforms && (
                        <p className='error'>{errors.platforms}</p>
                    )}
                </div>
                <div>
                    <label className ='label4'>released</label>
                    <input 
                    className='input'
                    type="text"
                    value= {input.released}
                    name="released"
                    onChange={handleChange}/>
                     {errors.released && (
                        <p className='error'>{errors.released}</p>
                    )}
                </div>
                <div>
                <label className ='label5'>Descripción</label>
                    <input 
                    className='input'
                    type="text"
                    value={input.Descripción}
                    name="Descripción"
                    onChange={handleChange}/>
                     {errors.Descripción && (
                        <p className='error'>{errors.Descripción}</p>
                    )}
                </div>
                <select onChange={(e)=>{selectHandle(e)}}>
                 {generos.map((gen)=>{
                    return  <option value={gen.name}>{gen.name}</option>
                 })}   
                </select>
                 <ul><li>{input.generos.map(e => e + ",")}</li></ul>
               {input.name && input.image && input.platforms && input.released && input.Descripción && <button type='submit' >Crear</button>} 
            </form>
           
            {input.generos.map(el => <div className='divgen'>
                <p>{el}</p>
                <button onClick={()=> handleDelete(el)}>x</button>
            </div>)}
            
            </div>
        </div>
    )
}