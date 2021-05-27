import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Preloader from './Preloader'

const MovieInfo = ({ id, openHandler }) => {
    const IMG_API_URL = "https://image.tmdb.org/t/p/w500",
        DEFAULT_PLACEHOLDER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
        [actors, setActors] = useState([]),
        [movie, setMovie] = useState({}),
        [loading, setLoading] = useState(false)

    let actorsList, filmsList = []


    const handler = () => {
        openHandler(null)
        document.body.style.overflow = ""
    }

    const getMovie = async (id) => {
        const res = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        console.log(res)
        res.status === 200 && setMovie(res.data)
    }

    const getCredits = async (id) => {
        const res = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        console.log(res)
        res.status === 200 && setActors(res.data.cast)
    }

    useEffect(() => {
        setLoading(true)
        getCredits(id)
        getMovie(id)
        console.log(movie)
        setLoading(false)
    }, [id])

    actorsList = actors.map(item => {
        return <li data-id={item.id} key={item.id}>
            <Link to={'/people/' + item.id}  className="people__link">

                <span>{item.character} -  {item.original_name}</span>
                <img loading="lazy" alt={item.name} src={item.profile_path ? IMG_API_URL + item.profile_path : DEFAULT_PLACEHOLDER_IMAGE} />
            </Link>
        </li>
    })



    return (
        <div className="movie__info">
            {loading && <Preloader />}
            <div className="movie__info-wrapper">
                <ul>
                    {filmsList ? filmsList : ''}
                </ul>
                <div className="left">
                    <img src={IMG_API_URL + movie.backdrop_path} alt={movie.title} />
                    <h5>{movie.title}</h5>
                    <span>{movie.original_title}</span>
                    <span>Бюджет : {movie.budget}</span>
                    <p>{movie.overview}</p>
                    <span>Популярность : {movie.popularity} / Голоса : {movie.vote_count}</span>
                </div>

                <div className="right">
                    <ul>
                        {actorsList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo