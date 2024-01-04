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
        //* summing up likes of each media to show total of likes
        likesCount += medium.likes;

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
        img.classList.add('media--content__medium')
        img.addEventListener("click", openFocus)
        img.setAttribute('index', `${carousselIndex}`)
        carousselIndex += 1;

        const title = document.createElement('h3')
        title.textContent = medium.title;
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
        mediaContent.appendChild(title)
        title.appendChild(details)
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

function openFocus(event) {
    console.log(event.currentTarget.src)
    console.log(event.currentTarget.attributes)
    console.log(event.currentTarget.attributes.src)
    //console.log(event.currentTarget.attributes.src.split("/")[2])
    console.log(event.currentTarget)

    //const src = event.currentTarget.attributes.src.nodeValue
    const targetTitle = event.currentTarget.attributes.title.textContent
    const src = event.currentTarget.attributes.src.textContent //! same as above
    const targetMedium = src.split("/")[2]
    let currentIndex = event.currentTarget.attributes.index.value * 1

    console.log(src)
    console.log(targetMedium)
    console.log('caroussel index : ', currentIndex)

    let photographer = localStorage.currentPhotographerName

    //* creating modal for mediabox
    const mbModal = document.createElement('div')
    mbModal.classList.add('mb-modal')
    document.querySelector('body').appendChild(mbModal)

    //* creating mediabox
    const mediaBox = document.createElement('div')
    mediaBox.classList.add('mediabox')
    mbModal.appendChild(mediaBox)

    const leftSide = document.createElement('div')
    leftSide.classList.add('leftside')
    const leftArrow = document.createElement('img')
    leftArrow.setAttribute('src', `assets/icons/expand_more-24px 4.svg`);
    leftArrow.classList.add('leftarrow')
    leftArrow.addEventListener("click", /* previousMedia */ (event) => {
        let mediaCaroussel = JSON.parse(localStorage.mediaCaroussel)
        let previousMedium;
        if (currentIndex === 0) {

            previousMedium = mediaCaroussel[mediaCaroussel.length - 1]
            let mediumDisplay = document.querySelector('.mb-medium')
            let mediumDisplayTitle = document.querySelector('.medium--title')
            mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
            mediumDisplayTitle.textContent = `${previousMedium.mediaTitle}`;

        } else {

            const previousIndex = currentIndex -= 1
            previousMedium = mediaCaroussel[previousIndex]
            let mediumDisplay = document.querySelector('.mb-medium')
            let mediumDisplayTitle = document.querySelector('.medium--title')
            mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
            mediumDisplayTitle.textContent = `${previousMedium.mediaTitle}`;

        }
    })
    leftSide.appendChild(leftArrow)

    const center = document.createElement('div')
    center.classList.add('media-display')
    let medium;
    if (targetMedium.includes('jpg')) {
        medium = document.createElement('img')
        //medium.setAttribute('src', `Sample Photos/${photographer.name.split(' ')[0]}/${targetMedium}`);
    } else if (targetMedium.includes('mp4')) {
        medium = document.createElement('video')
        //medium.setAttribute('src', `Sample Photos/${photographer.name.split(' ')[0]}/${targetMedium}`);
        medium.setAttribute('controls', 'controls');
    }
    medium.setAttribute('src', `Sample Photos/${photographer}/${targetMedium}`);
    medium.setAttribute('index', `${currentIndex}`) //& récupération & mise en place de l'index pour le caroussel
    medium.classList.add('mb-medium')
    const title = document.createElement('p')
    title.classList.add('medium--title')
    title.textContent = `${targetTitle}`;

    center.appendChild(medium)
    center.appendChild(title)

    const rightSide = document.createElement('div')
    rightSide.classList.add('rightside')
    const close = document.createElement('img')
    close.setAttribute("src", `assets/icons/close-24px 1.svg`)
    close.classList.add('close')
    close.addEventListener("click", () => {
        mbModal.style.display = "none"
        document.querySelector('body').removeChild(mbModal)
    })
    const rightArrow = document.createElement('img')
    rightArrow.setAttribute('src', `assets/icons/expand_more-24px 5.svg`);
    rightArrow.classList.add('rightarrow')
    rightArrow.addEventListener("click", /* nextMedia */ (event) => {
        let mediaCaroussel = JSON.parse(localStorage.mediaCaroussel)
        const nextIndex = currentIndex += 1
        const nextMedium = mediaCaroussel[nextIndex]
        let mediumDisplay = document.querySelector('.mb-medium')
        let mediumDisplayTitle = document.querySelector('.medium--title')
        mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
        mediumDisplayTitle.textContent = `${nextMedium.mediaTitle}`;
    })
    rightSide.appendChild(close)
    rightSide.appendChild(rightArrow)

    mediaBox.appendChild(leftSide)
    mediaBox.appendChild(center)
    mediaBox.appendChild(rightSide)
}

getPhotographer()