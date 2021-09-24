import React from 'react'
import { Link } from 'react-router-dom'

import { useOptions } from '../hooks/options.hook'

const PeopleCard = ({ people }) => {
    const { IMG_API_URL, DEFAULT_PLACEHOLDER_IMAGE } = useOptions()
    const poster = !people.profile_path ? DEFAULT_PLACEHOLDER_IMAGE : IMG_API_URL + people.profile_path,
        movieLink = '/people/' + people.id
    let overview = people.overview ? people.overview : 'Описание не найдено'
    return (
        <Link to={movieLink}>
            <div className="movie">


                <div className="movie__img-wrapper">
                    <img width="200"
                        alt={`Название: ${people.title}`}
                        src={poster}
                    />
                    <div className="movie__reviews"> {overview} </div>
                </div>
                <div className="movie__footer">
                    <span className="movie__title">{people.name}</span>
                    <span className="material-icons" style={ {color : people.gender === 2 ? '#78cdff' : '#ff78c3'}}>
                        {people.gender === 2 ? 'male' : 'female' }
                    </span>
                    <span className="movie__raiting">{Math.round(people.popularity)}</span>
                </div>

            </div>
        </Link>
    )
}

export default PeopleCard