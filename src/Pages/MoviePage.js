import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import MovieInfo from '../components/MovieInfo'

const MoviePage = () => {
    const [movieId, setMovieId] = useState(null)
    const {id} = useParams()
    setMovieId(id)
    

    return (
        <>
            <MovieInfo id={movieId} />
        </>
    )
}

export default MoviePage
