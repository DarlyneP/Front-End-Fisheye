function displayModal() {
    const contactModalBg = document.querySelector('#contact_modal')

    //~ Applying necessary styles for the box to move on top of the screen & be visible
    contactModalBg.style.display = "flex"
    contactModalBg.style.backgroundColor = "#ffffffb0"
    contactModalBg.style.position = "fixed"
    contactModalBg.style.top = "0" 

    //~ Adding name of photographer to contact
    const modal = document.getElementById("contact_modal");
    const name = modal.getElementsByClassName('name')[0]
    const photographerName = document.querySelector('.profile--name').textContent
    name.textContent = `${photographerName}`;
    const validateBtn = contactModalBg.querySelector('.contact_button_send')
    validateBtn.addEventListener("click", validateContactForm)
    //& Accessibility
    contactModalBg.setAttribute("aria-labelledby", 'header--text')

    //~ Trying to handle preventDefault not working
    const form = contactModalBg.querySelector('form')
    form[4].formAction = ""; //! SUCCESSFULLY PREVENTS REFRESH & LETS FORM CONTENT LOAD IN THE CONSOLE.
    //validateBtn.addEventListener("submit", validateContactForm)


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
    event.preventDefault() //! Is not working for unknown reason, handled with " formAction " property in displayModal()
    console.log(event);
    //event.target.preventDefault()
    const contactForm = document.querySelector('.modal form div')
    const inputs = contactForm.querySelectorAll('input')
    const message = contactForm.querySelector('#message')
    console.log(inputs)
    console.log(inputs[0].value)
    //? is checking validity of inputs mandatory fot this stage of developpment?
    const mail = new ContactForm(inputs[0].value, inputs[1].value, inputs[2].value, message.value)
    //checkMailInputs(mail)
    const check = checkMailInputs(mail)
    console.log(check)
    if (check === true) {
        console.log(mail)
        closeModal()   
    } else if (check === false) {
        alert('Veuillez corriger le formulaire'); 
    }
}

function checkMailInputs(mail) {
    const { firstname, lastname, email, message } = mail;
    let check;
    //firstname.toLowerCase().match(/[a-z]/g) ? lastname.toLowerCase().match(/[a-z]/g) ? email.toLowerCase().match(/[a-z]/g) ? message.toLowerCase().match(/[a-z]/g) ? check = true : alert('Veuillez corriger le formulaire') : alert('Veuillez corriger le formulaire') : alert('Veuillez corriger le formulaire') : alert('Veuillez corriger le formulaire');
    firstname.toLowerCase().match(/[a-z]/g) ? lastname.toLowerCase().match(/[a-z]/g) ? email.toLowerCase().match(/[a-z]/g) ? message.toLowerCase().match(/[a-z]/g) ? check = true : check = false : check = false : check = false : check = false;
    return check
}
