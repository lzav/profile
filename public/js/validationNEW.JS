const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

(function addEventListenersToTextInputs() {
  const textInputs = document.querySelectorAll(".form-control");

  for (let textInput of textInputs) {

    // add to inputs except email
    if (textInput.id != "email") {
      textInput.addEventListener("focusout", (e) => {
        removeMessages(textInput);

        if (isBlank(textInput)) {
          // add warning message and change class
          warningMessage(textInput, "Please fill in this field.");
        } else {
          successMessage(textInput);
        }
      });
    }

    // add event listener to email


    // add clear to all

    textInput.addEventListener("input", (e) => {
      removeMessages(textInput);
    });
  }
})();

// const inputName = document.getElementById('name');

// inputName.addEventListener('focusout', (e) => {

//     removeMessages(inputName);

//     if (isBlank(inputName)) {
//         // add warning message and change class
//         warningMessage(inputName, 'Please fill in this field.');
//     } else {
//         successMessage(inputName);
//     }
// });

// inputName.addEventListener('input', (e) => {
//     removeMessages(inputName);
// });

function isBlank(inputTarget) {
  return !inputTarget.value ? true : false;
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
