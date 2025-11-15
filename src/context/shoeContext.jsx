import React from 'react'
import{useState,useEffect,createContext} from "react"

const ShoeContext=createContext()
const ShoeProvider = ({children}) => {
  const [shoesData,setShoesData]=useState([])

  useEffect(()=>{
    fetch("/shoeDetails.json").then(res=>res.json()).then(data=>setShoesData(data))

  },[])
  return (
    <ShoeContext.Provider value={{shoesData}}>
      {children}
    </ShoeContext.Provider>
  )
}

export  {ShoeProvider,ShoeContext}