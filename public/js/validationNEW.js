
// CONTACT FORM VALIDATION
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const textInputs = document.querySelectorAll(".form-control");
    let containsErrors = false;

    for (let textInput of textInputs) {
      containsErrors = checkInputs(textInput) || containsErrors;
    }

    if (containsErrors) e.preventDefault();
  });
}
// EOF CONTACTFORM VALIDATION

// BLOG VALIDATION

const newBlog = document.querySelector('form');

if (newBlog) {
  newBlog.addEventListener('submit', (e) => {

    const textInputs = document.querySelectorAll(".form-control");
    let containsErrors = false;

    for (let textInput of textInputs) {
      containsErrors = checkInputs(textInput) || containsErrors;
    }

    if (containsErrors) e.preventDefault();

  });
}
// EOF BLOG VALIDATION


(function addEventListenersToInputs() {
  const textInputs = document.querySelectorAll(".form-control");

  for (let textInput of textInputs) {
    textInput.addEventListener("focusout", (e) => {
      checkInputs(textInput);
    });

    // add clear to all
    textInput.addEventListener("input", (e) => {
      removeMessages(textInput);
    });
  }
})();

function checkInputs(textInput) {
  removeMessages(textInput);

  if (textInput.id != "contactEmail" && textInput.id !="login" && isBlank(textInput)) {
    warningMessage(textInput, "Please fill in this field.");
    // containsErrors will be return value or false
    return true;
  }

  if (textInput.id == "contactEmail" && !validateEmail(textInput.value)) {
    warningMessage(textInput, "Please check your email address.");
    return true;
  }

  if (textInput.id == "login" && !validateEmail(textInput.value)) {
    warningMessage(textInput, "Please check your email address.");
    return true;
  }

  successMessage(textInput);
}

function isBlank(inputTarget) {
  return !inputTarget.value ? true : false;
}

function validateEmail(email) {
  const patt = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const result = patt.test(email);
  return result;
}

function removeMessages(inputTarget) {
  inputTarget.classList.remove("is-invalid", "is-valid");

  const nextThing = inputTarget.nextElementSibling;

  if (nextThing && nextThing.classList.contains("invalid-feedback")) {
    nextThing.remove();
  }
}


function warningMessage(inputTarget, message) {
  const feedbackBox = document.createElement("div");
  feedbackBox.className = "invalid-feedback d-block";
  feedbackText = document.createTextNode(message);
  feedbackBox.appendChild(feedbackText);
  inputTarget.insertAdjacentElement("afterend", feedbackBox);

  inputTarget.classList.add("is-invalid");
}

function successMessage(inputTarget) {
  inputTarget.classList.add("is-valid");
}