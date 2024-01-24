import { accessibleLightbox } from "./accessibility.js";
import { lightboxDescription } from "./accessibility/descriptions.js";
import { lightboxDescViaSlider } from "./accessibility/descriptions.js";

function openFocus(event) {
    let targetTitle = "";
    let src = "";
    let targetMedium = "";
    let currentIndex = ""; 
    if (event.srcElement) {
        
        console.log(event.srcElement) //! replaced "currentTarget" by "srcElement" everywhere as the browser no longer recognizes cT with this function at least
        console.log(event.srcElement.attributes)
        console.log(event.srcElement.attributes.title)
        console.log(event.srcElement.attributes.title.value)
        //console.log(event.currentTarget.attributes.src.split("/")[2])
        //console.log(event.currentTarget) //! no longer works for same reason as explained below
    
        //const src = event.currentTarget.attributes.src.nodeValue
        //const targetTitle = event.currentTarget.attributes.title.textContent //! no longer works for same reason as explained below
        //const src = event.currentTarget.attributes.src.textContent //! same as above //! no longer works for an unknown reason, the browser processes the event differently now

        //^ SOLVED : "currentTarget" no longer works because openFocus is also opened secondarily by calls, not just event listeners. In secondary executions (calls), srcElement works instead.

        targetTitle = event.srcElement.attributes.title.value
        src = event.srcElement.attributes.src.textContent
        targetMedium = src.split("/")[2]
        currentIndex = event.srcElement.attributes.index.value * 1
    } else if (!event.srcElement) {
        targetTitle = event.attributes.title.value
        src = event.attributes.src.textContent
        targetMedium = src.split("/")[2]
        currentIndex = event.attributes.index.value * 1
    }

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
    mediaBox.setAttribute('aria-label', 'image close-up view') //& accessibility : description of lightbox functionality
    mediaBox.setAttribute('aria-modal', 'true') //& accessibility : informs user lightbox is modal & interaction is limited to it until dismissed
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

            const currentMedium = mediaCaroussel[currentIndex];
            const currentMediumType = currentMedium.mediaContent.split('.')[1]

            previousMedium = mediaCaroussel[mediaCaroussel.length - 1]
            currentIndex = (mediaCaroussel.length - 1) * 1
            const previousMediumType = previousMedium.mediaContent.split('.')[1]

            lightboxDescViaSlider() //~ Adding description

            if (currentMediumType === previousMediumType) {

                let mediumDisplay = document.querySelector('.mb-medium')
                let mediumDisplayTitle = document.querySelector('.medium--title')
                mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
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
                    lightboxDescViaSlider() //~ Adding description
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
                    lightboxDescViaSlider() //~ Adding description
                    center.appendChild(previousMediaTitle)
        
                }
            }

        } else {

            const currentMedium = mediaCaroussel[currentIndex];
            const currentMediumType = currentMedium.mediaContent.split('.')[1]

            //const previousIndex = currentIndex -= 1
            const previousIndex = 1 * currentIndex - 1
            currentIndex -= 1

            previousMedium = mediaCaroussel[previousIndex]
            const previousMediumType = previousMedium.mediaContent.split('.')[1]

            //todo : compare types of current & previous media
            if (currentMediumType === previousMediumType) {
                
                let mediumDisplay = document.querySelector('.mb-medium')
                let mediumDisplayTitle = document.querySelector('.medium--title')
                mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${previousMedium.mediaContent}`)
                mediumDisplayTitle.textContent = `${previousMedium.mediaTitle}`;

                lightboxDescViaSlider() //~ Adding description

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
                    lightboxDescViaSlider() //~ Adding description
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
                    lightboxDescViaSlider() //~ Adding description
                    center.appendChild(previousMediaTitle)
        
                }
            }



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
        } // will maybe be remove to restore the other below
    
        //* Handling sliding in normal order
        //todo : compare types of current & next media
        if (currentMediumType === nextMediumType) {
            
            let mediumDisplay = document.querySelector('.mb-medium')
            let mediumDisplayTitle = document.querySelector('.medium--title')
            mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
            mediumDisplay.setAttribute('index', `${nextIndex}`) //& adding index again when medium is removed & recreated
            mediumDisplayTitle.textContent = `${nextMedium.mediaTitle}`;
    
            lightboxDescViaSlider() //~ Adding description
    
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
                lightboxDescViaSlider() //~ Adding description
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
                lightboxDescViaSlider() //~ Adding description
                center.appendChild(nextMediaTitle)
    
            }
        //~ Reset of the currentIndex so the slider is not blocked after resetting
        if (currentIndex === carousselLimit) {
            currentIndex = 0
        }
    /*}*/
    

    }

        //currentIndex = "";

    })
    rightSide.appendChild(close)
    rightSide.appendChild(rightArrow)

    mediaBox.appendChild(leftSide)
    mediaBox.appendChild(center)
    mediaBox.appendChild(rightSide)

    lightboxDescription(event)
    accessibleLightbox()
}

function setLightboxFeature() {
    const mediaSection = document.querySelector('.media')
    const media = mediaSection.querySelectorAll('.media--content')
    for(const medium of media) {
        medium.addEventListener("click", openFocus)
        medium.addEventListener("keydown", (event) => { //& accessibility
            if (event.key === "Enter") {
                openFocus(event.srcElement) //! VS Code says src element is deprecated but I had to change a lot of code because "currentTarget" no longer allows me to execute the function properly.
            }
        })
    
    }   
}

//setLightboxFeature() //~ commented because the page needs to be loaded first before this function executes itself
window.addEventListener("load", setLightboxFeature) //? This function is set on load so that it launches only after the page is loaded, else it cannot find the elements to add events listeners to