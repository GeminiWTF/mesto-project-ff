import './page/index.css';
import { createCard, cardsInit } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { initialCards } from './cards.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const places = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescrition = document.querySelector('.profile__description');
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
const popupImage = document.querySelector('.popup_type_image');


function onCardClick(cardItem) {
    popupImage.querySelector('.popup__image').src = cardItem.link;;
    popupImage.querySelector('.popup__caption').textContent = cardItem.name;
    openPopup(popupImage);
}

function onLikeClick(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_is-active');
}

function onCardDelete(event) {
    const listItem = event.target.closest('.places__item');
    listItem.remove();
};


// @todo: Вывести карточки на страницу

initialCards.forEach(function (cardItem) {
    const card = createCard(cardTemplate, cardItem, onCardDelete, onCardClick, onLikeClick);
    places.append(card);
});

addCardButton.addEventListener('click', function () {
    formNewPlace.reset();
    openPopup(addCardPopup);
});

formNewPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const item = {
        name: placeTitle.value,
        link: placeLink.value,
        alt: placeTitle.value,
    };

    const card = createCard(cardTemplate, item, onCardDelete, onCardClick, onLikeClick);
    places.prepend(card);
    closePopup(addCardPopup);
});



//редактирование профиля
profileEditButton.addEventListener('click', function () {
    editName.value = profileName.textContent;
    editDescription.value = profileDescrition.textContent;

    openPopup(profilePopup);
});

formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();

    profileName.textContent = editName.value;
    profileDescrition.textContent = editDescription.value;

    closePopup(profilePopup);
});