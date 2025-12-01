// greeting.js
function getDynamicGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    let greeting;
  
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon!";
    } else {
      greeting = "Good evening!";
    }
  
    return greeting;
  }
  
  // Call the function and set the text content of the h1 element
  // Make sure the ID matches your HTML element!
  document.getElementById("dynamic-greeting").textContent = getDynamicGreeting();


  let slideIndex = 1;
showSlides(slideIndex);
 
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
 
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
 
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


