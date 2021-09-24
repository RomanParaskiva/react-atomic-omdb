

export const useOptions = (switcher) => {
   
    const IMG_API_URL = "https://image.tmdb.org/t/p/w500",
        DEFAULT_PLACEHOLDER_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
        MOVIE_API_URL = `https://api.themoviedb.org/3/${switcher}/popular?api_key=15f70723a36f993b310bad745e6681ed&language=ru&page=`,
        SEARCH_API_URL = `https://api.themoviedb.org/3/search/${switcher}?api_key=15f70723a36f993b310bad745e6681ed&language=ru`,
        TOP_API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=15f70723a36f993b310bad745e6681ed&language=ru`,
        NOW_API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=15f70723a36f993b310bad745e6681ed&language=ru`,
        UPCOMING_API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=15f70723a36f993b310bad745e6681ed&language=ru`,
        PEOPLE_API_URL = `https://api.themoviedb.org/3/search/person?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`,
        POPULAR_PEOPLE_API_URL = `https://api.themoviedb.org/3/person/popular?api_key=15f70723a36f993b310bad745e6681ed&language=ru-RU`
        
        const formatDate = (date) => {

            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
    
            let mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
    
            let yy = date.getFullYear()
    
            return dd + '-' + mm + '-' + yy;
        }

        return { 
            IMG_API_URL, 
            DEFAULT_PLACEHOLDER_IMAGE, 
            MOVIE_API_URL, 
            SEARCH_API_URL, 
            TOP_API_URL, 
            NOW_API_URL, 
            UPCOMING_API_URL, 
            PEOPLE_API_URL, 
            POPULAR_PEOPLE_API_URL, 
            formatDate 
        }
}