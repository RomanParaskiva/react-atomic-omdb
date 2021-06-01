import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { FilmListItem } from '../components/FilmListItem'
import {PersonInfo} from '../components/PersonInfo'
import Preloader from '../components/Preloader'

import { useHttp } from '../hooks/http.hook'
import { usePerson } from '../hooks/person.hook'

const PersonPage = () => {
        const { id } = useParams(),
        [personId, setPersonId] = useState(null),
        [person, setPerson] = useState({}),
        [films, setFilms] = useState([]),
        {loading} = useHttp(),
        {getFilmList, getPersonInfo} = usePerson()
      
        const getData = useCallback(async (id) => {
            const filmsData = await getFilmList(id),
            personData = await getPersonInfo(id)
            filmsData && setFilms(filmsData.cast)
            personData && setPerson(personData) 
        },[])

        useEffect( ()=> {
            (async function(){setPersonId(id)
          await getData(id)
           }())
        },[id, getData])


        return (
            <div className="person-wrapper">
                <div className="left">
                {loading ? <Preloader/> : <PersonInfo key={personId} person={person} />}
                </div>

                <div className="right">
                    <h4>Фильмография</h4>
                    <ul className="person__film-list">
                    {loading ? <Preloader/> : films.map((item, i) => <FilmListItem key={i} item={item} />)}
                    </ul>
                </div>
            </div>
        )
}

export default PersonPage
