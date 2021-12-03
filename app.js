'use strict';

const textarea = document.querySelector('.keyboard-input');
const keyboard = document.querySelector('.keyboard');
const keyboardKeys = document.querySelectorAll('.keyboard__key');

keyboardKeys.forEach((el) => {
  const key = el.textContent.toLowerCase().trim();
  if (key === 'space_bar') el.setAttribute('data-key', '');
  else if (key === 'keyboard_return') el.setAttribute('data-key', 'Enter');
  else el.setAttribute('data-key', key);
});

function showHideKeyboard(e) {
  const target = e.target;
  const ckTarget = target.closest('.keyboard') ? true : false;

  if (!target.classList.contains('keyboard-input') && !ckTarget) {
    keyboard.classList.add('keyboard--hidden');
  }

  if (target.classList.contains('keyboard-input')) {
    keyboard.classList.remove('keyboard--hidden');
  }
}

function typeTextarea(e) {
  //fix:: backspace not get
  const x = e.which || e.keyCode;
  console.log(x);
  console.log(e.key.trim());

  return;
  const typed = e.key.trim();
  console.log(typed);
  keyboardKeys.forEach((key) => {
    if (key.getAttribute('data-key') === typed) {
      key.classList.add('active');
      setTimeout(() => key.classList.remove('active'), 200);
    }
  });
}

/////////////////////////
document.addEventListener('click', showHideKeyboard);
textarea.addEventListener('keypress', typeTextarea);
