//TODO : HANDLE ALT DESCRIPTIONS OF PICTURES
//* Adds descriptions on all pictures & videos showcased on a profile
async function allDescriptions(){
    let photographerId = localStorage.id * 1; //~ getting photographer id to find corresponding media descriptions after

    const descriptionsData = await fetch('../../../data/descriptions.json') //~ getting all descriptions from the data file
    const result = await descriptionsData.json()
    const descriptions = result.descriptions

    const pageDescriptions = descriptions.filter(element => element.photographerId === photographerId) //~ creating an array to store the descriptions for the media 

    let allMedia = document.querySelectorAll('.media--content')
    for (let index = 0; index < allMedia.length; index++) {
        
        allMedia[index].setAttribute('alt', `${pageDescriptions[index].text}`)
    }
}

//* Adds a description for the medium opened in the lightbox
async function lightboxDescription(event) {
    console.log('Description pour la lightbox')
    const lightbox = document.querySelector('.mediabox')
    if (lightbox) {
    
        const descriptionsData = await fetch('../../../data/descriptions.json') //~ getting all descriptions from the data file
        const result = await descriptionsData.json()
        const descriptions = result.descriptions
        const mediaCaroussel = JSON.parse(localStorage.mediaCaroussel)
        const targetIndex = event.srcElement.attributes.index.value * 1 //todo : add index to pictures on page first
        const targetMedia = mediaCaroussel[targetIndex]
        const description = descriptions.find(element => element.id === targetMedia.mediaId)

        const medium = document.querySelector('.mb-medium')
        medium.setAttribute('alt', `${description.text}`)
    }
}

//* Adds a description for the medium opened in the lightbox when opened through the slider
async function lightboxDescViaSlider() {
    console.log('Description pour la lightbox')
    const lightbox = document.querySelector('.mediabox')
    if (lightbox) {
        const medium = lightbox.querySelector('.mb-medium')
    
        const descriptionsData = await fetch('../../../data/descriptions.json') //~ getting all descriptions from the data file
        const result = await descriptionsData.json()
        const descriptions = result.descriptions
        const mediaCaroussel = JSON.parse(localStorage.mediaCaroussel)
        const targetIndex = medium.attributes.index.value * 1 //todo : add index to pictures on page first
        const targetMedia = mediaCaroussel[targetIndex]
        const description = descriptions.find(element => element.id === targetMedia.mediaId)

        medium.setAttribute('alt', `${description.text}`)
    }
}

window.addEventListener("load", allDescriptions);

export { lightboxDescription, lightboxDescViaSlider };
//module.exports = { lightboxDescription, lightboxDescViaSlider };