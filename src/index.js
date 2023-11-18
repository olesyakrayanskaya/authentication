'use strict';

const form = document.querySelector('.form-auth');
const inputs = form.querySelectorAll('.form-auth__input_validate');
const checkboxRemember = document.getElementById('remember');
const sendForm = document.getElementById('send');

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
