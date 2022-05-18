import { getFetch } from './modules/fetch.js';

console.log('art');

const articleListEl = document.getElementById('article');

// article tik registruotiems prisijungusiems vartotojams
const token = localStorage.getItem('articleUserToken');
console.log('token ===', token);

function renderBooks(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((bObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${bObj.title} - ${bObj.date}`;
    dest.append(liEl);
  });
}

// gauti ir iskonsolinti visas knygas
async function getArticles(userToken) {
  const articleArr = await getFetch('books', userToken);
  console.log('booksArr ===', articleArr);
  renderBooks(articleArr, articleListEl);
}
getArticles(token);
// atvaizduoti knygas saraso pavidalu htmle
