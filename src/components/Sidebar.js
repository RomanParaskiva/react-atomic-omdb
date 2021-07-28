import React, {useState} from 'react'

import { useOptions } from '../hooks/options.hook'

const Sidebar = ({setFlag}) => {
    const [showMenu, setShowMenu] = useState(false),
    { TOP_API_URL, UPCOMING_API_URL, NOW_API_URL} = useOptions()

    const handleMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleClick = (e) => {
        setFlag(e.target.id)
    }

    return (
        <div className="sidebar">
            <button className="sidebar__btn" onClick={handleMenu}>
                <span className="material-icons">
                    settings
                </span>
            </button>
            <ul className={ showMenu ? 'show' : ''}>
                <li onClick={handleClick} id={NOW_API_URL} className="sidebar__menu-item">Сейчас в кинотеатрах</li>
                <li onClick={handleClick} id={UPCOMING_API_URL} className="sidebar__menu-item">Скоро на экранах</li>
                <li onClick={handleClick} id={TOP_API_URL} className="sidebar__menu-item">Топчик</li>
            </ul>
        </div>
    )
}

export default Sidebar