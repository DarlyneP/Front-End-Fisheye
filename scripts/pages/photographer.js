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
    console.log(photographerMedia[0])
    console.log(photographerMedia[0][2])
    fillPage(photographer, photographerMedia)
}

function fillPage(photographer, media) {
    
    localStorage.setItem("currentPhotographerName", photographer.name.split(' ')[0])
    
    //& Fill photographer header
    const name = document.querySelector('.profile--name')
    name.textContent = photographer.name
    const location = document.querySelector('.profile--location')
    location.textContent = `${photographer.city}, ${photographer.country}`
    const tagline = document.querySelector('.profile--tagline')
    tagline.textContent = photographer.tagline
    const profilePicture = document.querySelector('.photographer--picture img')
    profilePicture.setAttribute("src", `assets/photographers/${photographer.portrait}`)
    
    let likesCount = 0;
    
    //& Fill media section
    let mediaCaroussel = [];
    let carousselIndex = 0;
    for (const medium of media) {
        const { id, photographerId, mediumType, title, likes, date, price } = medium; //& factory pattern
        //* summing up likes of each media to show total of likes
        //likesCount += medium.likes;
        likesCount += likes;

        const mediaContent = document.createElement('div');
        mediaContent.classList.add('media--content')
        
        let img;
        let mediaItem = {
            mediaTitle: "",
            mediaContent: ""
        }
        if (medium.image) {
            img = document.createElement('img')
            img.setAttribute('src', `Sample Photos/${photographer.name.split(' ')[0]}/${medium.image}`);
            mediaItem.mediaContent = medium.image
            //mediaCaroussel.push(medium.image)
            //localStorage.mediaCaroussel.push(medium.image)
        } else if (medium.video) {
            img = document.createElement('video')
            img.setAttribute('src', `Sample Photos/${photographer.name.split(' ')[0]}/${medium.video}`);
            //img.setAttribute('controls', 'controls'); //maybe hide controls, overlay a play icon & show controls in modal play window.
            mediaItem.mediaContent = medium.video
            //mediaCaroussel.push(medium.video)
            //localStorage.mediaCaroussel.push(medium.video)
        }
        img.setAttribute('title', `${medium.title}`)
        img.setAttribute('tabindex', `0`)
        img.classList.add('media--content__medium')
        //img.addEventListener("click", openFocus) //! moved to lightbox.js
        img.setAttribute('index', `${carousselIndex}`)
        carousselIndex += 1;

        const mediumTitle = document.createElement('h3')
        mediumTitle.textContent = medium.title;
        mediaItem.mediaTitle = medium.title

        mediaCaroussel.push(mediaItem)

        const details = document.createElement('span');
        const likesAmount = document.createElement('p');
        likesAmount.textContent = `${medium.likes}`
        const like = document.createElement('img');
        like.setAttribute('src', 'assets/icons/favorite-24px 1.svg')
        like.setAttribute('liked', 'false')
        like.classList.add('like')
        like.addEventListener("click", /*toggleLike*/ (event) => {
            let nbLikes = event.currentTarget.previousSibling.innerHTML * 1
            let totalLikes = document.querySelector('.likes-total').textContent * 1;
            console.log(event.currentTarget)
            let likeStatus = event.currentTarget.attributes.liked.value // .nodeValue or .textContent also working
            if (likeStatus === 'false') {
                //likeStatus = 'true'
                like.setAttribute('liked', 'true')
                nbLikes += 1
                totalLikes += 1
                event.currentTarget.previousSibling.innerHTML = `${nbLikes}`;
                document.querySelector('.likes-total').textContent = `${totalLikes}`;
            } else if (likeStatus === 'true') {
                //likeStatus = 'false'
                like.setAttribute('liked', 'false')
                nbLikes -= 1
                totalLikes -= 1
                event.currentTarget.previousSibling.innerHTML = `${nbLikes}`;
                document.querySelector('.likes-total').textContent = `${totalLikes}`;
            }
        })

        const mediaSection = document.querySelector('.media')
        mediaSection.appendChild(mediaContent)
        mediaContent.appendChild(img)
        mediaContent.appendChild(mediumTitle)
        mediumTitle.appendChild(details)
        details.appendChild(likesAmount)
        details.appendChild(like)
    }
    const totalLikes = document.querySelector('.likes-and-price p')
    totalLikes.textContent = `${likesCount} `;

    const price = document.querySelector('.likes-and-price .price')
    price.textContent = `${photographer.price}€ / jour`;

    localStorage.setItem("mediaCaroussel", JSON.stringify(mediaCaroussel)); //! turning array into string as localStorage stores strings
    //localStorage.setItem("mediaCaroussel", mediaCaroussel);
    //localStorage.setItem("mediaCaroussel", mediaCaroussel.stringify());
    /*for (const medium of mediaCaroussel) {
        medium.addEventListener("click", openFocus)
        //medium.addEventListener("")
    }*/
}

//! function openfocus moved to lightbox.js

getPhotographer()

export {fillPage};