import React, { useState, useEffect, useContext } from 'react'

import Movie from '../components/Movie'
import Search from '../components/Search'
import Pagination from '../components/Pagination'
import Preloader from '../components/Preloader'

import { useHttp } from '../hooks/http.hook'
import { useOptions } from '../hooks/options.hook'

import { SearchContext } from '../context/SearchContext'

const HomePage = () => {
  const switcher = useContext(SearchContext),
    [movies, setMovies] = useState([]),
    [errorMessage, setErrorMessage] = useState(null),
    [page, setPage] = useState(1),
    [pageTotal, setPageTotal] = useState(0),
    [searchValue, setSearchValue] = useState(''),
    { loading, request } = useHttp(),
    { MOVIE_API_URL } = useOptions()

  const getFirstMovies = async () => {
    try {
      const res = await request(MOVIE_API_URL)
      setMovies(res.results)
    } catch (e) { }
  }
  console.log(switcher)

  useEffect(() => {
    getFirstMovies()
  }, [])

  const search = async () => {
    const queryStr = '&query=',
      pageStr = '&page=',
      url = `https://api.themoviedb.org/3/search/movie?api_key=15f70723a36f993b310bad745e6681ed&language=ru`

    page === undefined ? setPage(0) : setPage(page)

    const data = await request(url + queryStr + searchValue + pageStr + page)
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
      {switcher == 'movie' ? <p className="App-intro">Информация о любых фильмах</p> : <p className="App-intro">Информация о любых сериалах</p>}

      {/* {pageTotal > 0 ? pagination : ''} */}
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

