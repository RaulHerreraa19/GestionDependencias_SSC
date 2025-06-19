import { useEffect, useState } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/api/users')
    .then(res => res.json())
    .then(data => console.log(data))
  })

  return (
    <>
      <h1>Hola</h1>
    </>
  )
}

export default App
