import React from 'react'

const Search = (props) => {

  return (
    <form className="search col s12">
     
      {props.searchValue ? <i className="material-icons clear" onClick={props.clearSearchValue}>clear</i> : ''}
        <div className="input-field inline">
          <input
            id="search"
            value={props.searchValue}
            onChange={props.handleSearchValue}
            type="text"
            className="validate browser-default"
          />
          <label htmlFor="search">Поиск</label>
        </div>
    </form>
  )
}

export default Search