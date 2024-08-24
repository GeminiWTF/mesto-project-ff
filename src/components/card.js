
// @todo: Функция создания карточки
import { deleteCard, like, unlike} from './api.js';


export function createCard(cardTemplate, cardItem, onCardClick, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  const image = cardElement.querySelector('.card__image');
  image.src = cardItem.link;
  image.alt = cardItem.alt;
  image.addEventListener('click', function () { onCardClick(cardItem) });
  cardElement.dataset.id=cardItem._id

  const likeButton=  cardElement.querySelector('.card__like-button');
  const likeCounter=cardElement.querySelector('.card__like-count');
  likeButton.addEventListener('click', evt=> onLikeClick (likeButton, likeCounter,cardItem._id));

  cardElement.querySelector('.card__like-count').textContent = cardItem.likes.length;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardItem.owner._id == userId) {
    deleteButton.addEventListener('click', onCardDelete);
    deleteButton.hidden = false;
  }
  else {
    deleteButton.hidden = true;
  }



 const liked=cardItem.likes.some (function (like) {
    return  like._id == userId
  });
 if (liked)  {
  likeButton.classList.add('card__like-button_is-active')
}
  return cardElement;
};



function onLikeClick(likeButton, likeCounter, cardId) {
  
  if (likeButton.classList.contains('card__like-button_is-active')) {
   
    unlike(cardId)
      .then(res => { 
        likeButton.classList.remove('card__like-button_is-active') 
        likeCounter.textContent = res.likes.length; })
        .catch((err) => {
          console.log(err);}) 
  }
  else {
  
    like(cardId)
      .then(res => { 
        likeButton.classList.add('card__like-button_is-active')
        likeCounter.textContent = res.likes.length; })
        .catch((err) => {
          console.log(err);})
  }
}

function onCardDelete(event) {
  const listItem = event.target.closest('.places__item');
  deleteCard(listItem.dataset.id)
  .then (() => {
    listItem.remove();})
  .catch((err) => {
    console.log(err);})
};
