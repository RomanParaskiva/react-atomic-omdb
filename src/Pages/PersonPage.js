import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FilmListItem } from '../components/FilmListItem'
import Preloader from '../components/Preloader'
import { useHttp } from '../hooks/http.hook'
import { useOptions } from '../hooks/options.hook'
import { usePerson } from '../hooks/person.hook'

const PersonPage = () => {
        const { id } = useParams(),
        [personId, setPersonId] = useState(null),
        [person, setPerson] = useState({}),
        [films, setFilms] = useState([]),
        {loading} = useHttp(),
        {IMG_API_URL, DEFAULT_PLACEHOLDER_IMAGE, formatDate} = useOptions(),
        {getFilmList, getPersonInfo} = usePerson()
      
        useEffect(()=> {
           setPersonId(id)
           getData()
        },[id])


        const getData = async () => {
            const filmsData = await getFilmList(personId),
            personData = await getPersonInfo(personId)

            console.log(filmsData)
            filmsData && setFilms(filmsData.cast)
            personData && setPerson(personData) 
        }
       
         

 
    if (!loading) {
        return (
            <div className="person-wrapper">
                <div className="left">
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
                </div>

                <div className="right">
                    <h4>Фильмография</h4>
                    <ul className="person__film-list">
                        {films.map((item, i) => <FilmListItem key={i} item={item} />)}
                    </ul>
                </div>
            </div>
        )
    } else {
        return (<Preloader />)
    }
}

export default PersonPage
