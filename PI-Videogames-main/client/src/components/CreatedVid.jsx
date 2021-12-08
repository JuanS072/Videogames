import React , { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { fetchGenres, postVideogame } from "../store/action"
import './videogame.css'

function Validacion(input){
    let errors = {}
    if(!input.name){
        errors.name = 'Se necesita ingresar un nombre';
    }else if(!input.image){
        errors.image = 'Se necesita ingresar una imagen';
    }else if(!input.platforms){
        errors.platforms = 'Se necesita ingresar una plataforma'
    }else if (!input.Descripción){
        errors.Descripción = 'Se necesita ingresar una Descripción'
    }else if(!input.released){
        errors.released = 'Se necesita ingresar una fecha de estreno'
    }
    // }else if(input.released !== Number){
    //     errors.released = 'tiene que ser una fecha o un numero'
    // }
    return errors;
}


export default function VideogameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const genero = useSelector((state)=>state.filteredGenres)
    console.log(genero)
    const [errors, setErrors]= useState({})
    const [input , setInput]= useState({
        name:"",
        image:"",
        genero:[],
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
        genero:[],
        platforms:[],
        Descripción:"",
        released:"",
    })
    history.push('/home')
    }
    function selectHandle(e){
        if(!input.genero.find(el => el === e.target.value)){
            setInput({
                ...input,
                genero:[...input.genero,e.target.value]
            })
        }
       
    }

    function handleDelete(el){
        setInput({
            ...input,
            genero: input.genero.filter((genre)=> genre !== el)
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
                    type="date"
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
                <select className='select1' onChange={(e)=>{selectHandle(e)}}>
                 {genero.map((gen)=>{
                    return  <option value={gen.name}>{gen.name}</option>
                 })}   
                </select>
                 <ul><li>{input.genero.map(e => e + ", ")}</li></ul>
               {input.name && input.image && input.platforms && input.released && input.Descripción && <button type='submit' className='botonCrear' >Crear</button>} 
            </form>
            {input.genero.map(el => <div className='genres'>
                <p>{el}</p>
                <button className='boton' onClick={()=> handleDelete(el)}>x</button>
            </div>)}
            </div>
            <div className='center1'>
            <Link to="/home">
                <button className='backcreate'>Volver</button>
            </Link>
            </div>
        </div>
        
    )
}