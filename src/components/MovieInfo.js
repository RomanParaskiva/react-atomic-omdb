import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MovieInfo = ({ movie, openHandler }) => {
    const IMG_API_URL = "https://image.tmdb.org/t/p/w500",
        DEFAULT_PLACEHOLDER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
        [actors, setActors] = useState([])

    let actorsList, filmsList = []


    const handler = () => {
        openHandler(null)
        document.body.style.overflow = ""
    }

    const getCredits = async (id) => {
        const res = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        res.status === 200 && setActors(res.data.cast)
    }

    const getPersonMovies = async (e) => {
        const res = await axios(`https://api.themoviedb.org/3/person/${e.target.dataset.id}/movie_credits?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        console.log(res)
        filmsList = res.data.cast.map(item =>
            <img alt={item.character} src={IMG_API_URL + item.backdrop_path} />
        )
    }

    useEffect(() => {
        getCredits(movie.id)
    }, [movie.id])

    actorsList = actors.map(item => {
        console.log(item)
        return <li onClick={getPersonMovies} data-id={item.id} key={item.id}>
            {item.original_name}
            <img loading="lazy" alt={item.name} src={item.profile_path ? IMG_API_URL + item.profile_path : DEFAULT_PLACEHOLDER_IMAGE} />
        </li>
    })



    return (
        <div className="modal">
            <div className="modal__wrapper">
                <i className="material-icons modal-close" onClick={handler}>clear</i>
                <ul>
                    {filmsList ? filmsList : ''}
                </ul>
                <div className="left">
                    <img src={IMG_API_URL + movie.backdrop_path} alt={movie.title} />
                    <h5>{movie.title}</h5>
                    <span>{movie.original_title}</span>
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