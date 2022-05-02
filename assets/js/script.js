apiKey = "6eee33918b42ca96a6dbde84a0ecef24";

var searchSection = document.getElementById("searchSection");
var currentWeather = document.getElementById("currentWeather");
var fiveDay = document.getElementById("fiveDay");
var cities123 = document.getElementById("cities");

function searchBtn() {
  var title = (document.createElement("h2").innerHTML = "Search for a City");
  searchSection.append(title);
  var form = document.createElement("form");
  var cityInput = document.createElement("input");
  cityInput.setAttribute("type", "text");
  cityInput.setAttribute("placeholder", "Enter a city");
  cityInput.setAttribute("id", "cityInputed");
  var citySearchBtn = document.createElement("input");
  citySearchBtn.setAttribute("type", "button");
  citySearchBtn.setAttribute("value", "Search");
  citySearchBtn.onclick = apiRender;
  cityInput.value = "";
  form.append(cityInput);
  form.append(citySearchBtn);
  searchSection.append(form);
}

function apiRender(cityName) {
  currentWeather.innerHTML = "";
  fiveDay.innerHTML = "";
  if (cityName.altKey === false) {
    console.log("test1", cityName);
    var citySelection = document.getElementById("cityInputed").value;
    var citySelect = citySelection;
    console.log("test", citySelect);
    var cityApi =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      citySelect +
      "&appid=" +
      apiKey;
  } else {
    var cityApi =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&appid=" +
      apiKey;
  }
  fetch(cityApi).then(function (info) {
    info.json().then(function (data) {
      var clearSearch = document.getElementById("cityInputed");
      clearSearch.value = "";
      if (data.length === 0 || data.message === "Nothing to geocode") {
        alert("City does not exist, please check the spelling and try again");
      } else {
        // add cityName to local storage
        var newCity = document
          .getElementById("cityInputed")
          .value.toUpperCase();
        searchedCities = JSON.parse(localStorage.getItem("cities")) || [];
        searchedCities.push(newCity);
        let citySort = [...new Set(searchedCities)];
        localStorage.setItem("cities", JSON.stringify(citySort));

        var lat = data[0].lat;
        var lon = data[0].lon;
        var name = data[0].name;
        var state = data[0].state;

        var weatherApi =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&units=imperial&appid=" +
          apiKey;
        fetch(weatherApi)
          .then(function (info) {
            info.json().then(function (data) {
              console.log("dasdfsdfta", data);
              console.log("data.lsdfsdfength", data.length);
              console.log("data.daily[0].day", data.daily);
              var day = String(new Date(data.daily[0].dt * 1000));
              var today = day.slice(0, 10);
              var temp1 = data.current.temp;
              var wind2 = data.current.wind_speed;
              var hum = data.current.humidity;
              var uvi = data.current.uvi;
              var singleDay = (document.createElement(
                "h2"
              ).innerHTML = `${name} , ${state}`);
              var bk1 = document.createElement("br");
              var bk2 = document.createElement("br");
              var bk3 = document.createElement("br");
              var bk4 = document.createElement("br");
              var bk5 = document.createElement("br");
              var bk6 = document.createElement("br");
              var singleDate = (document.createElement(
                "h3"
              ).innerHTML = `${today}`);
              var twhu = document.createElement("ul");
              var temp = (document.createElement(
                "h3"
              ).innerHTML = `Temp: ${temp1} °F`);
              var wind = (document.createElement(
                "h3"
              ).innerHTML = `Wind: ${wind2} MPH`);
              var humidity = (document.createElement(
                "h3"
              ).innerHTML = `Humidity:  ${hum}%`);
              var uvIndex = (document.createElement(
                "h3"
              ).innerHTML = `UV Index: ${uvi}`);
              currentWeather.append(
                singleDay,
                bk1,
                singleDate,
                bk2,
                twhu,
                temp,
                bk3,
                wind,
                bk4,
                humidity,
                bk5,
                uvIndex
              );
              var fiveDayHeader = document.createElement("div").innerHTML = "The Next 5 Days";
              fiveDay.append(fiveDayHeader)
              for (let i = 1; i < 6; i++) {
                var day5 = String(new Date(data.daily[i].dt * 1000));
                var today5 = day5.slice(0, 10);
                var temp15 = data.daily[i].temp.day;
                var wind25 = data.daily[i].wind_speed;
                var hum5 = data.daily[i].humidity;
                var bk25 = document.createElement("br");
                var bk35 = document.createElement("br");
                var bk45 = document.createElement("br");
                var bk55 = document.createElement("br");
                var daySection = document.createElement("div");
                var singleDate5 = (document.createElement(
                  "h3"
                ).innerHTML = `${today5}`);
                var twhu5 = document.createElement("ul");
                var temp5 = (document.createElement(
                  "h3"
                ).innerHTML = `Temp: ${temp15} °F   `);
                var wind5 = (document.createElement(
                  "h3"
                ).innerHTML = `Wind: ${wind25} MPH   `);
                var humidity5 = (document.createElement(
                  "h3"
                ).innerHTML = `Humidity:  ${hum5}%   `);
                daySection.append(
                  bk25,
                  singleDate5,
                  twhu5,
                  temp5,
     
                  wind5,
   
                  humidity5
          
                );
                fiveDay.append(daySection)
              }
            });
          })
          .then(saveCity(citySelection));
      }
    });
  });
}

function saveCity() {
  singleCity = JSON.parse(localStorage.getItem("cities")) || [];
  cities123.innerHTML = "";
  var listItems = document.createElement("ul");
  for (var i = 0; i < singleCity.length; i++) {
    var listItem = document.createElement("li");
    var listItem1 = document.createElement("button");
    listItem1.innerHTML = singleCity[i];
    listItem.append(listItem1);
    listItems.append(listItem);
  }
  cities123.append(listItems);
}

var citiesClick = function (event) {
  cityName = event.target.innerText;
  apiRender(cityName);
};

searchBtn();
cities123.addEventListener("click", citiesClick);
