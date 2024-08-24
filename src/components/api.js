const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
    headers: {
            authorization: '981d1445-7444-4597-a62e-ceb26a3a3c13',
               'Content-Type': 'application/json'
        }
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

export const getAllCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }) .then((res) =>  getResponseData(res))}
;

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }) .then((res) =>  getResponseData(res))}


export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/` + id, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) =>  getResponseData(res))
}

export const like = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/` + id, {
        method: 'PUT',
        headers: config.headers,
    }) .then((res) =>  getResponseData(res))}


export const unlike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/` + id, {
        method: 'DELETE',
        headers: config.headers,
    }) .then((res) =>  getResponseData(res))}


export const changeAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  })
  
  .then((res) =>  getResponseData(res))}

export const changeProfile = (name,about) => {
   return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
      body: JSON.stringify({
          name: name,
          about: about,
        })
    })
    .then((res) =>  getResponseData(res))}



 
  export const changePlace = (placeTitle, placeLink) => {
    return  fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
         headers: config.headers,
              body: JSON.stringify({
          name: placeTitle,
          link: placeLink
        })
      })
      .then((res) =>  getResponseData(res))}
       
      
     
    

