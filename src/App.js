import React, {useState, useEffect} from 'react'

import Header from './components/Header'
import Movie from './components/Movie'
import Search from './components/Search'

import './App.css'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=3aa396"


const App = () => {

  const [loading, setLoading] = useState(true),
        [movies, setMovies] = useState([]),
        [errorMessage, setErrorMessage] = useState(null)

  useEffect(async () => {
    const res = await fetch(MOVIE_API_URL),
          json = await res.json()
        setMovies(json.Search)
        setLoading(false)
  }, [])

  const search = async (searchValue) => {
    setLoading(true)
    setErrorMessage(null)

   const res = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=3aa396`),
        json = await res.json()

        if (json.Response === "True") {
          setMovies(json.Search);
          setLoading(false);
        } else {
          setErrorMessage(json.Error);
          setLoading(false);
        }
   
    setLoading(false)
    console.log(searchValue)
  }



  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App
