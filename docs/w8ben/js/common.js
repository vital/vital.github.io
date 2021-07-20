function loadHTML (el) {
  if (el.dataset.check) {
    try {
      if (sessionStorage.getItem(el.dataset.check)) {
        return;
      }
    } catch (e) {}
  }
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

function profileInit () {
  try {
    let _phone = sessionStorage.getItem('phone');
    if (_phone) document.getElementById('phone').value = _phone;

    let _email = sessionStorage.getItem('email');
    if (_email) document.getElementById('email').value = _email;
  } catch (e) {}

  document.getElementById('personal').onsubmit = function () {
    try {
      sessionStorage.setItem('phone', document.getElementById('phone').value);
      sessionStorage.setItem('email', document.getElementById('email').value);
    } catch (e) {}

    alert('Ваши данные сохранены');
  };
}

function goStep (id) {
  let s = document.getElementById(id);
  if (s) {
    let d = document.querySelectorAll('.details');
    for (let i = 0; i < d.length; i++) {
      d[i].setAttribute('hidden', true);
    }

    let s = document.getElementById(id);
    s.removeAttribute('hidden');
    s.scrollIntoView();

    try {
      sessionStorage.setItem('step', id);
    } catch (e) {}
  }
}

function w8benInit () {
  let phone = '+7 922 292 92 92';
  try {
    let _phone = sessionStorage.getItem('phone');
    if (_phone) phone = _phone;
  } catch (e) {}

  document.querySelector('[data-phone]').innerText = document.querySelector('[data-phone]').innerText.replace('{phone}', phone);

  try {
    let _address = sessionStorage.getItem('address');
    if (_address) document.getElementById('address').value = _address;
  } catch (e) {}

  try {
    let s = sessionStorage.getItem('step');
    if (s) goStep(s);
  } catch (e) {}

  // первый шаг
  document.getElementById('personal-form').onsubmit = function () {
    try {
      sessionStorage.setItem('address', document.getElementById('address').value);
    } catch (e) {}

    goStep('step2');
    return false;
  };

  // нажатие на один из шагов
  let p = document.querySelectorAll('[data-steps]');
  for (let j = 0; j < p.length; j++) {
    p[j].onclick = function (el) {
      if (el.target.tagName == 'A' && el.target.hash) {
        goStep(el.target.hash.substr(1));
      }
      return false;
    };
  }

  function modalShow () {
    document.getElementById('open-modal').checked = true;
    formSent();
    return false;
  }

  function formSent () {
    try {
      sessionStorage.setItem('w8ben', true);
    } catch (e) {}
  }

  document.getElementById('scan-submit').onsubmit = modalShow;

  document.getElementById('sms-code').onsubmit = modalShow;

  document.getElementById('open-modal').onchange = function (e) {
    if (!e.target.checked) {
      location.href = 'request.html';
    } else {
      formSent();
    }
  };

  document.getElementById('choose-file').onchange = function (e) {
    let f = e.target.value.replace(/\\/g, '/').split('/');
    e.target.nextSibling.innerText = f[f.length - 1];
  };
}
