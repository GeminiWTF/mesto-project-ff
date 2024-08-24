import './page/index.css';
import { createCard, cardsInit } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { getAllCards, getUser, changeAvatar, changeProfile, changePlace } from './components/api.js';
import { enableValidation, clearValidation } from './components/validation.js';


let myUserId;
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const places = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescrition = document.querySelector('.profile__description');
const profileAvatarImage = document.querySelector('.profile__image');
const editName = document.querySelector('.popup__input_type_name');
const editDescription = document.querySelector('.popup__input_type_description');
const placeTitle = document.querySelector('.popup__input_type_card-name');
const placeLink = document.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const formEditProfile = document.forms.namedItem('edit-profile');
const formNewPlace = document.forms.namedItem('new-place');
const formEditAvatar = document.forms.namedItem('edit-avatar');
const popupImage = document.querySelector('.popup_type_image');
const avatarEditProfile = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatar = document.querySelector('.popup__input_type_avatar_url');

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function onCardClick(cardItem) {
  popupImage.querySelector('.popup__image').src = cardItem.link;
  popupImage.querySelector('.popup__image').alt = cardItem.name;
  popupImage.querySelector('.popup__caption').textContent = cardItem.name;

  openPopup(popupImage);
}


avatarEditProfile.addEventListener('click', (evt) => {
  console.log(evt)
  clearValidation(formEditAvatar, validationObject);
  openPopup(avatarPopup);
});

formEditAvatar.addEventListener('submit', function (evt) {
  changeTextButton(formEditAvatar);
  evt.preventDefault();
  changeAvatar(avatar.value)
    .then((result) => {
      console.log(result)

      profileAvatarImage.style.backgroundImage = `url(${result.avatar})`;

      closePopup(avatarPopup);
    })

    .catch((err) => {
      console.log(err);
    })
    .finally(() => { changeToInitialText(formEditAvatar); })
});


//редактирование профиля
profileEditButton.addEventListener('click', function () {
  editName.value = profileName.textContent;
  editDescription.value = profileDescrition.textContent;
  clearValidation(formEditProfile, validationObject);
  openPopup(profilePopup);
});

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();

  changeTextButton(formEditProfile);
  changeProfile(editName.value, editDescription.value)
    .then((result) => {

      profileName.textContent = result.name;
      profileDescrition.textContent = result.about;
      closePopup(profilePopup);
    })

    .catch((err) => {
      console.log(err);
    })
    .finally(() => { changeToInitialText(formEditProfile); })
});


addCardButton.addEventListener('click', function () {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationObject);
  openPopup(addCardPopup);
});

formNewPlace.addEventListener('submit', function (evt) {
  changeTextButton(formNewPlace);
  evt.preventDefault()
  changePlace(placeTitle.value, placeLink.value)
    .then((result) => {
      const card = createCard(cardTemplate, result, onCardClick, myUserId);
      places.prepend(card);

      closePopup(addCardPopup);
    })

    .catch((err) => {
      console.log(err);
    })
    .finally(() => { changeToInitialText(formNewPlace); })
});


function changeTextButton(form) {
  const saveButton = form.querySelector('.popup__button')
  saveButton.textContent = "Сохранение...";
}

function changeToInitialText(form) {
  const saveButton = form.querySelector('.popup__button')
  saveButton.textContent = "Сохранить";
}

enableValidation(validationObject);

Promise.all([getAllCards(), getUser()])
  .then(([cardsRes, userRes]) => {
    myUserId = userRes._id;
    profileName.textContent = userRes.name;
    profileDescrition.textContent = userRes.about;
    profileAvatarImage.style.backgroundImage = `url(${userRes.avatar})`;

    cardsRes.forEach(function (cardItem) {
      const card = createCard(cardTemplate, cardItem, onCardClick, userRes._id);
      places.append(card);
    })
  })
  .catch((err) => {
    console.log(err);
  });