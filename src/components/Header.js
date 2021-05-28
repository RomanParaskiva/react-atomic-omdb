import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

const Header = (props) => {

  const location = useLocation(),
    history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  if (location.pathname !== '/') {
    return (
      <header className="App-header">
        <Link className="header-title" to="/" ><h2>{props.text}</h2></Link>
        <div className="switch">
          <label>
            Фильмы
            <input type="checkbox" name="changeSearch"/>
            <span className="lever"></span>
            Сериалы
          </label>
        </div>
        <Link to="/" >Главная</Link>
        <span className="" onClick={goBack}>Назад</span>
      </header>
    )
  } else {
    return (
      <header className="App-header">
        <Link className="header-title" to="/" ><h2>{props.text}</h2></Link>
      </header>
    )
  }
}

export default Header