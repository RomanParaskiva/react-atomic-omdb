import React, { useState, useEffect } from 'react'


import Movie from '../components/Movie'
import Search from '../components/Search'
import Pagination from '../components/Pagination'
import Preloader from '../components/Preloader'
import MovieInfo from '../components/MovieInfo'

import axios from 'axios'

const MOVIE_API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=15f70723a36f993b310bad745e6681ed&language=ru&include_adult=true&page="

const HomePage = () => {
    let [loading, setLoading] = useState(true),
    [movies, setMovies] = useState([]),
    [errorMessage, setErrorMessage] = useState(null),
    [page, setPage] = useState(1),
    [pageTotal, setPageTotal] = useState(0),
    [searchValue, setSearchValue] = useState('')

  const fetchData = async () => {
    const res = await axios(MOVIE_API_URL)
    setMovies(res.data.results)    
  }

  useEffect(() => {
    fetchData()
    setLoading(false)
  }, [])

  const search = async () => {
    setLoading(true)
    setErrorMessage(null)

    const queryStr = '&query=',
      pageStr = '&page=',
      url = 'https://api.themoviedb.org/3/search/movie?api_key=15f70723a36f993b310bad745e6681ed&include_adult=true&language=ru'
      
    page = page === undefined ? '' : page 


    const res = await axios(url + queryStr + searchValue + pageStr + page)
    console.log(res)
    res.data.results && setMovies(res.data.results)
    setPage(res.data.page)
    setPageTotal(res.data.total_pages)
    res.data.status_message && setErrorMessage(res.data.status_message)
    setLoading(false)
   
  }

  const nextPage = () => {
    setPage(page++)
    search()
  }

  const prevPage = () => {
    setPage(page--)
    search()
  }

  
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const clearSearchValue = () => {
    setSearchValue('')
  }

  const runSearch = (e) => {
    e.preventDefault()
    search(searchValue)
  }

   

  const pagination = <Pagination
   pageTotal={pageTotal}
   page={page}
   prevPage={prevPage}
   nextPage={nextPage}
   />

    return (
        <>
            <Search
                searchValue={searchValue}
                handleSearchValue={handleSearchValue}
                runSearch={runSearch}
                clearSearchValue={clearSearchValue}
            />
            <p className="App-intro">Информация о любых фильмах</p>

            {pageTotal > 0 ? pagination : ''}
            <div className="movies">
                {loading && !errorMessage ? (
                    <Preloader />
                ) : errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    movies.map((movie, index) => (
                        <Movie key={`${index}-${movie.title}`} movie={movie} />
                    ))
                )}
            </div>

        </>
    )
}

export default HomePage

