import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import {useRoutes} from './routes/routes'
import Header from './components/Header'
import M from 'materialize-css'

import './assets/dist/index.css'

M.AutoInit()

const App = () => {
  const router = useRoutes()


  return (
    <Router>
      <div className="App">
        <Header text="Фильмопоиск" />
        {router}
      </div>
    </Router>
  )
}

export default App
