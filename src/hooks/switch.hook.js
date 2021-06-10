import {useState} from 'react'

export const useSwitch = () => {
    const [switcher, setSwitcher] = useState('movie')

    const changeSwitcher = () => {
        switcher === 'movie' ? setSwitcher('tv') : setSwitcher('movie')
    }

    return {changeSwitcher, switcher}
}