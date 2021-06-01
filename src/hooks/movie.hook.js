
import {useHttp} from '../hooks/http.hook'
import {useOptions} from '../hooks/options.hook'

export const useMovie = (id) => {
    const {request} = useHttp(),
        {IMG_API_URL} = useOptions()


    const getMovie =  async (id) => {
        const res = await request(`https://api.themoviedb.org/3/movie/${id}?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        return res
    }

    const getCredits = async (id) => {
        const res = await request(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`)
        console.log(res)
        return res.cast
    }

    const getImgs = async (id) => {
        let arr = []

        const res = await request(`https://api.themoviedb.org/3/movie/${id}/images?api_key=15f70723a36f993b310bad745e6681ed`)
        if (res) {
            if (res.backdrops) {
                res.backdrops.map(item => arr.push(<img key={item.file_path} src={IMG_API_URL + item.file_path} alt="" />))
            }
            if (res.posters) {
                res.posters.forEach(item => arr.push(<img key={item.file_path} src={IMG_API_URL + item.file_path} alt="" />))
            }   
        } 
            return arr
    }

    return {getImgs, getCredits, getMovie}
}