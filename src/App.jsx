import React from 'react'
import {BrowserRouter,useRoutes} from 'react-router-dom'
import routes from './routes'//引入路由表

function AppRoutes(){
  const element=useRoutes(routes)
  return element
}

export default function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )  
}
