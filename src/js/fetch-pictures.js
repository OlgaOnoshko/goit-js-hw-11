import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '24374201-4895b5a995aed977e23a40374';
const BASE_URL = 'https://pixabay.com/api'

export default class FetchPicturesService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
        this.picturesNumber = 0;
    }

    fetchPictures() {
        return fetch(`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=4`)
            .then(responce => responce.json())
            .then(({ hits, totalHits }) => {
                this.page += 1;
                console.log(totalHits);
                this.picturesNumber += hits
                if (hits.length !== 0) {
                    Notify.info(`Hooray! We found ${totalHits} images!`)
                }
                return hits;
            })
    }
    
    // picturesNumberCount() {
    //     if (this.picturesNumber === totalHits) {
    //         Notify.info("We're sorry, but you've reached the end of search results.");
    //         refs.loadMoreBtn.classList.add('is-hidden');
    //     }
    // }

    pageReset() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}


    
