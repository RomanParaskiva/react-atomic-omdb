import React, { useState } from 'react'

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const clearSearchValue = () => {
    setSearchValue('')
  }

  const runSearch = (e) => {
    e.preventDefault()
    props.search(searchValue)
    clearSearchValue()
  }

  return (
    <form className="search">
      <input 
        value={searchValue}
        onChange={handleSearchValue}
        type="text" 
      />

      <input onClick={runSearch} type="submit" value="ИСКАТЬ" />
    </form>
  )
}

export default Search