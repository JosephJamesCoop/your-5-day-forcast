apiKey = "6eee33918b42ca96a6dbde84a0ecef24";

var searchSection = document.getElementById("searchSection");
var currentWeather = document.getElementById("currentWeather");
var fiveDayHeader = document.getElementById("fiveDayHeader");
var fiveDay = document.getElementById("fiveDay");
var cities123 = document.getElementById("cities");

function searchBtn() {
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
    var citySelection = document.getElementById("cityInputed").value;
    var citySelect = citySelection;
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
        var newCity = data[0].name;
        searchedCities = JSON.parse(localStorage.getItem("cities")) || [];
        searchedCities.push(newCity);
        let citySort = [...new Set(searchedCities)];
        localStorage.setItem("cities", JSON.stringify(citySort));

        var lat = data[0].lat;
        var lon = data[0].lon;
        var name = data[0].name;
        if (data[0].state === undefined) {
          var state = "";
        } else {
          var state = ", " + data[0].state;
        }
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
              var day = String(new Date(data.daily[0].dt * 1000));
              var iconLink1 =
                "https://openweathermap.org/img/w/" +
                data.daily[0].weather[0].icon +
                ".png";
              var today = day.slice(0, 10);
              var temp1 = data.current.temp;
              var wind2 = data.current.wind_speed;
              var hum = data.current.humidity;
              if (data.current.uvi <= 2) {
                var uvi = data.current.uvi;
                uvi.className = "green";
              } else if (data.current.uvi <= 5) {
                var uvi = data.current.uvi;
                uvi.className = "yellow";
              } else {
                var uvi = data.current.uvi;
                uvi.className = "red";
              }
              var uvi = data.current.uvi;
              var singleDay = document.createElement("h4");
              singleDay.innerHTML = `${name}${state}`;
              var bk1 = document.createElement("br");
              var bk2 = document.createElement("br");
              var bk3 = document.createElement("br");
              var bk4 = document.createElement("br");
              var bk5 = document.createElement("br");
              var bk6 = document.createElement("br");
              var imgIcon1 = document.createElement("img");
              imgIcon1.src = iconLink1;
              imgIcon1.className = "sizing text-center";
              var singleDate = (document.createElement(
                "p"
              ).innerHTML = `${today}`);
              var twhu = document.createElement("ul");
              var temp = (document.createElement(
                "p"
              ).innerHTML = `Temp: ${temp1} °F `);
              var wind = (document.createElement(
                "p"
              ).innerHTML = `Wind: ${wind2} MPH `);
              var humidity = (document.createElement(
                "p"
              ).innerHTML = `Humidity:  ${hum}% `);
              var uvIndex = document.createElement("p");
              uvIndex.innerHTML = `UV Index: ${uvi}`;
              if (data.current.uvi <= 2) {
                uvIndex.className = "green";
              } else if (data.current.uvi <= 5) {
                uvIndex.className = "yellow";
              } else {
                uvIndex.className = "red";
              }
              currentWeather.append(
                singleDay,
                singleDate,
                bk2,
                imgIcon1,
                bk6,
                temp,
                bk3,
                wind,
                bk5,
                humidity,
                bk4,
                uvIndex,
                twhu
              );
              fiveDayHeader.innerHTML = "The Next 5 Days";
              fiveDay.append(fiveDayHeader);
              for (let i = 1; i < 6; i++) {
                var day5 = String(new Date(data.daily[i].dt * 1000));
                var today5 = day5.slice(0, 10);
                var iconLink =
                  "https://openweathermap.org/img/w/" +
                  data.daily[i].weather[0].icon +
                  ".png";
                var temp15 = data.daily[i].temp.day;
                var wind25 = data.daily[i].wind_speed;
                var hum5 = data.daily[i].humidity;
                var bk25 = document.createElement("br");
                var daySection = document.createElement("div");
                daySection.className = "card bg-dark text-white";
                var singleDate5 = (document.createElement(
                  "a"
                ).innerHTML = `${today5}`);
                var twhu5 = document.createElement("ul");
                var imgIcon = document.createElement("img");
                imgIcon.src = iconLink;
                imgIcon.className = "sizing text-center";
                var temp5 = (document.createElement(
                  "a"
                ).innerHTML = ` Temp: ${temp15} °F, `);
                var wind5 = (document.createElement(
                  "a"
                ).innerHTML = ` Wind: ${wind25} MPH, `);
                wind5.className = "margin2";
                var humidity5 = (document.createElement(
                  "a"
                ).innerHTML = ` Humidity:  ${hum5}%`);
                var align = document.createElement("div");
                align.append(temp5, wind5, humidity5);
                daySection.append(singleDate5, imgIcon, align);
                fiveDay.append(daySection);
              }
            });
          })
          .then(saveCity(citySelection));
      }
    });
  });
}

function saveCity() {
  singleCity = JSON.parse(localStorage.getItem("cities"));
  cities123.innerHTML = "";
  var listItems = document.createElement("ul");
  for (var i = 0; i < singleCity.length; i++) {
    var brk = document.createElement("br");
    var listItem = document.createElement("li");
    listItem.className = "styling";
    var listItem1 = document.createElement("button");
    listItem1.innerHTML = singleCity[i];
    listItem.append(brk, listItem1);
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
