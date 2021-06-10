import React from 'react'

const Search = (props) => {

  return (
    <form className="search col s12">
      <div className="row">
      {props.searchValue ? <i className="material-icons clear" onClick={props.clearSearchValue}>clear</i> : ''}
        <div className="input-field inline">
          <input
            id="search"
            value={props.searchValue}
            onChange={props.handleSearchValue}
            type="text"
            className="validate"
          />
          <label htmlFor="search">Поиск</label>
        </div>

        <button disabled={!props.searchValue} className="waves-effect waves-light btn-small" onClick={props.runSearch} type="submit">искать</button>
      </div>
    </form>
  )
}

export default Search