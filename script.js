function scrollFunction1() {
  let e = document.getElementById("aboutus");
  e.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
    inline: 'start'
  });
}
function scrollFunction2() {
  let e = document.getElementById("endContact");
  e.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
    inline: 'end'
  });
}

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
fetch("https://api.weather.gov/gridpoints/OUN/89,78/forecast")
.then(response => response.json())
.then(data => {
    // Get the forecast elements from the API response
    const forecast = data.properties.periods;

    // Create a container for the forecast
    const forecastContainer = document.createElement("div");
    forecastContainer.classList.add("forecast");

    // Iterate over the forecast elements
    forecast.forEach(day => {
        if (forecast.indexOf(day)<=4) { 
          // Create a div for each day
          const dayContainer = document.createElement("div");
          dayContainer.classList.add("day");

          // Add the date to the div
          const date = document.createElement("p");
          date.innerHTML = day.name;
          dayContainer.appendChild(date);

          // Add the temperature to the div
          const temperature = document.createElement("p");
          temperature.innerHTML = `${day.temperature}°F,  ${day.shortForecast}`;
          dayContainer.appendChild(temperature);

          // Add the day container to the forecast container
          forecastContainer.appendChild(dayContainer);
        }
    });

    // Add the forecast container to the HTML
    const weather = document.getElementById("weather");
    weather.appendChild(forecastContainer);
});

