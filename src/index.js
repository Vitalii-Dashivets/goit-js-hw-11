import { fetchUrl, renderMarkup,clearMarkup } from "./js/main_code.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import "simplelightbox/dist/simple-lightbox.min.css";


const axios = require('axios').default;
const API_KEY = '37137188-6bb810a50b61d3532d7744a01';
const BASE_URL = 'https://pixabay.com/api/';
const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector(".gallery"),
    loadBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', fetchData);
refs.loadBtn.addEventListener('click', onLoadMore);
refs.loadBtn.classList.toggle('is-hidden');


    
Notify.init({
    width: '500px',
    fontSize: '25px',
    position: 'right-top',
    timeout: '2000',
    messageMaxLength: 150,
    distance: '20px',
    showOnlyTheLastOne: true,
    warning: {
        background: 'rgba(190, 194, 79, 1)',
        textColor: '#fff',
        childClassName: 'notiflix-notify-warning',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-exclamation-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,1)',
        backOverlayColor: 'rgba(238,191,49,0.2)',
    },
});


const options =new URLSearchParams( {
    key: API_KEY,
    per_page: 40,
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
});
let page = Number(options.get('page'));
let perPage = Number(options.get('per_page'));
let totalHits = 0;
let maxPage = 1;



async function fetchData(event) {
    try {
        event.preventDefault();
                
        let inputValue = event.currentTarget.elements.searchQuery.value;

        if (options.get('q') !== inputValue) {
            options.set('page', `1`);
            options.set('q', `${inputValue}`);
             }
                             
        if (page > maxPage) {
            error = 'max page limit';
            maxPage = 1;
            refs.loadBtn.classList.add('is-hidden');
            throw new Error(error);
        }
        const result = await fetchUrl(`${BASE_URL}?${options}`);
                console.log(result);
        totalHits = result.data.totalHits;
        if (totalHits < perPage) {
            refs.loadBtn.classList.add('is-hidden');
        }
        if (totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
           
        } else {
             Notify.success(`Hooray! We found ${totalHits} images.`);
            
        }
        maxPage=Math.ceil(totalHits / perPage);
        console.log('maxPage',maxPage);
          
                
        clearMarkup();
        renderMarkup(result.data.hits);
        if (totalHits < perPage) {
            refs.loadBtn.classList.add('is-hidden');
        }
        if (page = maxPage) {
               
             page = 1;
            options.set('page', `${page}`);
        
         }
               
    } catch (error) {
        console.log(error);
                  
           }
          
};

async function onLoadMore() {
    try {
       
       page = Number(options.get('page'));
       refs.loadBtn.classList.add('is-hidden');

       const result = await fetchUrl(`${BASE_URL}?${options}`);
       
       refs.loadBtn.classList.remove('is-hidden');
            
       
        console.log('result', result);
       
        if (page <= maxPage) {
            renderMarkup(result.data.hits);
            page = Number(options.get('page'));
            page += 1;
            options.set('page', `${page}`);
            console.log('після розмітки',page);
        }
        if (page > maxPage) {
            page = 1;
            maxPage = 1;
            throw new Error(error);
            }
        
        return result;
        
    } catch (error) {
        console.log(error);
        refs.loadBtn.classList.add('is-hidden');
            }
}


export {refs, page };