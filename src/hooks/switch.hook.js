import {useState, useEffect} from 'react'

export const useSwitch = () => {
    const [switcher, setSwitcher] = useState('movie')

    const changeSwitcher = () => {
        setSwitcher(switcher === 'movie' ? 'tv' : 'movie')  
    }

    useEffect(() => {
        localStorage.setItem('switcher', switcher )
    }, [switcher])

    return {changeSwitcher, switcher}
}