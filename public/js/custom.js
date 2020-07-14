// set top margin fix
function setTopMargin() {
  $("body").css("margin-top", $("#mainNav").outerHeight(true));
}

$(document).ready(setTopMargin());

$(window).resize(setTopMargin());


// scroll to about without nav hiding title
if (document.getElementById("about")) {
  const aboutLink = document.querySelector("a[href='/#about']");

  aboutLink.addEventListener("click", scrollToAbout);
}

function scrollToAbout(e) {
  if (e) {
    e.preventDefault();
  }

  const aboutTarget = document.getElementById("about");
  const navHeight = document.getElementById("mainNav").clientHeight;

  let { x, y } = aboutTarget.getBoundingClientRect();
  x += window.scrollX;
  y += window.scrollY;

  window.scroll(x, y - navHeight);
}

// if about link clicked from pages other than home
window.onload = () => {
  if (location.hash && location.hash === '#about') {
    location.hash = "";
    scrollToAbout();
  }
}



