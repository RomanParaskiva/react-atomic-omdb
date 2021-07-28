import React, { useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { SearchContext } from '../context/SearchContext'

const Header = () => {
  const { switcher, changeSwitcher } = useContext(SearchContext),
    location = useLocation(),
    history = useHistory()

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
          <input type="checkbox" name="changeSearch" value={switcher} onClick={changeSwitcher} />
          <span className="lever"></span>
          Сериалы
        </label>
      </div>
      {location.pathname !== '/' ? menuEl : ''}
    </header>
  )
}

export default Header