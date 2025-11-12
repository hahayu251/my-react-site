import React from 'react'
import {useNavigate} from 'react-router-dom'
import classes from './index.module.css'

export default function SubMenuItem(props) {
   const navigate =useNavigate()

    const {title,path}=props.children
    return (
        <div 
        className={classes.subtitle} 
        onClick={()=>{navigate(path)}}
        >{title}</div>
    )
}
