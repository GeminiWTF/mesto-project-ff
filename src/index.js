import './page/index.css';
import {initialCards} from './cards.js'; 
// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
 const places = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, cardDelete) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.alt;
 const deleteButton = cardElement.querySelector('.card__delete-button');
 deleteButton.addEventListener('click', cardDelete);
 return cardElement;
};

// @todo: Функция удаления карточки

function deleteCard(event) {

const listItem = event.target.closest('.places__item');
listItem.remove();
};


// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {

    const card = createCard(element, deleteCard);
    places.append(card);});

 