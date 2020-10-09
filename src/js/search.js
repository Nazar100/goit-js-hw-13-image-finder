import axios from 'axios'
import makeMarkup from '../templates/photo-markup.hbs'
import { debounce } from "debounce";


const inputRef = document.querySelector('input')
inputRef.addEventListener('input', debounce(makeRequest,500) )
const listRef = document.querySelector('ul')


const password = '18642153-339199c7f42c73c0db1ceac08'



async function makeRequest ({target}) {
    const requestWord =target.value
try {
    const request =await axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${requestWord}&page=1&per_page=12&key=${password}`)
    const data = request.data.hits
    const markup = makeMarkup(data)
    listRef.innerHTML = markup;
    return request
}
    catch(err){
    throw error
}
}

// makeRequest().then(photo=>console.log(photo)).catch(err=> console.log(err))