import './page/index.css';
import { createCard, cardsInit } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
// import { initialCards } from './cards.js';
import { getAllCards, getUser, deleteCard, like, unlike, changeAvatar, changeProfile, changePlace } from './api.js';
import { enableValidation, clearValidation } from './validation.js';

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


function onCardClick(cardItem) {
  popupImage.querySelector('.popup__image').src = cardItem.link;
  popupImage.querySelector('.popup__caption').textContent = cardItem.name;
  openPopup(popupImage);
}

function onLikeClick(evt) {
  const likeButton = evt.target;
  const listItem = event.target.closest('.places__item');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active')
    unlike(listItem.dataset.id)
      .then(res => { listItem.querySelector('.card__like-count').textContent = res.likes.length; });
  }
  else {
    likeButton.classList.add('card__like-button_is-active')
    like(listItem.dataset.id)
      .then(res => { listItem.querySelector('.card__like-count').textContent = res.likes.length; });
  }
}

function onCardDelete(event) {
  const listItem = event.target.closest('.places__item');
  deleteCard(listItem.dataset.id);
  listItem.remove();
};

// @todo: Вывести карточки на страницу

// initialCards.forEach(function (cardItem) {
//   const card = createCard(cardTemplate, cardItem, onCardDelete, onCardClick, onLikeClick);
//   places.append(card);
// });

addCardButton.addEventListener('click', function () {
  formNewPlace.reset();
  clearValidation(addCardPopup);
  openPopup(addCardPopup);
});


//редактирование профиля
profileEditButton.addEventListener('click', function () {
  editName.value = profileName.textContent;
  editDescription.value = profileDescrition.textContent;
  clearValidation(profilePopup);
  openPopup(profilePopup);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


Promise.all([getAllCards(), getUser()])
  .then(([cardsRes, userRes]) => {

    profileName.textContent = userRes.name;
    profileDescrition.textContent = userRes.about;
    profileAvatarImage.style.backgroundImage =`url(${userRes.avatar})` ;

    console.log(userRes, cardsRes);

    cardsRes.forEach(function (cardItem) {
      const card = createCard(cardTemplate, cardItem, onCardDelete, onCardClick, onLikeClick, userRes._id);
      places.append(card);
    })
  })
  .catch((err) => {
    console.log(err);
  });


const avatarEdit = (evt) => {
  console.log(evt)
  clearValidation(avatarPopup);
  openPopup(avatarPopup);
}

avatarEditProfile.addEventListener('click', avatarEdit);

formEditAvatar.addEventListener('submit', function (evt) {
  changeTextButton(formEditAvatar);
  evt.preventDefault();
  changeAvatar(avatar.value)
    .then((result) => {
      console.log(result)

      profileAvatarImage.style.backgroundImage =`url(${result.avatar})`;

      changeToInitialText(formEditAvatar);
      closePopup(avatarPopup);
    })

    .catch((err) => {
      console.log(err);
    });
});


formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();

  changeTextButton(formEditProfile);
  changeProfile(editName.value, editDescription.value)
    .then((result) => {

      profileName.textContent = result.name;
      profileDescrition.textContent = result.about;
      changeToInitialText(formEditProfile);
      closePopup(profilePopup);
    })

    .catch((err) => {
      console.log(err);
    });
});


formNewPlace.addEventListener('submit', function (evt) {
  changeTextButton(formNewPlace);
  evt.preventDefault()
  changePlace(placeTitle.value, placeLink.value)
    .then((result) => {
      const card = createCard(cardTemplate, result, onCardDelete, onCardClick, onLikeClick);
      places.prepend(card);
      changeToInitialText(formNewPlace);
      closePopup(addCardPopup);
    })

    .catch((err) => {
      console.log(err);
    });
});


function changeTextButton(form) {
  const saveButton = form.querySelector('.popup__button')
  saveButton.textContent = "Сохранение...";
}

function changeToInitialText(form) {
  const saveButton = form.querySelector('.popup__button')
  saveButton.textContent = "Сохранить";
}