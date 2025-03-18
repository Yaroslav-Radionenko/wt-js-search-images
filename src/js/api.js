import axios from 'axios';

const API_KEY = '49407798-db84a357e2ef1ab462834c308';
const BASE_URL = 'https://pixabay.com/api/';
const DEFAULT_PER_PAGE = 40;

function apiService() {
    const service = {
        searchQuery: '',
        page: 1,
        PER_PAGE: DEFAULT_PER_PAGE,
    };

    const fetchGallery = async () => {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    key: API_KEY,
                    q: service.searchQuery,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: true,
                    page: service.page,
                    per_page: service.PER_PAGE,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз.');
        }
    };

    const incrementPage = () => {
        service.page += 1;
    };

    const resetPage = () => {
        service.page = 1;
    };

    const getQuery = () => {
        return service.searchQuery;
    };

    const setQuery = (newQuery) => {
        service.searchQuery = newQuery;
        resetPage();
    };

    const getPage = (currentPage) => {
        service.page = currentPage;
    };

    return {
        fetchGallery,
        incrementPage,
        resetPage,
        getQuery,
        setQuery,
        getPage,
    };
}

export default apiService();