import React from 'react'



const Pagination = (props) => {
  return (
    <ul className="pagination">
      <li className="disabled"><a href="#!" onClick={props.prevPage}><i className="material-icons">chevron_left</i></a></li>
      <li className="active"><a href="#!">{props.page}</a></li>
      <li className="waves-effect"><a href="#!">{props.page + 1}</a></li>
      <li className="waves-effect"><a href="#!">{props.page + 2}</a></li>
      <li className="waves-effect"><a href="#!">{props.page + 3}</a></li>
      <li className="waves-effect"><a href="#!">...</a></li>
      <li className="waves-effect"><a href="#!">{props.pageTotal}</a></li>
      <li className="waves-effect"><a href="#!" onClick={props.nextPage}><i className="material-icons">chevron_right</i></a></li>
    </ul>
  )
}

export default Pagination