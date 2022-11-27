export const BASE_URL = 'https://api.themoviedb.org/3/';
export const img_500 = 'https://image.tmdb.org/t/p/w500';
export const img_300 = 'https://image.tmdb.org/t/p/w300';
export const img_origin = 'https://image.tmdb.org/t/p/original';
export const unavailable_img = 'https://www.movienewz.com/img/films/poster-holder.jpg'
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const requests = {
    trending:`${BASE_URL}trending/all/day?api_key=${API_KEY}`,
    discover:`${BASE_URL}discover/movie?api_key=${API_KEY}`,
    topRated:`${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=en-US`,
    popular:`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US`,
    // search:`${BASE_URL}search/movie?api_key=${API_KEY}&query=`
}

export default requests