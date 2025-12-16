const API_KEY = 'd863b3a8fe239075321786c59612efba';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const SMALL_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    // Language specific fetches
    fetchTelugu: `/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=popularity.desc`,
    fetchHindi: `/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc`,
    fetchTamil: `/discover/movie?api_key=${API_KEY}&with_original_language=ta&sort_by=popularity.desc`,
    fetchMalayalam: `/discover/movie?api_key=${API_KEY}&with_original_language=ml&sort_by=popularity.desc`,
    fetchKannada: `/discover/movie?api_key=${API_KEY}&with_original_language=kn&sort_by=popularity.desc`,
    fetchAnime: `/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=popularity.desc`,
};

async function fetchData(url) {
    try {
        const response = await fetch(`${BASE_URL}${url}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}
