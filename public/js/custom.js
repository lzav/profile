
// function checkNavDisplay(){
//     const navBar = document.querySelector('#navLinks');

//     const navStyle = window.getComputedStyle(navBar);

//     // return navStyle.display;
//     // console.log(navStyle.display);
//     // console.log(navStyle.display);

//     if(navStyle.display === 'none') {
//         console.log('It is stacking');
//     } else {
//         console.log('It is NOT stacking');
//     }

//     console.log(navStyle.height);
// }

// function go(){
//     console.log('triggered');
// }

// window.addEventListener('resize', checkNavDisplay);

// function showDisplay()


// console.log(checkNavDisplay());

// Check nav not hidden. If not, set padding appropriate, so main content not covered

// get total height of navigation
// console.log($("#mainNav").outerHeight(true));

// $(window).resize(function() {
//     $("#mainContent").css("margin-top", $("#mainNav").outerHeight(true));
// });

function setTopMargin() {
    $("#mainContent").css("margin-top", $("#mainNav").outerHeight(true));
}

$(document).ready( setTopMargin() );

$(window).resize( setTopMargin() );