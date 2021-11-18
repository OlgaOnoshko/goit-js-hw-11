import '../sass/main.scss';
import FetchPicturesService from './fetch-pictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    searchForm: document.querySelector('.search-form'),
    picturesContainer: document.querySelector('.js-image-container'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}
const fetchPicturesService = new (FetchPicturesService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMorePics);
refs.loadMoreBtn.classList.add('is-hidden');

function onSearch(evt) {
    evt.preventDefault();
    let picturesNumber = 0;

    removePicturesMarkUp();
    fetchPicturesService.query = evt.currentTarget.elements.searchQuery.value;
    fetchPicturesService.pageReset();
    fetchPicturesService.fetchPictures()
        .then(({ hits, totalHits }) => {
            if (hits.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                refs.loadMoreBtn.classList.add('is-hidden');
                return;
            }
            if (hits.length < 40) {
                Notify.failure("We're sorry, but you've reached the end of search results.")
                addPicturesMarkUp(hits);
                refs.loadMoreBtn.classList.add('is-hidden');
                return;
            }
            if (hits.length !== 0) {
                Notify.info(`Hooray! We found ${totalHits} images!`)
            }
            addPicturesMarkUp(hits);
            refs.loadMoreBtn.classList.remove('is-hidden');
        });
};
    
function loadMorePics(evt) {
    fetchPicturesService.fetchPictures()
        .then(({ hits, totalHits }) => {
            // console.log(hits.length);
            if (hits.length < 40) {
                refs.loadMoreBtn.classList.add('is-hidden');
                Notify.failure("We're sorry, but you've reached the end of search results.")
                addPicturesMarkUp(hits);
                return;
            }
            addPicturesMarkUp(hits);
        });
};

function addPicturesMarkUp(pictures) {
    const markUp = pictures.map(picture => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = picture;
        return `<a class="gallery-link" href="${largeImageURL}">
      <div class="photo-card">
          <div class="photo-thumb">
            <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy"/>
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b><span>${likes}</span>
              </p>
            <p class="info-item">
              <b>Views</b><span>${views}</span>
              </p>
            <p class="info-item">
              <b>Comments</b><span>${comments}</span>
              </p>
            <p class="info-item">
              <b>Downloads</b><span>${downloads}</span>
              </p>
          </div>
      </div>
      </a>`;
    })
        .join('');
    
    
    refs.gallery.innerHTML += markUp;
    const gallery = new SimpleLightbox('.gallery a');
    gallery.refresh();
};

function removePicturesMarkUp() {
    refs.gallery.innerHTML = '';
};

