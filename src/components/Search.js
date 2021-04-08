import React, {useEffect} from 'react'

const Search = (props) => {
  
useEffect(() => {
  document.querySelector('.clear').addEventListener('click', () => {
    props.clearSearchValue()
  })
}, [props])


  return (
    <form className="search col s12">
      <div className="row">
      <i className="material-icons clear">clear</i>
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

        <button className="waves-effect waves-light btn-small" onClick={props.runSearch} type="submit">искать</button>
      </div>
    </form>
  )
}

export default Search