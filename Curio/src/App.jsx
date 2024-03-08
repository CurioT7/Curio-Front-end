import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Error from './Components/Error/Error.jsx'
import { Link } from 'react-router-dom';
import SidebarComponent from './Components/SidebarComponent.jsx';

function App() {
  return (
    <div>
      <SidebarComponent />
    </div>
  )
}

export default App
