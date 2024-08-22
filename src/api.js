const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
    headers: {
            authorization: '981d1445-7444-4597-a62e-ceb26a3a3c13',
               'Content-Type': 'application/json'
        }
}

export const getAllCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(res => res.json())

};

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then(res => res.json())
};


export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/` + id, {
        method: 'DELETE',
        headers: config.headers,
    })
}

export const like = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/` + id, {
        method: 'PUT',
        headers: config.headers,
    }).then(res => res.json())
}


export const unlike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/` + id, {
        method: 'DELETE',
        headers: config.headers,
    }).then(res => res.json())
}


export const changeAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  })
  
    .then(res => res.json())}

export const changeProfile = (name,about) => {
   return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
      body: JSON.stringify({
          name: name,
          about: about,
        })
    })
 .then(res => res.json())}

 
  export const changePlace = (placeTitle, placeLink) => {
    return  fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
         headers: config.headers,
              body: JSON.stringify({
          name: placeTitle,
          link: placeLink
        })
      })
        .then(res => res.json())
  }
