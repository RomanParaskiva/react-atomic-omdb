import React from 'react'
import {useOptions} from '../hooks/options.hook'

export const PersonInfo = ({person}) => {
    const {IMG_API_URL, DEFAULT_PLACEHOLDER_IMAGE, formatDate} = useOptions()

    
    return (
        <>
        <h3>{person.name}</h3>
        <div className="person__img-wrapper">
            <img src={person.profile_path ? IMG_API_URL + person.profile_path : DEFAULT_PLACEHOLDER_IMAGE} alt="" />
        </div>
        <div className="person__info">
            
            <span>Дата рождения: {formatDate(new Date(person.birthday))}</span>
            <span>Место рождения: {person.place_of_birth ? person.place_of_birth : 'Не известно'}</span>
            <span>Популярность: {person.popularity ? person.popularity : 'Не популярный актер получается'}</span>
            <h4>Биография</h4>
            <p>{person.biography ? person.biography : 'Отсутствует'}</p>
        </div>
        </>
    )
}