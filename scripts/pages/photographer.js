//Mettre le code JavaScript lié à la page photographer.html
const photographers = fetch("../../data/photographers.json")
function getPhotographer() {
    let photographerId = localStorage.id
    const photographer = photographers.find( id => id = photographerId )
    console.log(photographer);
}

getPhotographer()