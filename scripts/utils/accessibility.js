import { lightboxDescViaSlider } from "./accessibility/descriptions.js";

// todo : slider navigation with keyboard
function accessibleLightbox () {
    const lightbox = document.querySelector('.mediabox')
    let count = 0 //! Prevents the function from repeating itself out of nowhere & skipping content but a double press down is necessary every 2 medium, will try to change this later
    if (lightbox) { 

        window.addEventListener("keydown", (event) => {
            console.log(event);
            if (lightbox) { //? checking if lightbox exists so that event only activates when lightbox is on
                if (event.key === "ArrowLeft") {
                    if (count > 0) {
                        count = 0
                        return
                    }
                    previousMediumSlide()
                    lightboxDescViaSlider() //~ Adding description
                    count += 1
                } 
            }
        })
        window.addEventListener("keydown", (event) => {
            console.log(event);
            if (lightbox) {
                if (event.key === "ArrowRight") {
                    if (count > 1) {
                        count = 0
                        return
                    }
                    nextMediumSlide()
                    lightboxDescViaSlider() //~ Adding description
                    count += 1
                }  
            }
        })
    }
    return //! Here to prevent the function from repeating itself alone out of nowhere, doesn't work, will use a count instead
}

function previousMediumSlide() {
    
    let photographer = localStorage.currentPhotographerName
    let mediaBox = document.querySelector('.mediabox')
    let currentIndex = mediaBox.querySelector('.mb-medium').attributes.index.value * 1
    let mediaCaroussel = JSON.parse(localStorage.mediaCaroussel)
    let previousMedium;
    let center = document.querySelector('.media-display')
    if (currentIndex === 0) {

        const currentMedium = mediaCaroussel[currentIndex];
        const currentMediumType = currentMedium.mediaContent.split('.')[1]

        previousMedium = mediaCaroussel[mediaCaroussel.length - 1]
        currentIndex = (mediaCaroussel.length - 1) * 1
        const previousMediumType = previousMedium.mediaContent.split('.')[1]

        if (currentMediumType === previousMediumType) {

            let mediumDisplay = document.querySelector('.mb-medium')
            let mediumDisplayTitle = document.querySelector('.medium--title')
            mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
            mediumDisplay.setAttribute('index', `${mediaCaroussel.length - 1}`) //& adding index again when medium is removed & recreated
            mediumDisplayTitle.textContent = `${previousMedium.mediaTitle}`;

            
            
        } else if (currentMediumType !== previousMediumType) {
            //todo if curr is jpg
            if (currentMediumType === "jpg") {

                const mediumToRemove = document.querySelector('.mb-medium')
                const titleToRemove = document.querySelector('.medium--title')
                center.removeChild(mediumToRemove)
                center.removeChild(titleToRemove)

                const insertPreviousMedia = document.createElement('video')
                insertPreviousMedia.setAttribute('controls', 'controls');
                insertPreviousMedia.classList.add('mb-medium')
                insertPreviousMedia.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
                insertPreviousMedia.setAttribute('index', `${mediaCaroussel.length - 1}`) //& adding index again when medium is removed & recreated
                const previousMediaTitle = document.createElement('p')
                previousMediaTitle.classList.add('medium--title')
                previousMediaTitle.textContent = `${previousMedium.mediaTitle}`

                center.appendChild(insertPreviousMedia)
                center.appendChild(previousMediaTitle)
                

            }  else if (currentMediumType === "mp4") { //todo if curr is mp4
    
                const mediumToRemove = document.querySelector('.mb-medium')
                const titleToRemove = document.querySelector('.medium--title')
                center.removeChild(mediumToRemove)
                center.removeChild(titleToRemove)

                const insertPreviousMedia = document.createElement('img')
                insertPreviousMedia.classList.add('mb-medium')
                insertPreviousMedia.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
                insertPreviousMedia.setAttribute('index', `${mediaCaroussel.length - 1}`) //& adding index again when medium is removed & recreated
                const previousMediaTitle = document.createElement('p')
                previousMediaTitle.classList.add('medium--title')
                previousMediaTitle.textContent = `${previousMedium.mediaTitle}`
                
                center.appendChild(insertPreviousMedia)
                center.appendChild(previousMediaTitle)
    
            }
        }

    } else {

        const currentMedium = mediaCaroussel[currentIndex];
        const currentMediumType = currentMedium.mediaContent.split('.')[1]

        //const previousIndex = currentIndex -= 1
        const previousIndex = currentIndex - 1
        currentIndex -= 1

        previousMedium = mediaCaroussel[previousIndex]
        const previousMediumType = previousMedium.mediaContent.split('.')[1]

        //todo : compare types of current & previous media
        if (currentMediumType === previousMediumType) {
            
            let mediumDisplay = document.querySelector('.mb-medium')
            let mediumDisplayTitle = document.querySelector('.medium--title')
            mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
            mediumDisplay.setAttribute('index', `${previousIndex}`) //& adding index again when medium is removed & recreated
            mediumDisplayTitle.textContent = `${previousMedium.mediaTitle}`;

            

        } else if (currentMediumType !== previousMediumType) {
            //todo if curr is jpg
            if (currentMediumType === "jpg") {

                const mediumToRemove = document.querySelector('.mb-medium')
                const titleToRemove = document.querySelector('.medium--title')
                center.removeChild(mediumToRemove)
                center.removeChild(titleToRemove)

                const insertPreviousMedia = document.createElement('video')
                insertPreviousMedia.setAttribute('controls', 'controls');
                insertPreviousMedia.classList.add('mb-medium')
                insertPreviousMedia.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
                insertPreviousMedia.setAttribute('index', `${previousIndex}`) //& adding index again when medium is removed & recreated
                const previousMediaTitle = document.createElement('p')
                previousMediaTitle.classList.add('medium--title')
                previousMediaTitle.textContent = `${previousMedium.mediaTitle}`

                center.appendChild(insertPreviousMedia)
                
                center.appendChild(previousMediaTitle)

            }  else if (currentMediumType === "mp4") { //todo if curr is mp4
    
                const mediumToRemove = document.querySelector('.mb-medium')
                const titleToRemove = document.querySelector('.medium--title')
                center.removeChild(mediumToRemove)
                center.removeChild(titleToRemove)

                const insertPreviousMedia = document.createElement('img')
                insertPreviousMedia.classList.add('mb-medium')
                insertPreviousMedia.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
                insertPreviousMedia.setAttribute('index', `${previousIndex}`) //& adding index again when medium is removed & recreated
                const previousMediaTitle = document.createElement('p')
                previousMediaTitle.classList.add('medium--title')
                previousMediaTitle.textContent = `${previousMedium.mediaTitle}`
                
                center.appendChild(insertPreviousMedia)
                center.appendChild(previousMediaTitle)
    
            }
        }

    }

    return //! Here to prevent the function from lauching itself again & entering in another for an unknown reason, which makes the slider skip a picture.

}

