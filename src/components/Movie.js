import React from 'react'

const DEFAULT_PLACEHOLDER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
  IMG_API_URL = "https://image.tmdb.org/t/p/w500"

const Movie = ({
  movie,
  openHandler
}) => {
  const poster = !movie.poster_path ? DEFAULT_PLACEHOLDER_IMAGE : IMG_API_URL + movie.poster_path
  let overview

  overview = movie.overview ? movie.overview : 'Описание не найдено'

  const handler = () => {
    openHandler(movie.id)
  }
  return (
    <a onClick = {handler} href = "#!">
      <div className="movie">

        <h5>{movie.title}</h5> 
        <div className="movie__img-wrapper"> 
          <img width = "200"
            alt = {`Название: ${movie.title}`}
            src = {poster}
          /> 
          <div className="movie__reviews"> {overview} </div> 
        </div> 
        <p>({movie.release_date})</p>

      </div> 
    </a>
  )
}

export default Movie