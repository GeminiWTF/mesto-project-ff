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

    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        evt.target.classList.toggle('card__like-button_is-active');
      })
    


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

 




// likeButton.forEach((button, index) => {
//     button.onclick = () => toggleIsLiked(likeButton[index], button);
//   });

//   function toggleIsLiked(heart, button) {
//     heart.classList.toggle('is-liked');
//     setButtonText(heart, button);
//   }

// const addCard = document.querySelector('profile__add-button');
// addCard.addEventListener('click', function (evt) {
//     createCard(item, cardDelete);
//   });

