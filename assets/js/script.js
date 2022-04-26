apiKey = "6eee33918b42ca96a6dbde84a0ecef24";

var searchSection = document.getElementById("searchSection");
var currentWeather = document.getElementById("currentWeather");
var fiveDay = document.getElementById("fiveDay");

function searchBtn() {
  var title = document.createElement("h2").innerHTML = ("Search for a City");
  searchSection.append(title);

  var form = document.createElement("form");
  var cityInput = document.createElement("input");
  cityInput.setAttribute("type", "text");
  cityInput.setAttribute("placeholder", "Enter a city");
  cityInput.setAttribute("id", "cityInputed")
  var citySearchBtn = document.createElement("input");
  citySearchBtn.setAttribute("type", "button");
  citySearchBtn.setAttribute("value", "Search");
  citySearchBtn.onclick = apiRender;
  form.append(cityInput);
  form.append(citySearchBtn);
  searchSection.append(form);
}


  function apiRender() {
var citySelect = document.getElementById("cityInputed").value;
console.log("test", citySelect)
var cityApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + citySelect + "&appid=" + apiKey;
fetch(cityApi).then(function (info) {
  info.json().then(function (data) {
    console.log("data", data)
    console.log("data.length", data.length)
  if (data.length === 0) {
    alert("City does not exist, please check the spelling and try again")
  } else {
    var lat = data[0].lat;
    var log = data[0].lon;
    var name = data[0].name;
    var state = data[0].state;
    }
    console.log("lat1", lat)





    
  }

)

})

console.log("lat1", lat)
  }

  searchBtn();