import React, { useState, useEffect, useContext } from 'react'

import Movie from '../components/Movie'
import Search from '../components/Search'
import Preloader from '../components/Preloader'
import Sidebar from '../components/Sidebar'

import { useHttp } from '../hooks/http.hook'
import { useOptions } from '../hooks/options.hook'

import { SearchContext } from '../context/SearchContext'

const HomePage = () => {
  const { switcher } = useContext(SearchContext),
    [movies, setMovies] = useState([]),
    [page, setPage] = useState(1),
    [pageTotal, setPageTotal] = useState(0),
    [searchValue, setSearchValue] = useState(''),
    { loading, request } = useHttp(),
    { MOVIE_API_URL, SEARCH_API_URL } = useOptions(switcher),
    [flag, setFlag] = useState(MOVIE_API_URL)



  const fetchMovies = async (flag) => {
    try {
      const queryStr = '&query=',
        pageStr = '&page='

      let url 

      if (searchValue) {
        url = SEARCH_API_URL + queryStr + searchValue
      } else {
        url = flag
      }
      const data = await request(url + pageStr + page)
      
      data.results && setMovies(data.results)
      setPageTotal(data.total_pages)

    } catch (e) { }
  }



  useEffect(() => {
    fetchMovies(flag)
  }, [switcher, searchValue, page, flag])


  const nextPage = () => {
    setPage(page + 1)
  }


  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const clearSearchValue = () => {
    setSearchValue('')
    fetchMovies()
  }

  const runSearch = (e) => {
    e.preventDefault()
    fetchMovies()
  }

  return (
    <>
      <div className="search__wrapper">
        <Sidebar setFlag={setFlag} />
        <Search
          searchValue={searchValue}
          handleSearchValue={handleSearchValue}
          runSearch={runSearch}
          clearSearchValue={clearSearchValue}
        />

      </div>
      {switcher === 'movie' ? <p className="App-intro">Информация о любых фильмах</p> : <p className="App-intro">Информация о любых сериалах</p>}

      <div className="movies">
        {loading ? (
          <Preloader />
        ) : (
          movies.length > 0 ? movies.map((movie, index) => (
            <Movie key={`${index}-${movie.title}`} movie={movie} />
          )) : <h3>Ничего не найдено :((</h3>
        )}
      </div>

      <div className="flex info__btn-wrapper">
        <div className="waves-effect waves-light btn-small ma" onClick={nextPage}>Загрузить еще</div>
      </div>

    </>
  )
}

export default HomePage

