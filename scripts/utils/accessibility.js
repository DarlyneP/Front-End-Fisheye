// todo : slider navigation with keyboard
function accessibleLightbox () {
    const lightbox = document.querySelector('.mediabox')
    if (lightbox) {
        const leftArrow = document.querySelector('.leftarrow')
        const rightArrow = document.querySelector('.rightarrow')
        leftArrow.addEventListener("keydown", (event) => {
            console.log(event);
            if (event.key === "ArrowLeft") {
                previousMediumSlide()
            }
        })
        rightArrow.addEventListener("keydown", (event) => {
            console.log(event);
            if (event.key === "ArrowRight") {
                nextMediumSlide()
            }
        })
    }
}

function previousMediumSlide() {
    
    let currentIndex = document.querySelector('.mb-medium').attributes.index.value
    let mediaCaroussel = JSON.parse(localStorage.mediaCaroussel)
    let previousMedium;
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
                previousMediaTitle.textContent = `${previousMedium.mediaTitle}`
                
                center.appendChild(insertPreviousMedia)
                center.appendChild(previousMediaTitle)
    
            }
        }


    }


}

function nextMediumSlide() {

    let currentIndex = document.querySelector('.mb-medium').attributes.index.value
    let mediaCaroussel = JSON.parse(localStorage.mediaCaroussel)
    const currentMedium = mediaCaroussel[currentIndex];
    const currentMediumType = currentMedium.mediaContent.split('.')[1]

    //const nextIndex = currentIndex += 1
    const nextIndex = 1 * currentIndex + 1
    currentIndex += 1

    const nextMedium = mediaCaroussel[nextIndex]
    const nextMediumType = nextMedium.mediaContent.split('.')[1]

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
            nextMediaTitle.textContent = `${nextMedium.mediaTitle}`

            center.appendChild(insertNextMedia)
            center.appendChild(nextMediaTitle)

        }
    }

}

export { accessibleLightbox };