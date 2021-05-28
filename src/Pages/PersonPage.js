import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Preloader from '../components/Preloader'

const PersonPage = () => {
    const IMG_API_URL = "https://image.tmdb.org/t/p/w500",
        DEFAULT_PLACEHOLDER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
        [loading, setLoading] = useState(false),
        [person, setPerson] = useState({}),
        [filmList, setFilmList] = useState([]),
        { id } = useParams()





    const getPersonInfo = async (id) => {
        const res = await axios(`https://api.themoviedb.org/3/person/${id}?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        res.status === 200 && setPerson(res.data)
    }

    const getFilmList = useCallback(async (id) => {
        const res = await axios(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=15f70723a36f993b310bad745e6681ed&language=en-US`)
        if (res.status === 200) {
            const list = await res.data.cast.map((el, i) => {
                return <li className="film-list__item" key={i}>
                    <Link to={'/movie/' + el.id}>
                        <div className="film-list__item-info">
                            <h4>{el.title}</h4>
                            <span>Дата выхода: {el.release_date ? formatDate(new Date(el.release_date)) : 'Неизвестно'}</span>
                            <span>Роль: {el.character}</span>
                            <span>Рейтинг: {el.vote_average}</span>
                        </div>
                        <img src={el.poster_path ? IMG_API_URL + el.poster_path : DEFAULT_PLACEHOLDER_IMAGE} alt={el.original_title} />
                    </Link>
                </li>
            })
            setFilmList(list)
        }
    }, [])

    const formatDate = (date) => {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear()

        return dd + '-' + mm + '-' + yy;
    }
   
    useEffect(() => {
       try {
        setLoading(true)
        getPersonInfo(id)
        getFilmList(id)
        setLoading(false)
       } catch (e) {}
    }, [id, getFilmList])



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
                        {filmList}
                    </ul>
                </div>
            </div>
        )
    } else {
        return (<Preloader />)
    }
}

export default PersonPage
