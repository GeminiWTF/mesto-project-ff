(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"981d1445-7444-4597-a62e-ceb26a3a3c13","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=function(n){return fetch("".concat(e.baseUrl,"/cards/")+n,{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))};function r(n,r,c,a){var u=n.querySelector(".places__item").cloneNode(!0);u.querySelector(".card__title").textContent=r.name;var i=u.querySelector(".card__image");i.src=r.link,i.alt=r.alt,i.addEventListener("click",(function(){c(r)})),u.dataset.id=r._id;var l=u.querySelector(".card__like-button"),s=u.querySelector(".card__like-count");l.addEventListener("click",(function(n){return function(n,r,o){var c;n.classList.contains("card__like-button_is-active")?(c=o,fetch("".concat(e.baseUrl,"/cards/likes/")+c,{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){n.classList.remove("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/")+n,{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(o).then((function(e){n.classList.add("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log(e)}))}(l,s,r._id)})),u.querySelector(".card__like-count").textContent=r.likes.length;var d=u.querySelector(".card__delete-button");r.owner._id==a?(d.addEventListener("click",o),d.hidden=!1):d.hidden=!0;var p=r.likes.some((function(e){return e._id==a}));return p&&l.classList.add("card__like-button_is-active"),u}function o(e){var t=e.target.closest(".places__item");n(t.dataset.id).then((function(){t.remove()})).catch((function(e){console.log(e)}))}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a),e.addEventListener("click",u)}function a(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function u(e){(e.target===e.currentTarget||e.target.classList.contains("popup__close"))&&i(e.currentTarget)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a),e.removeEventListener("click",u)}var l,s=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent="",t.setCustomValidity("")},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)},p=function(e,t){var n=e.querySelector(t.submitButtonSelector);console.log(n),n.classList.remove(t.inactiveButtonClass),n.disabled=!1,e.querySelectorAll(t.inputSelector).forEach((function(n){s(e,n,t)}))};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _=document.querySelector("#card-template").content,m=document.querySelector(".places__list"),y=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),h=document.querySelector(".profile__image"),S=document.querySelector(".popup__input_type_name"),b=document.querySelector(".popup__input_type_description"),g=document.querySelector(".popup__input_type_card-name"),q=document.querySelector(".popup__input_type_url"),C=document.querySelector(".profile__add-button"),k=document.querySelector(".profile__edit-button"),L=document.querySelector(".popup_type_edit"),E=document.querySelector(".popup_type_new-card"),x=document.forms.namedItem("edit-profile"),A=document.forms.namedItem("new-place"),U=document.forms.namedItem("edit-avatar"),T=document.querySelector(".popup_type_image"),w=document.querySelector(".profile__image"),I=document.querySelector(".popup_type_avatar"),j=document.querySelector(".popup__input_type_avatar_url"),B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function O(e){T.querySelector(".popup__image").src=e.link,T.querySelector(".popup__image").alt=e.name,T.querySelector(".popup__caption").textContent=e.name,c(T)}function P(e){e.querySelector(".popup__button").textContent="Сохранение..."}function D(e){e.querySelector(".popup__button").textContent="Сохранить"}w.addEventListener("click",(function(e){console.log(e),p(U,B),c(I)})),U.addEventListener("submit",(function(n){P(U),n.preventDefault(),function(n){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then((function(e){return t(e)}))}(j.value).then((function(e){console.log(e),h.style.backgroundImage="url(".concat(e.avatar,")"),i(I)})).catch((function(e){console.log(e)})).finally((function(){D(U)}))})),k.addEventListener("click",(function(){S.value=y.textContent,b.value=v.textContent,p(x,B),c(L)})),x.addEventListener("submit",(function(n){var r,o;n.preventDefault(),P(x),(r=S.value,o=b.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){y.textContent=e.name,v.textContent=e.about,i(L)})).catch((function(e){console.log(e)})).finally((function(){D(x)}))})),C.addEventListener("click",(function(){A.reset(),p(A,B),c(E)})),A.addEventListener("submit",(function(n){P(A),n.preventDefault(),function(n,r){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return t(e)}))}(g.value,q.value).then((function(e){var t=r(_,e,O,l);m.prepend(t),i(E)})).catch((function(e){console.log(e)})).finally((function(){D(A)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(t,e)}))}(B),Promise.all([fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];l=a._id,y.textContent=a.name,v.textContent=a.about,h.style.backgroundImage="url(".concat(a.avatar,")"),c.forEach((function(e){var t=r(_,e,O,a._id);m.append(t)}))})).catch((function(e){console.log(e)}))})();