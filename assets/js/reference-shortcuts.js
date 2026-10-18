
'use strict';
// Shortcuts are optional; native browser shortcuts may take priority.
document.addEventListener('keydown', event => {
  if (event.altKey && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === 'w'
      && !event.target.closest('input,textarea,select,[contenteditable="true"]')) {
    event.preventDefault();
    window.location.assign('../willow-pier.html#reader');
  }
});
