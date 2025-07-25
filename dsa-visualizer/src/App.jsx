import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navbar} from './components/Navbar.jsx'
import {SortingVisualizer} from './components/Sorting/SortingVisualizer.jsx'
function App() {

  return (
    <>
      <Navbar/>
      <SortingVisualizer/>
    </>
  )
}

export default App
