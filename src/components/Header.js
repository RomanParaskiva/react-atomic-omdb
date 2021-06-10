import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import {useSwitch} from '../hooks/switch.hook'

const Header = () => {

  const location = useLocation(),
    history = useHistory(),
    {changeSwitcher,switcher} = useSwitch()

  const goBack = () => {
    history.goBack()
  }

  const menuEl = <><Link to="/" >Главная</Link> <span className="back-btn" onClick={goBack}>Назад</span></>
 

  
    return (
      <header className="App-header">
        <Link className="header-title" to="/" ><h2>{switcher === 'movie' ? 'Фильмопоиск' : 'Сериалопоиск'}</h2></Link>
        <div className="switch">
          <label>
            Фильмы
            <input type="checkbox" name="changeSearch"  onChange={changeSwitcher}/>
            <span className="lever"></span>
            Сериалы
          </label>
        </div>
        {location.pathname !== '/' ? menuEl : ''}
      </header>
    )
}

export default Header