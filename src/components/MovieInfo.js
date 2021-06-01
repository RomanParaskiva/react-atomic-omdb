import React, {useEffect, useState} from 'react'

import { MovieActorItem } from './MovieActorItem'
import Preloader from './Preloader'

import { useHttp } from '../hooks/http.hook'
import { useOptions } from '../hooks/options.hook'
import {useMovie} from '../hooks/movie.hook'

const MovieInfo = ({ id }) => {
        const {loading} = useHttp(),
        {getCredits, getMovie, getImgs} = useMovie(id),
        {IMG_API_URL} = useOptions(),
        [actors, setActors] = useState([]),
        [movie, setMovie] = useState({}),
        [imgsList, setImgsList] = useState([])


    useEffect(() => {
        (async function(){
            getData(id)
        }())
    },[id])

    const getData = async (id) =>{
        const movieData = await getMovie(id),
             actorsData = await getCredits(id),
             imgsData = await getImgs(id)

             setActors(actorsData)
             setMovie(movieData)
             setImgsList(imgsData)
    }


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
                            {imgsList}
                        </div>
                    </div>

                    <div className="right">
                        <ul>
                            {actors.map((item, i) => <MovieActorItem key={i} item={item} />)}
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