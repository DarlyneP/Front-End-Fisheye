function displayModal() {
    const contactModalBg = document.createElement('div')
    contactModalBg.classList.add('contact-modalbg')
    const modal = document.getElementById("contact_modal");
    contactModalBg.appendChild(modal)
    document.querySelector('body').appendChild(contactModalBg)
	// modal.style.display = "block";
	modal.style.display = "flex";

    const name = modal.getElementsByClassName('name')[0]
    const photographerName = document.querySelector('.profile--name').textContent
    // name.textContent = `${localStorage.photographer.name}`;
    name.textContent = `${photographerName}`;
}

function closeModal() {
    const contactModalBg = document.querySelector('.contact-modalbg')
    contactModalBg.classList.add('contact-modalbg')
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    contactModalBg.remove(contactModalBg.innerHTML)
}

//* Validate Contact form
class ContactForm {
    constructor(firstname, lastname, email, message) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.message = message
    }

    sendMail() {
        // window.open('mailto:test@example.com?subject=subject&body=body');
    }
}
const validateBtn = document.querySelector('.contact_button')
function validateContactForm (event) {
    event.preventDefault()
    const contactForm = document.querySelector('.modal form div')
    const inputs = contactForm.querySelectorAll('input')
    const message = contactForm.querySelector('#message')
    console.log(inputs)
    console.log(inputs[0].value)
    //? is checking validity of inputs mandatory fot this stage of developpment?
    const mail = new ContactForm(inputs[0].value, inputs[1].value, inputs[2].value, message.value)
    console.log(mail)
}

validateBtn.addEventListener("click", validateContactForm)