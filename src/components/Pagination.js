import React, { useState } from 'react'

import materialize from 'materialize-css'

const Pagination = (props) => {
  const [page, setPage] = useState(1)

  return (
    <ul className="pagination">
      <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
      <li className="active"><a href="#!">1</a></li>
      <li className="waves-effect"><a href="#!">2</a></li>
      <li className="waves-effect"><a href="#!">3</a></li>
      <li className="waves-effect"><a href="#!">4</a></li>
      <li className="waves-effect"><a href="#!">{props.total}</a></li>
      <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
    </ul>
  )
}

export default Pagination