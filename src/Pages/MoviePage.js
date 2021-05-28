import React from 'react'
import {useParams} from 'react-router-dom'
import MovieInfo from '../components/MovieInfo'

const MoviePage = () => {
    const {id} = useParams()
    

    return (
        <div>
            <MovieInfo id={id} />
        </div>
    )
}

export default MoviePage
