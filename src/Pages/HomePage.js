import React, { useState, useEffect } from 'react'

import Movie from '../components/Movie'
import Search from '../components/Search'
import Pagination from '../components/Pagination'
import Preloader from '../components/Preloader'

import {useHttp} from '../hooks/http.hook'

const MOVIE_API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=15f70723a36f993b310bad745e6681ed&language=ru&include_adult=true&page="

const HomePage = () => {
    const [movies, setMovies] = useState([]),
    [errorMessage, setErrorMessage] = useState(null),
    [page, setPage] = useState(1),
    [pageTotal, setPageTotal] = useState(0),
    [searchValue, setSearchValue] = useState(''),
    {loading, request} = useHttp()

  
 
getMovies()
  useEffect(async() => {

    const data = await request(MOVIE_API_URL)
  setMovies(data.results)  
  }, [])

  const search = async () => {

    const queryStr = '&query=',
      pageStr = '&page=',
      url = 'https://api.themoviedb.org/3/search/movie?api_key=15f70723a36f993b310bad745e6681ed&include_adult=true&language=ru'
      
    page === undefined ? setPage(0) : setPage(page)

    const data = await request(url + queryStr + searchValue + pageStr + page)
    console.log(data)
    data.results && setMovies(data.results)
    setPage(data.page)
    setPageTotal(data.total_pages)
    data.status_message && setErrorMessage(data.status_message)   
  }

  const nextPage = () => {
    setPage(page + 1)
    search()
  }

  const prevPage = () => {
    setPage(page - 1)
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

