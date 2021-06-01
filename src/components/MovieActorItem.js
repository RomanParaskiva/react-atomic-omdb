import React from 'react'
import {Link} from 'react-router-dom'
import {useOptions} from '../hooks/options.hook'

export const MovieActorItem = ({item}) => {
    const {IMG_API_URL, DEFAULT_PLACEHOLDER_IMAGE} = useOptions()
    return(
        <li data-id={item.id} key={item.id}>
            <Link to={'/people/' + item.id} className="people__link">
                <span>{item.character ? item.character + ' -' : ''} {item.original_name}</span>
                <img loading="lazy" alt={item.name} src={item.profile_path ? IMG_API_URL + item.profile_path : DEFAULT_PLACEHOLDER_IMAGE} />
            </Link>
        </li>
    )
}
