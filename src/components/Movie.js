import React from 'react'

const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
      IMG_API_URL = "https://image.tmdb.org/t/p/w500"

  const Movie = ({ movie }) => {
    const poster = !movie.poster_path ? DEFAULT_PLACEHOLDER_IMAGE : movie.poster_path

    return(
      <div className="movie">
        <h2>{movie.title}</h2>
        <div>
        <img
          width="200"
          alt={`Название: ${movie.title}`}
          src={IMG_API_URL + poster}
        />
      </div>
      <p>({movie.release_date})</p>
      </div>
    )
  }

  export default Movie