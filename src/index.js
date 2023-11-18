'use strict';

const form = document.querySelector('.form-auth');
const inputs = form.querySelectorAll('.form-auth__input_validate');
const checkboxRemember = document.getElementById('remember');
const sendForm = document.getElementById('send');
let isAuth = false;
const logInBtn = document.querySelector('.header__btn_login');
const logOutBtn = document.querySelector('.header__btn_logout');
const closeFormBtn = document.querySelector('.form-auth__close');
const modalErr = document.querySelector('.modal');
const modalErrClose = document.querySelector('.modal__close');

inputs.forEach((input) => {
  input.addEventListener('blur', () => {
    input.setAttribute('required', '');
  });
});

sendForm.addEventListener('mousedown', () => {
  inputs.forEach((input) => {
    input.setAttribute('required', '');
  });
});

logInBtn.addEventListener('click', () => {
  form.style.display = 'flex';
  logInBtn.style.display = 'none';
});

logOutBtn.addEventListener('click', () => {
  logOutBtn.style.display = 'none';
  logInBtn.style.display = 'flex';
  isAuth = false;
});

async function fetch() {
  let url = arguments[0];
  let body = arguments[1];

  if (!url | !body) {
    let dataHeaders = { status: 400, 'Content-Type': 'application/json' };
    return new Response(
      JSON.stringify({ status: 'data is missing' }),
      dataHeaders
    );
  }

  const formData = {};
  body.body.forEach((v, k) => {
    formData[k] = v;
  });

  if (
    formData.email !== 'krayanskaya_ov@mail.ru' ||
    formData.password !== '111111111111'
  ) {
    let dataHeaders = { status: 403, 'Content-Type': 'application/json' };
    return new Response(JSON.stringify({ status: 'restricted' }), dataHeaders);
  }

  let dataHeaders = { status: 200, 'Content-Type': 'application/json' };
  return new Response(JSON.stringify({ status: 'ok' }));
}

form.onsubmit = async (e) => {
  e.preventDefault();

  let response = await fetch('url', {
    method: 'POST',
    body: new FormData(form),
  });

  let result = await response.json();
  console.log('sss');

  if (response.ok) {
    isAuth = true;
    form.style.display = 'none';
    logInBtn.style.display = 'none';
    logOutBtn.style.display = 'flex';
  } else {
    form.style.display = 'none';
    modalErr.style.display = 'flex';
  }
};

closeFormBtn.addEventListener('click', () => {
  form.style.display = 'none';
  logInBtn.style.display = 'flex';
});

modalErrClose.addEventListener('click', () => {
  modalErr.style.display = 'none';
  form.style.display = 'flex';
});

window.addEventListener('click', (event) => {
  if (event.target == modalErr) {
    modalErr.style.display = 'none';
    form.style.display = 'flex';
  }
});
