apiKey = 6eee33918b42ca96a6dbde84a0ecef24;

var searchSection = document.getElementById("searchSection");
var currentWeather = document.getElementById("currentWeather");
var fiveDay = document.getElementById("fiveDay");


  var title = document.createElement("h2").innerHTML = ("Search for a City");
  searchSection.append(title);

  var form = document.createElement("form");
  var cityInput = document.createElement("input");
  cityInput.setAttribute("type", "text");
  cityInput.setAttribute("placeholder", "Enter a city");
  var citySearchBtn = document.createElement("input");
  citySearchBtn.setAttribute("type", "button");
  citySearchBtn.setAttribute("value", "Search");
  form.append(cityInput);
  form.append(citySearchBtn);
  searchSection.append(form)
