function setTopMargin() {
  $("body").css("margin-top", $("#mainNav").outerHeight(true));
}

$(document).ready(setTopMargin());

$(window).resize(setTopMargin());

// scroll to about without nav hiding title
if (document.getElementById("about")) {
  const aboutLink = document.querySelector("a[href='/#about']");

  aboutLink.addEventListener("click", (e) => {
    e.preventDefault();

    const aboutTarget = document.getElementById("about");
    const navHeight = $("#mainNav").outerHeight();

    const { x, y } = aboutTarget.getBoundingClientRect();

    window.scrollTo(x, y - navHeight);
  });
}
