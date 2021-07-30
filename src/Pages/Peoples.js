import React, { useState, useEffect, useContext } from 'react'

import Search from '../components/Search'
import PeoplesGrid from '../components/PeoplesGrid'

import { useOptions } from '../hooks/options.hook'
import { useHttp } from '../hooks/http.hook'
import { SearchContext } from '../context/SearchContext'



const Peoples = () => {
    const [searchValue, setSearchValue] = useState(''),
        { switcher } = useContext(SearchContext),
        { PEOPLE_API_URL, POPULAR_PEOPLE_API_URL } = useOptions(switcher),
        { request } = useHttp(),
        [page, setPage] = useState(1),
        [totalPage, setTotalPage] = useState(0),
        [peoples, setPeoples] = useState([]),
        [url, setUrl] = useState(POPULAR_PEOPLE_API_URL),
        pageStr = '&page=',
        queryStr = '&query='

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)
        setUrl(PEOPLE_API_URL)
        setPeoples([])
    }

    const clearSearchValue = () => {
        setSearchValue('')
    }


    const nextPage = () => {
        setPage(page + 1)
    }

    useEffect(() => {

        const fetchPeoples = async () => {
            try {
                let data

                if(searchValue) {
                     data = await request(url + pageStr + page + queryStr + searchValue)
                } else {
                     data = await request(url + pageStr + page)
                }

                const temp = [...peoples, ...data.results]

                data.results && setPeoples(temp.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))

                setTotalPage(data.total_pages)

            } catch (e) { }
        }
        fetchPeoples()
    }, [page, searchValue])


    const scrollHandler = (e) => {
        const elHeight = e.target.scrollHeight,
            scrollTop = e.target.scrollTop

        if (elHeight - scrollTop === e.target.offsetHeight) {
            nextPage()
        }
    }

    return (
        <>
            <div className="search__wrapper">
                <Search
                    searchValue={searchValue}
                    handleSearchValue={handleSearchValue}
                    clearSearchValue={clearSearchValue}
                />
            </div>
            <div className="grid__wrapper" onScroll={scrollHandler}>
                <PeoplesGrid
                    peoplesData={peoples}
                />
            </div>
        </>
    )
}

export default Peoples