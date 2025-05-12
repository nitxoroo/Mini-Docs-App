import { useState } from 'react'

import './App.css'
import Background from './components/background'
import Forground from './components/forground'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="classname w-full h-screen bg-zinc-800 bg ">
      <Background/>
      <Forground/>
    </div>
    </>
  )
}

export default App
