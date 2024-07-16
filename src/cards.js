export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Горный ландшафт Архыза",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Озеро в Челябинской области",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Девятиэтажка в Иваново",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Природа Камчатки",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Железная дорога в Холмогорском районе",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Зимний пейжаз утеса на Байкале",
  }
];


// // @todo: Функция создания карточки
// export function createCard(cardTemplate, item, cardDelete, openPopup) {
//   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
//   cardElement.querySelector('.card__title').textContent = item.name;
//   cardElement.querySelector('.card__image').src = item.link;
//   cardElement.querySelector('.card__image').alt = item.alt;
//   cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
//     const eventTarget = evt.target;
//     eventTarget.classList.toggle('card__like-button_is-active');

//   })

//   const deleteButton = cardElement.querySelector('.card__delete-button');
//   deleteButton.addEventListener('click', cardDelete);

//   cardElement.querySelector('.card__image').addEventListener('click', function (evt) { openCard(evt, openPopup) });
//   return cardElement;
// };

// // @todo: Функция удаления карточки

// export function deleteCard(event) {

//   const listItem = event.target.closest('.places__item');
//   listItem.remove();
// };

// function openCard(evt, openPopup) {
//   const card = evt.target.closest('.card');
//   const cardImageSrc = card.querySelector('.card__image').src;
//   const cardTitleText = card.querySelector('.card__title').textContent;
//   const popupImage = document.querySelector('.popup_type_image');
//   popupImage.querySelector('.popup__image').src = cardImageSrc;
//   popupImage.querySelector('.popup__caption').textContent = cardTitleText;
//   openPopup(popupImage);
// }



// export function cardInit(cardTemplate, places, openPopup) {
//   initialCards.forEach(function (element) {
//     const card = createCard(cardTemplate, element, deleteCard, openPopup);
//     places.append(card);
//   });
// }