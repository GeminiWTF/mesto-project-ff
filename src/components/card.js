
// @todo: Функция создания карточки
export function createCard(cardTemplate, cardItem, onCardDelete, onCardClick, onLikeClick, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  const image = cardElement.querySelector('.card__image');
  image.src = cardItem.link;
  image.alt = cardItem.alt;
  image.addEventListener('click', function () { onCardClick(cardItem) });
  cardElement.dataset.id=cardItem._id

  const likeButton=  cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', onLikeClick)
  cardElement.querySelector('.card__like-count').textContent = cardItem.likes.length;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardItem.owner._id == userId) {
    deleteButton.addEventListener('click', onCardDelete);
    deleteButton.hidden = false;
  }
  else {
    deleteButton.hidden = true;
  }

 
  cardItem.likes.forEach (function (like) {
    if  (like._id == userId) {
      likeButton.classList.add('card__like-button_is-active')
       }
  });
  
  return cardElement;
};

const onLikeClick = ()=>{
  if (cardItem.owner._id !== userId) {
    cardElement.querySelector('.card__like-button').addEventListener('click', onLikeClick);
  }
  else card__like-button.setAttribute ('disabled, true')
}


