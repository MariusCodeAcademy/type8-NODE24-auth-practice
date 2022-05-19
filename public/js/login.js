import { checkInput, errorsArr, clearErrorsArr } from './modules/validation.js';

console.log('login here');
const BASE_URL = 'http://localhost:3000';

const formEl = document.getElementById('login');
const errroEl = document.getElementById('err');
// pasiimti visus el su klase error-msg
const errorMsgElementsArr = document.querySelectorAll('.error-msg');

const emailEl = formEl.elements.email;

emailEl.addEventListener('blur', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'email']);
  handleError(errorsArr);
});

emailEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'email']);
  handleError(errorsArr);
});

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');

  const loginObj = {
    email: formEl.elements.email.value.trim(),
    age: formEl.elements.age.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  clearErrors();
  // TODO front end validation
  checkInput(loginObj.email, 'email', ['required', 'minLength-4', 'email']);
  checkInput(loginObj.age, 'age', ['required', 'positive']);
  checkInput(loginObj.password, 'password', [
    'required',
    'minLength-5',
    'maxLength-10',
  ]);
  console.log('FE errorsArr ===', errorsArr);

  // if (checkInputObj(loginObj)) {
  //   console.log('checkInputObj ===');
  //   const errorsArr = [];
  //   // paimti loginObj ir patikrinti
  //   // 1. ar reiksmes yra (ar nelygu '')
  //   // jei lygu tada formuojam klaida
  //   // 2.paziureti ar nera ivesties laukas netrumpesins uz 4 simbolius
  //   // jei taip tai {messge: 'too short', field:'password'}
  //   // handleError(errorsArr);
  //   return;
  // }

  console.log('loginObj ===', loginObj);
  // jei yra klaidu FE tada nesiunciam uzklausos
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs.success === true) {
    console.log('login success');
    errroEl.textContent = '';
    // issaugoti reiksme localStorage
    const token = dataInJs.token;
    localStorage.setItem('articleUserToken', token);
    // sukuria narsykles puslapiu istorijoje nauja irasa nunaviguodamas
    // window.location.href = 'books.html';
    // nunaviguoja, padaro kad negaletume gryzti atgal psl su back
    window.location.replace('books.html');
  } else {
    console.log('login fail', dataInJs);
    handleError(dataInJs);
  }
});

function handleError(msg) {
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    // paprastas budas avaizduoti visas klaidas
    // msg.forEach((eObj) => {
    //   errroEl.innerHTML += `${eObj.message}<br>`;
    // });
    // atvaizduoti individualias klaidas
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}

function clearErrors() {
  // errorsArr = [];
  clearErrorsArr();
  errorMsgElementsArr.forEach((htmlElement) => {
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}

// const errrors = [
//   { message: '"email" is not allowed to be empty', field: 'email' },
//   { message: '"password" is not allowed to be empty', field: 'password' },
// ];
