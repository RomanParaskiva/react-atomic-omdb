import React from 'react'
import {Link} from 'react-router-dom'
import {useOptions} from '../hooks/options.hook'

export const FilmListItem = ({item}) => {
    const  {IMG_API_URL, DEFAULT_PLACEHOLDER_IMAGE, formatDate} = useOptions()
    return (
        <li className="film-list__item">
            <Link to={'/movie/' + item.id}>
                <div className="film-list__item-info">
                    <h4>{item.title}</h4>
                    <span>Дата выхода: {item.release_date ? formatDate(new Date(item.release_date)) : 'Неизвестно'}</span>
                    <span>Роль: {item.character}</span>
                    <span>Рейтинг: {item.vote_average}</span>
                </div>
                <img src={item.poster_path ? IMG_API_URL + item.poster_path : DEFAULT_PLACEHOLDER_IMAGE} alt={item.original_title} />
            </Link>
        </li>
    )
}