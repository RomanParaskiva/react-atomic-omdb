import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const PersonPage = () => {
    const [personId, setPersonId] = useState({}),
    {id} = useParams()

    setPersonId(id)

    const getPersonInfo = async (id) => {
        const res = await axios(`https://api.themoviedb.org/3/person/${personId}??api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
    }
    return (
       <div className="person-wrapper">

       </div>
    )
}

export default PersonPage
