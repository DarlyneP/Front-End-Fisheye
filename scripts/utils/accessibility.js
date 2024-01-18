// todo : slider navigation with keyboard
function accessibleLightbox () {
    const lightbox = document.querySelector('.mediabox')
    if (lightbox) { //? checking lightbox exists before assigning events on left & right arrows that are in it
        /*const leftArrow = document.querySelector('.leftarrow')
        const rightArrow = document.querySelector('.rightarrow')*/
        window.addEventListener("keydown", (event) => {
            console.log(event);
            if (lightbox) { //? checking if lightbox exists so that event only activates when lightbox is on
                if (event.key === "ArrowLeft") {
                    previousMediumSlide()
                } 
            }
        })
        window.addEventListener("keydown", (event) => {
            console.log(event);
            if (lightbox) {
                if (event.key === "ArrowRight") {
                    nextMediumSlide()
                }  
            }
        })
    }
}

function previousMediumSlide() {
    
    let mediaBox = document.querySelector('.mediabox')
    let currentIndex = mediaBox.querySelector('.mb-medium').attributes.index.value
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
                const previousMediaTitle = document.createElement('p')
                previousMediaTitle.classList.add('medium--title')
                previousMediaTitle.setAttribute('index', `${mediaCaroussel.length - 1}`) //& adding index again when medium is removed & recreated
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
                const previousMediaTitle = document.createElement('p')
                previousMediaTitle.classList.add('medium--title')
                previousMediaTitle.setAttribute('index', `${mediaCaroussel.length - 1}`) //& adding index again when medium is removed & recreated
                previousMediaTitle.textContent = `${previousMedium.mediaTitle}`
                
                center.appendChild(insertPreviousMedia)
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
                const previousMediaTitle = document.createElement('p')
                previousMediaTitle.classList.add('medium--title')
                previousMediaTitle.setAttribute('index', `${previousIndex}`) //& adding index again when medium is removed & recreated
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
                const previousMediaTitle = document.createElement('p')
                previousMediaTitle.classList.add('medium--title')
                previousMediaTitle.setAttribute('index', `${previousIndex}`) //& adding index again when medium is removed & recreated
                previousMediaTitle.textContent = `${previousMedium.mediaTitle}`
                
                center.appendChild(insertPreviousMedia)
                center.appendChild(previousMediaTitle)
    
            }
        }


    }


}

function nextMediumSlide() {

    let mediaCaroussel = JSON.parse(localStorage.mediaCaroussel)
    let carousselLenghtComparator = mediaCaroussel.length - 1
    let center = document.querySelector('.media-display')
    let currentIndex = document.querySelector('.mb-medium').attributes.index.value
    const currentMedium = mediaCaroussel[currentIndex];
    const currentMediumType = currentMedium.mediaContent.split('.')[1]

    //const nextIndex = currentIndex += 1
    const nextIndex = 1 * currentIndex + 1
    currentIndex += 1

    let nextMedium = mediaCaroussel[nextIndex]
    const nextMediumType = nextMedium.mediaContent.split('.')[1]

    //* Handling going from last medium back to first medium
    if (currentIndex === carousselLenghtComparator) {
        
        //todo : compare types of current & next media
        if (currentMediumType === nextMediumType) {

            let resetIndex = 0; //& going back to the start of the slider so 0
            nextMedium = mediaCaroussel[resetIndex]
            
            let mediumDisplay = document.querySelector('.mb-medium')
            let mediumDisplayTitle = document.querySelector('.medium--title')
            mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
            mediumDisplayTitle.textContent = `${nextMedium.mediaTitle}`;

        } else if (currentMediumType !== nextMediumType) {
            //todo if curr is jpg
            if (currentMediumType === "jpg") {

                const mediumToRemove = document.querySelector('.mb-medium')
                const titleToRemove = document.querySelector('.medium--title')
                center.removeChild(mediumToRemove)
                center.removeChild(titleToRemove)

                let resetIndex = 0; //& going back to the start of the slider so 0
                nextMedium = mediaCaroussel[resetIndex]

                const insertNextMedia = document.createElement('video')
                insertNextMedia.setAttribute('controls', 'controls');
                insertNextMedia.classList.add('mb-medium')
                insertNextMedia.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
                const nextMediaTitle = document.createElement('p')
                nextMediaTitle.classList.add('medium--title')
                nextMediaTitle.setAttribute('index', `${nextIndex}`) //& adding index again when medium is removed & recreated
                nextMediaTitle.textContent = `${nextMedium.mediaTitle}`

                center.appendChild(insertNextMedia)
                center.appendChild(nextMediaTitle)

            }  else if (currentMediumType === "mp4") { //todo if curr is mp4

                const mediumToRemove = document.querySelector('.mb-medium')
                const titleToRemove = document.querySelector('.medium--title')
                center.removeChild(mediumToRemove)
                center.removeChild(titleToRemove)

                let resetIndex = 0; //& going back to the start of the slider so 0
                nextMedium = mediaCaroussel[resetIndex]

                const insertNextMedia = document.createElement('img')
                insertNextMedia.classList.add('mb-medium')
                insertNextMedia.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
                const nextMediaTitle = document.createElement('p')
                nextMediaTitle.classList.add('medium--title')
                nextMediaTitle.setAttribute('index', `${nextIndex}`) //& adding index again when medium is removed & recreated
                nextMediaTitle.textContent = `${nextMedium.mediaTitle}`

                center.appendChild(insertNextMedia)
                center.appendChild(nextMediaTitle)

            }
        }

        return
    }

    //* Handling sliding in normal order
    //todo : compare types of current & next media
    if (currentMediumType === nextMediumType) {
        
        let mediumDisplay = document.querySelector('.mb-medium')
        let mediumDisplayTitle = document.querySelector('.medium--title')
        mediumDisplay.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
        mediumDisplayTitle.textContent = `${nextMedium.mediaTitle}`;

    } else if (currentMediumType !== nextMediumType) {
        //todo if curr is jpg
        if (currentMediumType === "jpg") {

            center.removeChild(medium)
            center.removeChild(title)
            const insertNextMedia = document.createElement('video')
            insertNextMedia.setAttribute('controls', 'controls');
            insertNextMedia.classList.add('mb-medium')
            insertNextMedia.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
            const nextMediaTitle = document.createElement('p')
            nextMediaTitle.classList.add('medium--title')
            previousMediaTitle.setAttribute('index', `${nextIndex}`) //& adding index again when medium is removed & recreated
            nextMediaTitle.textContent = `${nextMedium.mediaTitle}`

            center.appendChild(insertNextMedia)
            center.appendChild(nextMediaTitle)

        }  else if (currentMediumType === "mp4") { //todo if curr is mp4

            center.removeChild(medium)
            center.removeChild(title)
            const insertNextMedia = document.createElement('img')
            insertNextMedia.classList.add('mb-medium')
            insertNextMedia.setAttribute('src', `Sample Photos/${photographer}/${nextMedium.mediaContent}`)
            const nextMediaTitle = document.createElement('p')
            nextMediaTitle.classList.add('medium--title')
            previousMediaTitle.setAttribute('index', `${nextIndex}`) //& adding index again when medium is removed & recreated
            nextMediaTitle.textContent = `${nextMedium.mediaTitle}`

            center.appendChild(insertNextMedia)
            center.appendChild(nextMediaTitle)

        }
    }

}

export { accessibleLightbox };