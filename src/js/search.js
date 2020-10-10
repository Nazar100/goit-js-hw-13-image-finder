import axios from 'axios';
import makeMarkup from '../templates/photo-markup.hbs';
import { debounce } from 'debounce';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const listRef = document.querySelector('.gallery');
const btnRef = document.querySelector('.load-more');
const inputRef = document.querySelector('input');
const sumbitRef = document.querySelector('.submit');
const password = '18642153-339199c7f42c73c0db1ceac08';
sumbitRef.addEventListener('click', search);
  
let page =1;

function search(e) {
  e.preventDefault();
  listRef.innerHTML = '';
  makeRequest();
  btnRef.addEventListener('click', loadMorePgs);
}


async function makeRequest() {
  const requestWord = inputRef.value;
  try {
    const request = await axios.get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${requestWord}&page=${page}&per_page=12&key=${password}`,
    );
    handleRequest(request);
    return request;
  } catch (err) {
    throw error;
  }
}



function handleRequest(request) {
  const data = request.data.hits;
  const markup = makeMarkup(data);
  listRef.insertAdjacentHTML('beforeend', markup);

  const likeRef = document.querySelector('.like');
  like (likeRef)
  openModal();
  addClass();
  return likeRef
}

function openModal() {
  listRef.addEventListener('click', createModal);
}

function createModal({ target }) {
  if (target.tagName === 'IMG') {
    const instance = basicLightbox.create(`
	<div class='modal'> <img src='${target.dataset.url}' width='1200' height ='700'></div>`);
    instance.show();
  }
}

function addClass() {
  btnRef.classList.add('active');
}

async function loadMorePgs() {
  page += 1;
  makeRequest(page);
  handleRequest(request);
}

function like (likeRef) {
  
  likeRef.addEventListener('click', addLike)
 return likeRef
}

function addLike (e,likeRef) {
  console.log(likeRef);
  // likeRef.textContent++
}