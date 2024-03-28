import { fillPage } from "../pages/photographer.js";
import { setLightboxFeature } from "./lightbox.js";
//* Create custom option box
const select = document.querySelector('.select');
// const select = document.querySelector('select');
//const select = document.querySelector('selectmenu');
function showCustomBox (event) {
        
        // Todo : prevent default display
        const target = event.currentTarget;
        console.log(target);
        console.log(event);
        event.preventDefault();
        console.log('control')
    
        // Todo : create custion display
        const customOptionBox = document.createElement('div');
        customOptionBox.classList.add('custom-optionbox');
        customOptionBox.setAttribute('aria-multiselectable', 'true') //& acessibility : informing user this is an element with multiple choices
        customOptionBox.setAttribute('role', 'listbox') //& acessibility : informing user this is an element with multiple choices
        customOptionBox.setAttribute('aria-activedescendant', 'listbox') //& acessibility : informing user this is an element with multiple choices
        let rect = select.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        /*const boxHeight = select.offsetHeight
        const boxPosition = select.offsetWidth*/
        const boxHeight = rect.top
        const boxPosition = rect.left
        const boxHeightCorrection = select.offsetHeight
        console.log(boxHeightCorrection)
        const boxPositionCorrection = select.offsetWidth
        console.log(boxPositionCorrection)
        console.log("box height : ", boxHeight);
        console.log("box position : ", boxPosition);
    
        const sort = document.querySelector('.sort')
        sort.appendChild(customOptionBox)

        // Todo : add options
        const optionsList = ["Popularité", "Date", "Titre"]
        for (let index = 0; index < optionsList.length; index++) {
            const cbOption = document.createElement('p');
            cbOption.classList.add('cb-option')
            cbOption.textContent = `${optionsList[index]}`;
            cbOption.setAttribute('name', optionsList[index])
            cbOption.setAttribute('tabindex', "0")
            cbOption.addEventListener("click", sortMedia)
            cbOption.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    sortMedia(event.currentTarget)
                }
            })
            customOptionBox.appendChild(cbOption)
        }

        // Todo : add arrow in custom box
        const span = document.createElement('span')
        const reduce = document.createElement('img')
        reduce.setAttribute('src', '../../assets/icons/reduce.svg')
        span.appendChild(reduce)
        customOptionBox.appendChild(span)

        // Todo : fix position of custombox
        customOptionBox.clientX = boxPosition
        customOptionBox.clientY = boxHeight
        customOptionBox.style.marginTop = `-${boxHeightCorrection}px`;
        customOptionBox.style.marginLeft = `${boxPositionCorrection - select.style.marginLeft - 23}px`;

        select.setAttribute('aria-expanded', 'true') //& accessibility
        /*customOptionBox.clientX = boxPosition + boxPositionCorrection
        customOptionBox.clientY = boxHeight - boxHeightCorrection*/

}

select.addEventListener("mousedown", showCustomBox)
select.addEventListener("keydown", (event) => {
    if (event.key === /*"ArrowDown"*/ "Enter") {
       showCustomBox(event)
    }
}) //! accessibility : opening sorting box

