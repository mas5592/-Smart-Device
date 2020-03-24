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

var closeModal = function closeModal() {
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


window.addEventListener("DOMContentLoaded", function () {
  var keyCode;

  var maskOptions = function (event) {
    event.keyCode && (keyCode = event.keyCode);
    var pos = this.selectionStart;

    if (pos < 3) event.preventDefault();
    var matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, ""),
      new_value = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
      });
    i = new_value.indexOf("_");
    if (i != -1) {
      i < 5 && (i = 3);
      new_value = new_value.slice(0, i)
    }
    var reg = matrix.substr(0, this.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}"
      }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
    if (event.type == "blur" && this.value.length < 5) this.value = ""
  }

  var phoneQuestions = document.querySelector("#questions-phone");

  phoneQuestions.addEventListener("input", maskOptions, false);
  phoneQuestions.addEventListener("focus", maskOptions, false);
  phoneQuestions.addEventListener("blur", maskOptions, false);
  phoneQuestions.addEventListener("keydown", maskOptions, false)

  var phoneModal = document.querySelector("#modal-phone");

  phoneModal.addEventListener("input", maskOptions, false);
  phoneModal.addEventListener("focus", maskOptions, false);
  phoneModal.addEventListener("blur", maskOptions, false);
  phoneModal.addEventListener("keydown", maskOptions, false)

});
