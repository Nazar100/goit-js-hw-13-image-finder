import axios from 'axios';
import makeMarkup from '../templates/photo-markup.hbs';
import { debounce } from 'debounce';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const listRef = document.querySelector('.gallery');
const btnRef = document.querySelector('button')
const inputRef = document.querySelector('input');
inputRef.addEventListener('input', debounce(makeRequest, 500));

const password = '18642153-339199c7f42c73c0db1ceac08';

async function makeRequest({ target }) {
  const requestWord = target.value;
  try {
    const request = await axios.get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${requestWord}&page=1&per_page=12&key=${password}`,
    );
    handleRequest(request);

  } catch (err) {
    throw error;
  }
}

function handleRequest(request) {
  const data = request.data.hits;
  const markup = makeMarkup(data);
  listRef.innerHTML = markup;

  openModal();
   addClass()
}

function openModal() {
    listRef.addEventListener('click', createModal)

}

function createModal ({target}){
if(target.tagName=== "IMG"){
  const instance = basicLightbox.create(`
	<div class='modal'> <img src='${target.dataset.url}' width='1200' height ='700'></div>`)
  instance.show()
}
}


function addClass() {
btnRef.classList.add('active')
}