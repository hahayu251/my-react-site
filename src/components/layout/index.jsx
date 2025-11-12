import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar'
import Header from './header'

export default function layout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  )
}
