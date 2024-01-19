//TODO : HANDLE ALT DESCRIPTIONS OF PICTURES
//* Adds descriptions on all pictures & videos showcased on a profile
async function allDescriptions(){
    let photographerId = localStorage.id * 1; // getting photographer id to find corresponding media descriptions after

    const descriptionsData = await fetch('../../../data/descriptions.json') // getting all descriptions from the data file
    const result = await descriptionsData.json()
    const descriptions = result.descriptions

    //const pageDescriptions = [] // creating an array to store the descriptions for the media 
    const pageDescriptions = descriptions.filter(element => element.photographerId === photographerId) // creating an array to store the descriptions for the media 
    /*for (let index = 0; index < mediaCaroussel.length; index++) {
        const description = result.find(element => element.id === photographerId);
        pageDescriptions.push(description)
    }*/
    //let mediaCaroussel = localStorage.mediaCaroussel;

    let allMedia = document.querySelectorAll('.media--content')
    for (let index = 0; index < allMedia.length; index++) {
        //const element = array[index];
        allMedia[index].setAttribute('alt', `${pageDescriptions[index].text}`)
    }
}

//* Adds a description for the medium opened in the lightbox
function lightboxDescription() {
    console.log('Description pour la lightbox')
}

window.addEventListener("load", allDescriptions)