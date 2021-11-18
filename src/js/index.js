import '../sass/main.scss';
// import { fetchPictures } from './fetch-pictures';
import FetchPicturesService from './fetch-pictures';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    searchForm: document.querySelector('.search-form'),
    picturesContainer: document.querySelector('.js-image-container'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}
const fetchPicturesService = new FetchPicturesService

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMorePics);
refs.loadMoreBtn.classList.add('is-hidden');

function onSearch(evt) {
    evt.preventDefault();

    removePicturesMarkUp();
    fetchPicturesService.query = evt.currentTarget.elements.searchQuery.value;
    fetchPicturesService.pageReset();
    fetchPicturesService.fetchPictures()
      .then(hits => {
        if (hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
          addPicturesMarkUp(hits);
          refs.loadMoreBtn.classList.remove('is-hidden');
    } 
)}
    

function loadMorePics(evt) {
    fetchPicturesService.fetchPictures()
        .then(hits => addPicturesMarkUp(hits));
}

function addPicturesMarkUp(pictures) {
    const markUp = pictures.map(picture => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = picture;
        return `<a class="gallery__link" href="${largeImageURL}">
      <div class="photo-card">
          <div class="photo-thumb">
            <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy"/>
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${likes}
              </p>
            <p class="info-item">
              <b>Views</b>${views}
              </p>
            <p class="info-item">
              <b>Comments</b>${comments}
              </p>
            <p class="info-item">
              <b>Downloads</b>${downloads}
              </p>
          </div>
      </div>
      </a>`;
    })
        .join('');
    
    refs.gallery.innerHTML += markUp;
}

function removePicturesMarkUp() {
    refs.gallery.innerHTML = '';
}