function sortMedia(event) {
    closeCustomOptionBox()
    select.setAttribute('aria-expanded', 'false') //& accessibility
    let sortMethod = "";
    if (event.currentTarget) {
        sortMethod = event.currentTarget.attributes.name.value //& click event
    } else {
        sortMethod = event.textContent //& with keydown event, "currentTarget" does not exist, only event exists.
    }
    console.log('clicked')
    //console.log(event.currentTarget.attributes.name); // prints ' name="value" '
    //console.log(event.currentTarget.attributes.name.value); // prints 'value'
    //console.log(event.currentTarget.attributes);
    console.log('sortMethod : ', sortMethod);

    sortMethod === "Popularité"? console.log('yes') : console.log('no');

    switch (sortMethod) {
        case "Popularité":
            console.log('sortMethod : ', sortMethod);
            //document.querySelector('select')[0].outerHTML = "";
            // document.querySelector('select').options[0].innerText = `${sortMethod}`;
            // document.querySelector('.select').innerText = `${sortMethod}`; //& this removes the arrow so innerText will be used instead
            document.querySelector('.select').innerHTML = `${sortMethod} <span><img src=\"assets/icons/reduce.svg\" alt=\"\"></span>`;
            sortingCall(sortMethod)
            break;
        case "Date":
            console.log('sortMethod : ', sortMethod);
            //document.querySelector('select')[0].outerHTML = "";
            // document.querySelector('select').options[0].innerText = `${sortMethod}`;
            // document.querySelector('.select').innerText = `${sortMethod}`; //& this removes the arrow so innerText will be used instead
            document.querySelector('.select').innerHTML = `${sortMethod} <span><img src=\"assets/icons/reduce.svg\" alt=\"\"></span>`;
            sortingCall(sortMethod)
            break;
        case "Titre":
            console.log('sortMethod : ', sortMethod);
            //document.querySelector('select')[0].outerHTML = "";
            // document.querySelector('select').options[0].innerText = `${sortMethod}`;
            // document.querySelector('.select').innerText = `${sortMethod}`; //& this removes the arrow so innerText will be used instead
            document.querySelector('.select').innerHTML = `${sortMethod} <span><img src=\"assets/icons/reduce.svg\" alt=\"\"></span>`;
            sortingCall(sortMethod)
            break;
        default:
            break;
    }
}

function closeCustomOptionBox() {
    const customOptionBox = document.querySelector('.custom-optionbox')
    console.log(customOptionBox);
    if (customOptionBox !== undefined) {
        document.querySelector('.sort').removeChild(customOptionBox)
    }
}

async function sortingCall(method) {
    const call = await fetch("../../data/photographers.json")
    let resultCall = await call.json()
    let photographers = resultCall.photographers
    let media = resultCall.media
    let photographerId = localStorage.id
    const photographer = photographers.find( element => element.id == photographerId )
    const photographerMedia = []
    for (const el of media) {
        if (el.photographerId == photographerId) {
            photographerMedia.push(el)
        }
    }
    switch (method) {
        case "Popularité":
            //const sortedByPopularity = photographerMedia.sort((a, b) => a.likes - b.likes) //? least to most popular
            const sortedByPopularity = photographerMedia.sort((a, b) => b.likes - a.likes)
            console.log('Media sorted by popularity : ', sortedByPopularity);
            fillMediaSorted(sortedByPopularity)
            break;
        case "Date":
            const sortedByDate = photographerMedia.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
            console.log('Media sorted by date : ', sortedByDate);
            fillMediaSorted(sortedByDate)
            break;
        case "Titre":
            const sortedByTitle = photographerMedia.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
            console.log('Media sorted by title : ', sortedByTitle);
            fillMediaSorted(sortedByTitle)
        default:
            break;
    }
}

async function fillMediaSorted(sortedMedia) {
    //const mediaSection = document.querySelector('section .media') //? null
    const mediaSection = document.querySelector('.media') 
    const allMedia = mediaSection.querySelectorAll('.media--content')
    for(const media of allMedia){
        mediaSection.removeChild(media) //* emptying media section
    }
    //const photographer = findPhotographer()
    //fillPage(findPhotographer(), sortedMedia)
    const query = await fetch("../../data/photographers.json")
    let result = await query.json()
    let photographers = result.photographers
    let photographerId = localStorage.id
    const photographer = photographers.find( element => element.id == photographerId )
    fillPage(photographer, sortedMedia)
    setLightboxFeature()
}

/*async function findPhotographer() {
    const query = await fetch("../../data/photographers.json")
    let result = await query.json()
    let photographers = result.photographers
    let photographerId = localStorage.id
    const photographer = photographers.find( element => element.id == photographerId )
    return photographer
}*/