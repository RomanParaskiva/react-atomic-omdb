import React from 'react'
import {Link} from 'react-router-dom'

const DEFAULT_PLACEHOLDER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
  IMG_API_URL = "https://image.tmdb.org/t/p/w500"

const Movie = ({ movie }) => {
  const poster = !movie.poster_path ? DEFAULT_PLACEHOLDER_IMAGE : IMG_API_URL + movie.poster_path,
    movieLink = '/movie/' + movie.id
  let overview = movie.overview ? movie.overview : 'Описание не найдено'

  return (
      <Link to={movieLink}>
        <div className="movie">

          
          <div className="movie__img-wrapper">
            <img width="200"
              alt={`Название: ${movie.title}`}
              src={poster}
            />
            <div className="movie__reviews"> {overview} </div>
          </div>
          <div className="movie__footer">
            <span className="movie__title">{movie.title}</span>
            <span className="movie__raiting">{movie.vote_average}</span>
          </div>

        </div>
      </Link>
  )
}

export default Movie