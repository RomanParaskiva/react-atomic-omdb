import React, { useState } from 'react'

import { Link } from 'react-router-dom'

const Sidebar = ({ setFlag }) => {
    const [showMenu, setShowMenu] = useState(false)

    const handleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className="sidebar">
            <button className="sidebar__btn" onClick={handleMenu}>
                <span className="material-icons">
                    settings
                </span>
            </button>
            <ul className={showMenu ? 'show' : ''}>            
                <li className="sidebar__menu-item"><Link to="peopleSearch">Поиск по актерам</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar