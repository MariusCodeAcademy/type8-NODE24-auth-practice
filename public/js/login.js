console.log('login here');
const BASE_URL = 'http://localhost:3000';

const formEl = document.getElementById('login');
const errroEl = document.getElementById('err');
const emailInputEl = formEl.elements.email;
const passwordInputEl = formEl.elements.password;

const errorsArr = [];

function addError(message, field) {
  errorsArr.push({
    message,
    field,
  });
}

// rules ['required', 'minLength-4']
function checkInput(valueToCheck, field, rulesArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    // rule === required
    if (rule === 'required') {
      if (valueToCheck === '') {
        // pranesti apie klaida
        addError('this field is required', field);
        return;
      }
    }
    // rule === minLength-X
    if (rule.split('-')[0] === 'minLength') {
      const min = rule.split('-')[1];
      if (valueToCheck.length <= min) {
        addError(`min length must be greater than ${min}`, field);
      }
    }
    // rule === maxLength-X
  }
}

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');
  clearErrors();
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };

  // TODO front end validation
  checkInput(loginObj.email, 'email', ['required', 'minLength-4']);
  checkInput(loginObj.password, 'password', [
    'required',
    'minLength-5',
    'maxLength-10',
  ]);
  console.log('FE errorsArr ===', errorsArr);
  handleError(errorsArr);
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
  return;

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
      if (eObj.field === 'email') {
        emailInputEl.style.border = '1px solid red ';
        emailInputEl.nextElementSibling.textContent = eObj.message;
      }
      if (eObj.field === 'password') {
        passwordInputEl.style.border = '1px solid red ';
        passwordInputEl.nextElementSibling.textContent = eObj.message;
      }
    });
  }
}

function clearErrors() {
  emailInputEl.style.border = 'none';
  passwordInputEl.nextElementSibling.textContent = '';
  passwordInputEl.style.border = 'none';
  emailInputEl.nextElementSibling.textContent = '';
}

function checkInputObj(obj) {
  for (key in obj) {
    const value = obj[key];
    console.log('value ===', value);
    if (value === '') return true;
  }
}

// const errrors = [
//   { message: '"email" is not allowed to be empty', field: 'email' },
//   { message: '"password" is not allowed to be empty', field: 'password' },
// ];
