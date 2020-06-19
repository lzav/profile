// CONTACT FORM VALIDATION

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // remove old warnings
  const oldWarnings = document.querySelectorAll(".invalid-feedback");
  const inputWarnings = document.querySelectorAll(".is-invalid");
  removeOldWarnings(oldWarnings, inputWarnings);

  // Check input boxes contain a value. If not, add feedback and set boolean warning to true
  const warnings = notBlank();

  // email validation and warning message
  const email = document.getElementById("email");

  // if email blank, leave current message and exit
  if (!email.value && warnings) return;

  if (!validateEmail(email.value)) {
    addFeedbackBox(email, "Please enter a valid email address.");
    return;
  }

  if (warnings) return;

  e.target.submit();
});


// EOF CONTACT FORM SUBMIT


// INPUT CHANGE
const inputBoxes = document.querySelectorAll(".form-control");

for (let inputBox of inputBoxes) {
  inputBox.addEventListener('input', (e) => {
    let inputWarnings = [e.target]
    let oldWarnings = []

    const nextSibling = e.target.nextSiblingElement;

    if (nextSibling.classList.contains('is-invalid')) {
      oldWarnings.push(nextSibling);
    }
    
    removeOldWarnings(oldWarnings, inputWarnings);
  })
}
//EOF INPUT CHANGE


function removeOldWarnings(oldWarnings, inputWarnings) {
  if (oldWarnings) {
    for (let oldWarning of oldWarnings) {
      oldWarning.remove();
    }
  }

  if(inputWarnings) {
    for (let inputWarning of inputWarnings) {
      inputWarning.classList.remove('is-invalid');
    }
  }

}

function notBlank() {
  const inputBoxes = document.querySelectorAll(".form-control");
  let warnings = false;

  for (let e of inputBoxes) {
    if (!e.value) {
      addFeedbackBox(e, "Please complete this field.");
      warnings = true;
    }
  }

  return warnings;
}

function addFeedbackBox(e, message) {
  const warnIt = document.createElement("div");
  warnIt.appendChild(document.createTextNode(message));
  warnIt.className = "invalid-feedback d-block";
  e.insertAdjacentElement("afterend", warnIt);

  e.classList.add('is-invalid');
}

function validateEmail(email) {
  const patt = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const result = patt.test(email);
  return result;
}
