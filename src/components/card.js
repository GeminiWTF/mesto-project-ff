
// @todo: Функция создания карточки
export function createCard(cardTemplate, cardItem, onCardDelete, onCardClick, onLikeClick) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardItem.name;
    const image=cardElement.querySelector('.card__image');
    image.src = cardItem.link;
    image.alt = cardItem.alt;
    image.addEventListener('click', function (){onCardClick(cardItem)});

    cardElement.querySelector('.card__like-button').addEventListener('click', onLikeClick);
        
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', onCardDelete);
  
    return cardElement;
  };
  
