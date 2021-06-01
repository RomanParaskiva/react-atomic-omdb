import { useState, useCallback } from 'react'
import axios from 'axios'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url) => {
        try {
            setLoading(true)
            const res = await axios(url)
            if (res.status === 200) {
                setLoading(false)
                return res.data
            }
            setLoading(false)
            return false
        } catch (e) { }
    }, [])

    return { loading, request }
}