function loadHTML (el) {
  let from = el.import.querySelector('body');

  if (el.dataset.active) {
    from.querySelector('[data-name="' + el.dataset.active + '"]').classList.add('active');
  }

  if (el.dataset.replace) {
    from.querySelector('[data-name="replace"]').innerHTML = el.dataset.replace;
  }

  if (el.dataset.after) {
    from.querySelector('[data-after]').insertAdjacentHTML('afterEnd', '<a>' + el.dataset.after + '</a>');
  }

  el.insertAdjacentHTML('afterEnd', from.innerHTML);
  el.parentNode.removeChild(el);
}
