import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Error from './Components/Error/Error.jsx'

function App() {


  return (
    <div>
      <Routes>
        <Route path='*' element={<Error/>} />
      </Routes>
    </div>
  )
}

export default App
