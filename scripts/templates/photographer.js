function loadUserProfile (event) {
    let photographerId = event.currentTarget.id
    console.log("id : ", photographerId)
    localStorage.setItem("id", photographerId)

    window.location.replace("photographer.html")
}

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;


    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        //& creating what goes inside of article
        //* creating image wrapper for the profile picture (imgWrapper)
        const imgWrapper = document.createElement('div')
        imgWrapper.classList.add('profilepic--wrapper')

        //? creating vignette
        const vignette = document.createElement('a')
        //vignette.setAttribute("href", "photographer.html") //! only with <a href=""> instead of "onclick"
        vignette.setAttribute("id", id)
        vignette.setAttribute("onclick", "loadUserProfile(event)")
        vignette.classList.add('vignette');
        //* creating name of the photographer
        const h2 = document.createElement( 'h2' );
        h2.classList.add('home--photographer-name')
        h2.textContent = name;
        //* adding image slot then name in proper order according to html structure
        article.appendChild(vignette);
        vignette.appendChild(imgWrapper);
        vignette.appendChild(h2);


        //& creating what goes inside imgWrapper
        //* creating the  background profile picture (profilepic pp--bg), the background cover (profilepic--bgcover), & the wrapper circle (imgWrapper wrapper--circle)
        //^ pp--bg
        /*const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.classList.add('profilepic')
        img.classList.add('pp--bg')*/

        //^ profilepic--bgcover
        const bgCover = document.createElement( 'div' );
        bgCover.classList.add('profilepic--bgcover')

        //^ circle
        const circleWrapper = document.createElement( 'div' );
        circleWrapper.classList.add('wrapper--circle')

        //imgWrapper.appendChild(img);
        imgWrapper.appendChild(bgCover);
        imgWrapper.appendChild(circleWrapper);

        //& creating what goes inside circleWrapper (the second layer of the profile picture (profilepic pp-top))
        //^ pp-top
        const imgTop = document.createElement( 'img' );
        imgTop.setAttribute("src", picture)
        imgTop.classList.add('profilepic')
        imgTop.classList.add('pp--top')

        circleWrapper.appendChild(imgTop);

        //? creating the details section
        const detailsSection = document.createElement('section')
        detailsSection.classList.add('details')
        article.appendChild(detailsSection)
        //& creating what goes in the details section
        const h3 = document.createElement('h3')
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement('p')
        p.textContent = tagline;
        const span = document.createElement('span')
        span.textContent = `${price}€/jour`
        //* adding detail elements
        detailsSection.appendChild(h3)
        detailsSection.appendChild(p)
        detailsSection.appendChild(span)


        return (article);
    }
    return { name, picture, getUserCardDOM }
}