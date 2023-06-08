const API_KEY = '37137188-6bb810a50b61d3532d7744a01';
const BASE_URL = 'https://pixabay.com/api/';
const refs = {
    form: document.getElementById('search-form'),
    
};
refs.form.addEventListener('submit', fetchData);
const options = {
    key: API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
}

function fetchData(event) {
     event.preventDefault();
    console.log(event);
    getInputData();
    console.log(options.q);
    return;
}

function getInputData(event) {
    options.q = event.currentTarget.elements.searchQuery.value;
    console.log(options.q);
    return options.q;
}
export { refs, API_KEY,fetchData};