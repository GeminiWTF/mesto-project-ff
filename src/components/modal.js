export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
    // popup.querySelector('.popup__close').addEventListener('click', closePopupButton);
    popup.addEventListener('click', closePopupEvent);
}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

function closePopupEvent (evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    }
}


// function closePopupButton(evt) {
//     const popup = evt.target.closest('.popup');
//     closePopup(popup);



export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
    // popup.querySelector('.popup__close').removeEventListener('click', closePopupButton);
    popup.removeEventListener('click', closePopupEvent);
}

