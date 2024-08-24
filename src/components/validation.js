

// const formElement = document.querySelector('.popup__form');
// const inputElement = formElement.querySelector('.popup__input');


const showInputError = (formElement, inputElement, errorMessage, validationObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationObject.errorClass);
};


const hideInputError = (formElement, inputElement, validationObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationObject.inputErrorClass);
    errorElement.classList.remove(validationObject.errorClass);
    errorElement.textContent = '';
    inputElement.setCustomValidity("");
};


const checkInputValidity = (formElement, inputElement, validationObject) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationObject);
    } else {
        hideInputError(formElement, inputElement, validationObject);
    }
};

const setEventListeners = (formElement, validationObject) => {
    const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
    const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);

    toggleButtonState(inputList, buttonElement,validationObject);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationObject);
            toggleButtonState(inputList, buttonElement, validationObject);
        });
    });
};


export const enableValidation = (validationObject) => {
    const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
    formList.forEach((formElement) => {

        setEventListeners(formElement, validationObject);
    });
};



const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })

}
const toggleButtonState = (inputList, buttonElement,validationObject) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationObject.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationObject.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

export const clearValidation = (form, validationObject) => {

    const buttonElement = form.querySelector(validationObject.submitButtonSelector);
    console.log(buttonElement);
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
    buttonElement.disabled = false;
    const inputElements = form.querySelectorAll(validationObject.inputSelector);
    inputElements.forEach((inputElement) => {
        hideInputError (form,inputElement,validationObject)
    })

}