function nextMediumSlide() {

    let photographer = localStorage.currentPhotographerName
    let mediaCaroussel = JSON.parse(localStorage.mediaCaroussel)
    let center = document.querySelector('.media-display')
    let currentIndex = document.querySelector('.mb-medium').attributes.index.value * 1
    const currentMedium = mediaCaroussel[currentIndex];
    const currentMediumType = currentMedium.mediaContent.split('.')[1]

    //const nextIndex = currentIndex += 1
    let nextIndex;
    let nextMedium;
    let nextMediumType;

    //todo in the future maybe : Handling going from last medium back to first medium
    const carousselLimit = (mediaCaroussel.length - 1) * 1
    if (currentIndex === carousselLimit) {
        console.log("Limit is reached, resetting the slider");

        nextIndex = 0
        console.log("next index : ", nextIndex);
        nextMedium = mediaCaroussel[nextIndex]
        nextMediumType = nextMedium.mediaContent.split('.')[1]

    } else {
        console.log("Limit is not reached");

        nextIndex = 1 * currentIndex + 1
        console.log("next index : ", nextIndex);
        nextMedium = mediaCaroussel[nextIndex]
        nextMediumType = nextMedium.mediaContent.split('.')[1]

        currentIndex += 1
        }

    //* Handling sliding in normal order
    //todo : compare types of current & next media
    if (currentMediumType === nextMediumType) {
        
        let mediumDisplay = document.querySelector('.mb-medium')
        let mediumDisplayTitle = document.querySelector('.medium--title')
        mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
        mediumDisplay.setAttribute('index', `${nextIndex}`) //& adding index again when medium is removed & recreated
        mediumDisplayTitle.textContent = `${nextMedium.mediaTitle}`;

    } else if (currentMediumType !== nextMediumType) {
        //todo if curr is jpg
        if (currentMediumType === "jpg") {

            const mediumToRemove = document.querySelector('.mb-medium')
            const titleToRemove = document.querySelector('.medium--title')
            center.removeChild(mediumToRemove)
            center.removeChild(titleToRemove)

            const insertNextMedia = document.createElement('video')
            insertNextMedia.setAttribute('controls', 'controls');
            insertNextMedia.classList.add('mb-medium')
            insertNextMedia.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
            insertNextMedia.setAttribute('index', `${nextIndex}`) //& adding index again when medium is removed & recreated
            const nextMediaTitle = document.createElement('p')
            nextMediaTitle.classList.add('medium--title')
            nextMediaTitle.textContent = `${nextMedium.mediaTitle}`

            center.appendChild(insertNextMedia)
            center.appendChild(nextMediaTitle)

        }  else if (currentMediumType === "mp4") { //todo if curr is mp4

            const mediumToRemove = document.querySelector('.mb-medium')
            const titleToRemove = document.querySelector('.medium--title')
            center.removeChild(mediumToRemove)
            center.removeChild(titleToRemove)

            const insertNextMedia = document.createElement('img')
            insertNextMedia.classList.add('mb-medium')
            insertNextMedia.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
            insertNextMedia.setAttribute('index', `${nextIndex}`) //& adding index again when medium is removed & recreated
            const nextMediaTitle = document.createElement('p')
            nextMediaTitle.classList.add('medium--title')
            nextMediaTitle.textContent = `${nextMedium.mediaTitle}`

            center.appendChild(insertNextMedia)
            center.appendChild(nextMediaTitle)

        }
        if (currentIndex === carousselLimit) {
            currentIndex = 0
        }
        return
    }

    return //! Here to prevent the function from lauching itself again & entering in another for an unknown reason, which makes the slider skip a picture.
}

export { accessibleLightbox };