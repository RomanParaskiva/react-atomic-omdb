import { useState, useContext, useEffect } from "react"

import { useOptions } from '../hooks/options.hook'
import { useHttp } from '../hooks/http.hook'
import { useSearch } from '../hooks/search.hook'

import { SearchContext } from '../context/SearchContext'

export const useGlobal = () => {
    const [movies, setMovies] = useState([]),
        [page, setPage] = useState(1),
        { request } = useHttp(),
        { switcher } = useContext(SearchContext),
        { SEARCH_API_URL, MOVIE_API_URL } = useOptions(switcher),
        { searchValue } = useSearch(),
        [pageTotal, setPageTotal] = useState(0)


    const fetchMovies = async (url = MOVIE_API_URL) => {
        try {
            const queryStr = '&query=',
                pageStr = '&page='

            console.log(url)
            console.log(searchValue)
            const req = searchValue ? SEARCH_API_URL + queryStr + searchValue : url
            console.log(req)
            const data = await request(req + pageStr + page)
            data.results && setMovies(data.results)

            setPageTotal(data.total_pages)

        } catch (e) { }
    }

    useEffect(() => {
        fetchMovies()
    }, [switcher])

    return { movies, fetchMovies, page, setPage, pageTotal, setPageTotal }
}