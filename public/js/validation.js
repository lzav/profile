// Contact form data-validation

const contactForm = document.getElementById('contact-form');

console.log(contactForm);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');


    if (!name.value || !email.value || !message.value) {
        console.log('Please fill in this field');        
    }

});




// SOF CONTACT FORM VALIDATION

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // remove old warning
  const oldWarnings = document.querySelectorAll(".warning-class");

  if (oldWarnings) {
    for (let e of oldWarnings) {
      e.remove();
    }
  }

  // check input boxes have a value
  const inputBoxes = document.querySelectorAll(".form-control");
 
  for (let e of inputBoxes) {
    if (!e.value) { 
      addFeedbackBox(e, "Please complete this field."); 
     }
  }

  // validate email
  const email = document.getElementById("email");

  // if email is blank, leave current message and exit
  if (!email.value) { return; }

  // email validation and warning message
  if (!validateEmail(email.value)) {
    addFeedbackBox(email, "Please enter a valid email address.");
    return;
  }
  
});

// EOF CONTACT FORM SUBMIT


function addFeedbackBox(e, message) {
  const warnIt = document.createElement("div");
  warnIt.appendChild(document.createTextNode(message));
  warnIt.className = "invalid-feedback";

  e.insertAdjacentElement("afterend", warnIt);
}

function validateEmail(email) {
  const patt = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const result = patt.test(email);
  return result;
}