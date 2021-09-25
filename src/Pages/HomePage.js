import React, { useState, useEffect, useContext } from 'react'

import Movie from '../components/Movie'
import Search from '../components/Search'
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
    { request } = useHttp(),
    { MOVIE_API_URL, SEARCH_API_URL } = useOptions(switcher),
    queryStr = '&query=',
    pageStr = '&page='

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let data

        if (searchValue) {
          data = await request(SEARCH_API_URL + pageStr + page + queryStr + searchValue)
        } else {
          data = await request(MOVIE_API_URL + pageStr + page)
        }

        const temp = [...movies, ...data.results]

        data.results && setMovies(temp.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
        setPageTotal(data.total_pages)

      } catch (e) { }
    }
    fetchMovies()
  }, [page])




  useEffect( () => {
    const fetchMovies = async () =>{
      try {
        let data
        if (searchValue) {
          data = await request(SEARCH_API_URL + pageStr + page + queryStr + searchValue)
        } else {
          data = await request(MOVIE_API_URL + pageStr + 1)
        }

        const temp = data.results

        data.results && setMovies(temp.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
        setPageTotal(data.total_pages)

      } catch (e) { }
    }

    fetchMovies()
  },[switcher, searchValue])



  const nextPage = () => {
    setPage(page + 1)
  }

  const scrollHandler = (e) => {
    const elHeight = e.target.scrollHeight,
      scrollTop = e.target.scrollTop

    if (elHeight - scrollTop === e.target.offsetHeight) {
      nextPage()
    }
  }


  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
    setMovies([])

  }

  const clearSearchValue = () => {
    setSearchValue('')
    setPage(1)
  }

  return (
    <>
      <div className="search__wrapper">
        <Sidebar />
        <Search
          searchValue={searchValue}
          handleSearchValue={handleSearchValue}
          clearSearchValue={clearSearchValue}
        />

      </div>
      {switcher === 'movie' ? <p className="App-intro">Информация о любых фильмах</p> : <p className="App-intro">Информация о любых сериалах</p>}
      <div className="grid__wrapper" onScroll={scrollHandler}>
        <div className="grid">
          {movies.length > 0 ? movies.map((movie, index) => (
            <Movie key={`${index}-${movie.title}`} movie={movie} />
          )) : <h3>Ничего не найдено :((</h3>
          }
        </div>
      </div>
    </>
  )
}

export default HomePage

