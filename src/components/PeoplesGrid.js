import React from 'react'

import PeopleCard from '../components/PeopleCard'

const PeoplesGrid = ({ peoplesData }) => {
   
    return (
            <div className="grid">
                {peoplesData && peoplesData.map(item => {
                    return (<PeopleCard key={item.id} people={item} />)
                })}
            </div>
    )
}

export default PeoplesGrid