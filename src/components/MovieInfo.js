import React from 'react'

const MovieInfo = ({ movie }) => {
    console.log(movie)
    const IMG_API_URL = "https://image.tmdb.org/t/p/w500"
    return (
        <div className="modal">
            <i className="material-icons">clear</i>
            <div className="left">
                <img src={IMG_API_URL + movie.backdrop_path} alt={movie.title} />
            </div>

            <div className="right">
                <h5>{movie.title}</h5>
                <p>{movie.overview}</p>
            </div>
        </div>
    )
}

export default MovieInfo