import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import Movie from './components/Movie'
import Search from './components/Search'
import axios from 'axios'

import './App.css'
import Pagination from './components/Pagination'

const MOVIE_API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=15f70723a36f993b310bad745e6681ed"
 


const App = () => {

  const [loading, setLoading] = useState(true),
    [movies, setMovies] = useState([]),
    [errorMessage, setErrorMessage] = useState(null),
    [page, setPage] = useState(0),
    [pageTotal, setPageTotal] = useState(null)

    const fetchData = async () => {
      const res = await axios(MOVIE_API_URL)
      setMovies(res.data.results)
      setPage(res.data.page)
      setPageTotal(res.data.total_pages)
      console.log(res.data)
    }

  useEffect(() => {
    
    
    fetchData()
    setLoading(false)
  }, [])

  const search = async (searchValue) => {
    setLoading(true)
    setErrorMessage(null)

    const res = await axios(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=15f70723a36f993b310bad745e6681ed&include_adult=true`)

    res.data.results && setMovies(res.data.results) 
    setPageTotal(res.data.total_pages)
    res.data.status_message && setErrorMessage(res.data.status_message) 
    setLoading(false)

  }



  return (
    <div className="App">
      <Header text="Фильмопоиск" />
      <Search search={search} />
      <p className="App-intro">Информация о любых фильмах</p>
      
      <Pagination total={pageTotal}/>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.title}`} movie={movie} />
          ))
        )}
      </div>



      { page }
    </div>
  );
}

export default App
