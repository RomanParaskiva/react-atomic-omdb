import React from 'react'

const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
  IMG_API_URL = "https://image.tmdb.org/t/p/w500"

const Movie = ({ movie, openHandler }) => {
  const poster = !movie.poster_path ? DEFAULT_PLACEHOLDER_IMAGE : movie.poster_path
    let overview

  overview = movie.overview ? movie.overview : 'Описание не найдено'

  const handler = () => {
    openHandler(movie.id)
  }
  return (
    <a onClick={handler} href="#!">
      <div className="movie">
        <h5>{movie.title}</h5>
        <div className="movie__img-wrapper">
          <img
            width="200"
            alt={`Название: ${movie.title}`}
            src={IMG_API_URL + poster}
          />
          <div className="movie__reviews">
          {overview}
          </div>
        </div>
        <p>({movie.release_date})</p>

      </div>
    </a>
  )
}

export default Movie