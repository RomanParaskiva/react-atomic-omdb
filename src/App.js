import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/Header'
import { SearchContext } from './context/SearchContext'
import { useRoutes } from './routes/routes'
import { useSwitch } from './hooks/switch.hook'
import M from 'materialize-css'

import './assets/dist/index.css'


M.AutoInit()

const App = () => {
  const router = useRoutes(),
    {switcher} = useSwitch()


  return (
    <SearchContext.Provider value={switcher}>
      <Router>
        <div className="App">
          <Header />
          {router}
        </div>
      </Router>
    </SearchContext.Provider>
  )
}

export default App
