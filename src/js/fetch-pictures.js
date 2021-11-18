import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const API_KEY = '24374201-4895b5a995aed977e23a40374';
const BASE_URL = 'https://pixabay.com/api'

export default class FetchPicturesService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
        this.picturesNumber = 0;
    }

    fetchPictures = async () => {
        const responce = await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
        this.page += 1;
        return responce.data;
    };
        pageReset() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
};


    
