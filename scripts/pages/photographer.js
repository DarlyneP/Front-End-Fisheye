//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographer() {
    const query = await fetch("../../data/photographers.json")
    let result = await query.json()
    let photographers = result.photographers
    let media = result.media
    let photographerId = localStorage.id
    const photographer = photographers.find( element => element.id == photographerId )
    const photographerMedia = []
    for (const el of media) {
        if (el.photographerId == photographerId) {
            photographerMedia.push(el)
        }
    }
    console.log(photographer);
    console.log(photographerMedia);
    fillPage(photographer, photographerMedia)
}

function fillPage(photographer, media) {
    //& Fill photographer header
    const name = document.querySelector('.profile--name')
    name.textContent = photographer.name
    const location = document.querySelector('.profile--location')
    location.textContent = photographer.city
    const tagline = document.querySelector('.profile--tagline')
    tagline.textContent = photographer.tagline
    const profilePicture = document.querySelector('.photographer--picture img')
    profilePicture.setAttribute("src", `assets/photographers/${photographer.portrait}`)

    let likesCount = 0;
    //& Fill media section
    for (const medium of media) {
        likesCount += medium.likes;

        const mediaContent = document.createElement('div');
        mediaContent.classList.add('media--content')

        let img;
        if (medium.image) {
            img = document.createElement('img')
            img.setAttribute('src', `Sample Photos/${photographer.name.split(' ')[0]}/${medium.image}`);
        } else if (medium.video) {
            img = document.createElement('video')
            img.setAttribute('src', `Sample Photos/${photographer.name.split(' ')[0]}/${medium.video}`);
            img.setAttribute('controls', 'controls'); //maybe hide controls, overlay a play icon & show controls in modal play window.
        }
        img.classList.add('media--content__medium')

        const title = document.createElement('h3')
        title.textContent = medium.title;

        const details = document.createElement('span');
        const likesAmount = document.createElement('p');
        likesAmount.textContent = `${medium.likes}`
        const like = document.createElement('img');
        like.setAttribute('src', 'assets/icons/favorite-24px 1.svg')
        like.classList.add('like')

        const mediaSection = document.querySelector('.media')
        mediaSection.appendChild(mediaContent)
        mediaContent.appendChild(img)
        mediaContent.appendChild(title)
        title.appendChild(details)
        details.appendChild(likesAmount)
        details.appendChild(like)
    }
    const totalLikes = document.querySelector('.likes-and-price p')
    totalLikes.textContent = `${likesCount}`;

    const price = document.querySelector('.likes-and-price .price')
    price.textContent = `${photographer.price}€/jour`;
}

getPhotographer()