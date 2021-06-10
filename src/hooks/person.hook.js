import { useCallback} from 'react'
import { useHttp } from './http.hook'

export const usePerson = () => {
    const {request} = useHttp()

    const getPersonInfo = useCallback(async (id) => {
        const res = await request(`https://api.themoviedb.org/3/person/${id}?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
       return res
    },[request])

    const getFilmList = useCallback(async (id) => {
        const res = await request(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=15f70723a36f993b310bad745e6681ed&language=en-US`)
        return res
    },[request])

    return { getFilmList, getPersonInfo }
}