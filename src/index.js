import './page/index.css';
import { createCard, cardInit, deleteCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
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

// @todo: Вывести карточки на страницу
cardInit(cardTemplate, places, openPopup);

//добавление карточки


addCardButton.addEventListener('click', function () {
    placeTitle.value = "";
    placeLink.value = "";
    openPopup(addCardPopup);

    formNewPlace.addEventListener('submit', function (evt) {
        evt.preventDefault();
        const item = {
            name: placeTitle.value,
            link: placeLink.value,
            alt: placeTitle.value,
        };

        const card = createCard(cardTemplate, item, deleteCard, openPopup);
        places.prepend(card);
        closePopup(addCardPopup);
    });
});


//редактирование профиля
profileEditButton.addEventListener('click', function () {

    editName.value = profileName.textContent;
    editDescription.value = profileDescrition.textContent;

    openPopup(profilePopup);

    formEditProfile.addEventListener('submit', function (evt) {
        evt.preventDefault();
        profileName.textContent = editName.value;
        profileDescrition.textContent = editDescription.value;
        closePopup(profilePopup);
    });
});