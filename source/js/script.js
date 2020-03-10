'use strict';
var btnSections = document.querySelector('#btn-sections');
var footerSectionsList = document.querySelector('.footer__sections-list');
var btnContacts = document.querySelector('#btn-contacts');
var footerContactsWrap = document.querySelector('.footer__contacts-wrap');
var modal = document.querySelector('.modal');
var headerBtn = document.querySelector('.header__btn-tel');
var body = document.querySelector('body');
var overlay = document.querySelector('.overlay');
var close = document.querySelector('.modal__close');
var modalInput = document.querySelector('.modal [type="text"]');
var esc = 27;

headerBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (modal.classList.contains('visually-hidden')) {
    modal.classList.remove('visually-hidden');
    overlay.classList.remove('visually-hidden');
    body.style.overflow = 'hidden';
    modalInput.focus();
  } else {
    modal.classList.add('visually-hidden');
    overlay.classList.add('visually-hidden');
    body.style.overflow = 'auto';
  }
});

var closeModal = function closeModal(e) {
  modal.classList.add('visually-hidden');
  overlay.classList.add('visually-hidden');
  body.style.overflow = 'auto';
};

close.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', function (e) {
  console.log(e)
  if (e.code === 'Escape' || e.keyCode === esc) {
    closeModal();
  }
});

var toogle = function toogle(e, btn, changeClass) {
  e.preventDefault();

  if (btn.classList.contains('footer__btn--plus')) {
    btn.classList.remove('footer__btn--plus');
    btn.classList.add('footer__btn--minus');
    changeClass.style.display = 'flex';
  } else {
    btn.classList.remove('footer__btn--minus');
    btn.classList.add('footer__btn--plus');
    changeClass.style.display = 'none';
  }
};

btnSections.addEventListener('click', function (e) {
  return toogle(e, btnSections, footerSectionsList);
});

btnContacts.addEventListener('click', function (e) {
  return toogle(e, btnContacts, footerContactsWrap);
});


(function () {
  window.addEventListener("DOMContentLoaded", function () {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
      else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
      }
    }

    var mask = function(event) {
      let matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });
      if (event.type == "blur") {
        if (this.value.length == 2) this.value = ""
      } else setCursorPosition(this.value.length, this)
    };

    let footerPhone= document.querySelector(".questions__input--phone");
    let modalPhone = document.querySelector(".modal__phone");
    modalPhone.addEventListener("input", mask, false);
    modalPhone.addEventListener("focus", mask, false);
    modalPhone.addEventListener("blur", mask, false);
    footerPhone.addEventListener("input", mask, false);
    footerPhone.addEventListener("focus", mask, false);
    footerPhone.addEventListener("blur", mask, false);
  });
})();
