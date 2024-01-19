/*function displayModal() {
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
    const validateBtn = document.querySelector('.contact_button_send')
    validateBtn.addEventListener("click", validateContactForm)
}*/

function displayModal() {
    const contactModalBg = document.querySelector('#contact_modal')

    //~ Applying necessary styles for the box to move on top of the screen & be visible
    contactModalBg.style.display = "flex"
    contactModalBg.style.backgroundColor = "white"
    contactModalBg.style.position = "fixed"
    contactModalBg.style.top = "0" 

    //~ Adding name of photographer to contact
    const modal = document.getElementById("contact_modal");
    const name = modal.getElementsByClassName('name')[0]
    const photographerName = document.querySelector('.profile--name').textContent
    name.textContent = `${photographerName}`;
    const validateBtn = document.querySelector('.contact_button_send')
    //validateBtn.addEventListener("click", validateContactForm)
    validateBtn.addEventListener("submit", validateContactForm)


}

function closeModal() {
    const contactModalBg = document.querySelector('#contact_modal')

    //~ Removing styles so the contact window can be closed
    contactModalBg.style.display = "none"
    contactModalBg.style.backgroundColor = "transparent"
    contactModalBg.style.position = "unset"
    contactModalBg.style.top = "0" 

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

function validateContactForm (event) {
    //event.preventDefault()
    console.log(event);
    event.target.preventDefault()
    const contactForm = document.querySelector('.modal form div')
    const inputs = contactForm.querySelectorAll('input')
    const message = contactForm.querySelector('#message')
    console.log(inputs)
    console.log(inputs[0].value)
    //? is checking validity of inputs mandatory fot this stage of developpment?
    const mail = new ContactForm(inputs[0].value, inputs[1].value, inputs[2].value, message.value)
    console.log(mail)
    closeModal()
}
