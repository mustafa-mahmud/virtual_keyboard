'use strict';

const textarea = document.querySelector('.keyboard-input');
const keyboard = document.querySelector('.keyboard');
const keyboardKeys = document.querySelectorAll('.keyboard__key');
const backspace = document.querySelector('.backspace');
const capslock = document.querySelector('.capslock');

keyboardKeys.forEach((el) => {
  const key = el.textContent.toLowerCase().trim();
  if (key === 'space_bar') el.setAttribute('data-key', '');
  else if (key === 'keyboard_return') el.setAttribute('data-key', 'enter');
  else if (key === 'keyboard_capslock') el.setAttribute('data-key', 'capslock');
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

function hideKeyboard() {
  keyboard.classList.add('keyboard--hidden');
}

function typeTextarea(e) {
  const isCapsOnOff = e.getModifierState('CapsLock');

  if (isCapsOnOff) toggleCapslock(true);
  else toggleCapslock(false);

  keyboard.classList.remove('keyboard--hidden');
  const typed = e.key.trim().toLowerCase();

  keyboardKeys.forEach((key) => {
    if (key.getAttribute('data-key') === typed) {
      key.classList.add('active');
      setTimeout(() => key.classList.remove('active'), 200);
    }
  });
}

function toggleCapslock(bool) {
  if (bool) capslock.classList.add('keyboard__key--active');
  else capslock.classList.remove('keyboard__key--active');

  convertText();
}

function convertText() {
  const isActive = capslock.classList.contains('keyboard__key--active');
  if (isActive) {
    for (let i = 0; i < keyboardKeys.length; i++) {
      if (keyboardKeys[i].textContent === 'keyboard_capslock') continue;
      else if (keyboardKeys[i].textContent === 'backspace') continue;
      else if (keyboardKeys[i].textContent === 'keyboard_return') continue;
      else if (keyboardKeys[i].textContent === 'check_circle') continue;
      else if (keyboardKeys[i].textContent === 'space_bar') continue;
      else
        keyboardKeys[i].textContent = keyboardKeys[i].textContent.toUpperCase();
    }
  } else {
    for (let i = 0; i < keyboardKeys.length; i++) {
      if (keyboardKeys[i].textContent === 'keyboard_capslock') continue;
      else if (keyboardKeys[i].textContent === 'backspace') continue;
      else if (keyboardKeys[i].textContent === 'keyboard_return') continue;
      else if (keyboardKeys[i].textContent === 'check_circle') continue;
      else if (keyboardKeys[i].textContent === 'space_bar') continue;
      else
        keyboardKeys[i].textContent = keyboardKeys[i].textContent.toLowerCase();
    }
  }
}

function clickKeys(e) {
  const isKeyboardKeys = e.target.closest('.keyboard__key');
  console.log(isKeyboardKeys);
  if (!isKeyboardKeys) return;
  textarea.focus();
  isKeyboardKeys.classList.add('active');
  setTimeout(() => isKeyboardKeys.classList.remove('active'), 200);

  const ckClick = e.target.textContent;
  if (ckClick === 'keyboard_capslock') {
    const ckCapslock = capslock.classList.contains('keyboard__key--active');
    if (ckCapslock) toggleCapslock(false);
    else toggleCapslock(true);
    return;
  }
  if (ckClick === 'space_bar') {
    textarea.value += ' ';
    return;
  }
  if (ckClick === 'check_circle') {
    hideKeyboard();
    return;
  }
  if (ckClick === 'keyboard_return') {
    textarea.value += '\n';
    return;
  }
  if (ckClick === 'backspace') {
    let arr = [...textarea.value];
    arr.pop();
    textarea.value = arr.join('');
    return;
  }

  const whereClick = e.target.textContent;
  textarea.value += whereClick;
}

/////////////////////////
convertText();
document.addEventListener('click', showHideKeyboard);
textarea.addEventListener('keyup', typeTextarea);
keyboard.addEventListener('click', clickKeys);
