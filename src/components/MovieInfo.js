import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useOptions } from '../hooks/options.hook'
import Preloader from './Preloader'

const MovieInfo = ({ id }) => {
        const [actors, setActors] = useState([]),
        [movie, setMovie] = useState({}),
        [actorsList, setActorsList] = useState([]),
        [imgList, setImgList] = useState([]),
        {loading, request} = useHttp(),
        { IMG_API_URL, DEFAULT_PLACEHOLDER_IMAGE} = useOptions()
     


    const getMovie = useCallback( async (id) => {
        const res = await request(`https://api.themoviedb.org/3/movie/${id}?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        res && setMovie(res)
    },[request])

    const getCredits = useCallback( async (id) => {
        const res = await request(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        res && setActors(res.cast)
    },[request])

    const getImgs = useCallback(async (id) => {
        let arr = []
        const res = await request(`https://api.themoviedb.org/3/movie/${id}/images?api_key=15f70723a36f993b310bad745e6681ed`)
        if (res) {
            if (res.backdrops) {
                res.backdrops.map(item => arr.push(<img key={item.file_path} src={IMG_API_URL + item.file_path} alt="" />))
            }
            if (res.posters) {
                res.posters.forEach(item => arr.push(<img key={item.file_path} src={IMG_API_URL + item.file_path} alt="" />))
            }   
            setImgList(arr)
        }
    },[request, IMG_API_URL])

    

    useEffect(() => {
        try {
            getCredits(id)
            getMovie(id)
            getImgs(id)
        } catch(e){}
    }, [])

    useEffect(() => {
        setActorsList(actors.map(item => {
            return <li data-id={item.id} key={item.id}>
                <Link to={'/people/' + item.id} className="people__link">
                    <span>{item.character ? item.character + ' -' : ''} {item.original_name}</span>
                    <img loading="lazy" alt={item.name} src={item.profile_path ? IMG_API_URL + item.profile_path : DEFAULT_PLACEHOLDER_IMAGE} />
                </Link>
            </li>
        }))
    },[actors, IMG_API_URL, DEFAULT_PLACEHOLDER_IMAGE])



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