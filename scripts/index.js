// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function addPlace(title, image) {


    const places = document.querySelector('.places__list');
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = image;
    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', function () {
        deleteCard(deleteButton);
    });

    places.append(cardElement);
};

// @todo: Функция удаления карточки

function deleteCard(deleteButton) {
    const listItem = deleteButton.closest('.places__item');
    listItem.remove();
};

// @todo: Вывести карточки на страницу


initialCards.forEach(function (element) {
    addPlace(element.name, element.link, deleteCard)
});

