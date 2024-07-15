import './page/index.css';
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



// @todo: Функция создания карточки
function createCard(item, cardDelete) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.alt;
    cardElement.addEventListener('click', openCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like-button_is-active');

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
    places.append(card);
});




//добавление карточки

const addCardButton = document.querySelector('.profile__add-button');

addCardButton.addEventListener('click', function () {
    const addCardPopup = document.querySelector('.popup_type_new-card');

    openPopup(addCardPopup);
});


//редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
    const profilePopup = document.querySelector('.popup_type_edit');

    // редактирование попапа с профилем



    const saveButton = document.querySelector('.popup__button');

    editName.value = profileName.textContent;
    editDescription.value = profileDescrition.textContent;

    openPopup(profilePopup);
});


//



const formElement = document.forms.namedItem('edit-profile');

formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDescrition.textContent = editDescription.value;
});



// увеличение карточки, функцию добавили 

function openCard(evt) {
    const card = evt.target.closest('.card');
    console.log(card);
    const cardImageSrc = card.querySelector('.card__image').src;
    const cardTitleText = card.querySelector('.card__title').textContent;
    const popupImage = document.querySelector('.popup_type_image');
    popupImage.querySelector('.popup__image').src = cardImageSrc;
    popupImage.querySelector('.popup__caption').textContent = cardTitleText;
    openPopup(popupImage);

}


// заполнение формы на создание новой карточки
const formCardElement = document.forms.namedItem('new-place');

formCardElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const item = {
        name: placeTitle.value,
        link: placeLink.value,
        alt: placeTitle.value,
    };

    const card = createCard(item, deleteCard);
    places.prepend(card);
});



// закрытие окна 

// document.addEventListener('keydown', function (evt) {
//     if (evt.key === 'Escape') {
//         if
//             (document.hasAttribute('.popup_is-opened')) {
//             document.querySelector('.popup_is-opened').classList.remove('popup_is-opened')
//         }
//     }
// });



// закрытие окна по кнопке
// const closePopup = document.querySelectorAll(".popup__close");
// closePopup.forEach(function (closePopup) {
//     closePopup.addEventListener('click', function (evt) {
//         if (evt.target === closePopup) {
//             document.querySelector('.popup_is-opened').classList.remove('popup_is-opened')
//         }
//     })
// });


//     document.querySelector(".popup__close").addEventListener('click', function () {

//     document.querySelector('.popup_is-opened').classList.remove('popup_is-opened')

//  });


// document.addEventListener('click', function (evt) {
//     if (evt === document.querySelector('.popup__close')){
//         document.querySelector('.popup_is-opened').classList.remove('popup_is-opened')
//     }
// });
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown',closePopupEsc );
    popup.querySelector('.popup__close').addEventListener('click', closePopupButton);
    popup.addEventListener('click', closePopupOverlay);
    
}
function closePopupEsc (evt) {
        if (evt.key === 'Escape') {
            const popup=document.querySelector('.popup_is-opened');
           closePopup(popup);
        }
    }

function closePopupOverlay (evt) {
   if (evt.target===evt.currentTarget) {
    closePopup(evt.target);
   }

}

function closePopupButton(evt){
  const popup=evt.target.closest('.popup');
  closePopup(popup);
}


function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
    popup.querySelector('.popup__close').removeEventListener('click', closePopupButton);
    popup.removeEventListener('click', closePopupOverlay);
}