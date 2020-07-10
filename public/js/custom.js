function setTopMargin() {
  $("body").css("margin-top", $("#mainNav").outerHeight(true));
}

$(document).ready(setTopMargin());

$(window).resize(setTopMargin());



const aboutLink = document.querySelector("a[href='/#about']");

if (aboutLink) {
  aboutLink.addEventListener("click", (e) => {
    e.preventDefault();

    const aboutTarget = document.getElementById("about");
    const navHeight = $("#mainNav").outerHeight();

    const { x, y } = aboutTarget.getBoundingClientRect();

    window.scrollTo(x, y - navHeight);
  });
}
