import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Preloader from './Preloader'

const MovieInfo = ({ id }) => {
    const IMG_API_URL = "https://image.tmdb.org/t/p/w500",
        DEFAULT_PLACEHOLDER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
        [actors, setActors] = useState([]),
        [movie, setMovie] = useState({}),
        [loading, setLoading] = useState(true),
        [actorsList, setActorsList] = useState([]),
        [imgList, setImgList] = useState([])
    

        let arr = []


    const getMovie = async (id) => {
        const res = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        res.status === 200 && setMovie(res.data)
    }

    const getCredits = async (id) => {
        const res = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        res.status === 200 && setActors(res.data.cast)
    }

    const getImgs = useCallback(async (id) => {
        const res = await axios(`https://api.themoviedb.org/3/movie/${id}/images?api_key=15f70723a36f993b310bad745e6681ed`)
        if (res.status === 200) {
            if (res.data.backdrops) {
                res.data.backdrops.map(item => arr.push(<img key={item.file_path} src={IMG_API_URL + item.file_path} alt="" />))
            }
            if (res.data.posters) {
                res.data.posters.forEach(item => arr.push(<img key={item.file_path} src={IMG_API_URL + item.file_path} alt="" />))
            }

            setImgList(arr)
        }
    },[arr])

    useEffect(() => {
        if (id) {
            setLoading(true)
            getCredits(id)
            getMovie(id)
            getImgs(id)
            setLoading(false)
        }
    }, [id, getImgs])


    useEffect(() => {
        setLoading(true)
        setActorsList(actors.map(item => {
            return <li data-id={item.id} key={item.id}>
                <Link to={'/people/' + item.id} className="people__link">
                    <span>{item.character ? item.character + ' -' : ''} {item.original_name}</span>
                    <img loading="lazy" alt={item.name} src={item.profile_path ? IMG_API_URL + item.profile_path : DEFAULT_PLACEHOLDER_IMAGE} />
                </Link>
            </li>
        })
        )
        setLoading(false)
    }, [actors])

    if (!loading) {
        return (
            <div className="movie__info">
                <div className="movie__info-wrapper">
                    <div className="left">
                        <img src={movie.backdrop_path ? IMG_API_URL + movie.backdrop_path : IMG_API_URL + movie.poster_path} alt={movie.title} />
                        <h5>{movie.title}</h5>
                        <span>{movie.original_title}</span>
                        <span>Бюджет : {movie.budget}</span>
                        <p>{movie.overview}</p>
                        <span>Популярность : {movie.popularity} / Голоса : {movie.vote_count}</span>
                        <div className="img-list-wrapper">
                            {imgList}
                        </div>
                    </div>

                    <div className="right">
                        <ul>
                            {actorsList}
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Preloader />
    }

}

export default MovieInfo