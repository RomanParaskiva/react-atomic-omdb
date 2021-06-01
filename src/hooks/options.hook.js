
export const useOptions = () => {
    const IMG_API_URL = "https://image.tmdb.org/t/p/w500",
        DEFAULT_PLACEHOLDER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
        MOVIE_API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=15f70723a36f993b310bad745e6681ed&language=ru&page=",
        SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=15f70723a36f993b310bad745e6681ed&language=ru'

        const formatDate = (date) => {

            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
    
            let mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
    
            let yy = date.getFullYear()
    
            return dd + '-' + mm + '-' + yy;
        }

        return {IMG_API_URL, DEFAULT_PLACEHOLDER_IMAGE, MOVIE_API_URL, SEARCH_API_URL, formatDate }
}