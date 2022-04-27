apiKey = "6eee33918b42ca96a6dbde84a0ecef24";

var searchSection = document.getElementById("searchSection");
var currentWeather = document.getElementById("currentWeather");
var fiveDay = document.getElementById("fiveDay");

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
  form.append(cityInput);
  form.append(citySearchBtn);
  searchSection.append(form);
}

var convert = function (epochTime) {
  return new Date(epochTime * 1000);
};

function apiRender() {
  var citySelect = document.getElementById("cityInputed").value;
  console.log("test", citySelect);
  var cityApi =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    citySelect +
    "&appid=" +
    apiKey;
  fetch(cityApi).then(function (info) {
    info.json().then(function (data) {
      console.log("data", data);
      console.log("data.length", data.length);
      if (data.length === 0) {
        alert("City does not exist, please check the spelling and try again");
      } else {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var name = data[0].name;
        var state = data[0].state;

        var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" +apiKey;
        fetch(weatherApi).then(function (info) {
          info.json().then(function (data) {
            console.log("dasdfsdfta", data);
            console.log("data.lsdfsdfength", data.length);
            console.log("data.daily[0].day", data.daily);
            var day = String(new Date ( data.daily[0].dt * 1000));
            var today = day.slice(0,10)
            var temp1 = data.current.temp;
            var wind2 = data.current.wind_speed;
            var hum = data.current.humidity;
            var uvi = data.current.uvi;
            var singleDay = document.createElement("h2").innerHTML = `${name} , ${state}` ;
            var bk1 = document.createElement("br")
            var bk2 = document.createElement("br")
            var bk3 = document.createElement("br")
            var bk4 = document.createElement("br")
            var bk5 = document.createElement("br")
            var bk6 = document.createElement("br")
            var singleDate = document.createElement("h3").innerHTML = `${today}` ;
            var twhu = document.createElement("ul");
            var temp = document.createElement("h3").innerHTML = `Temp: ${temp1} °F`;
            var wind = document.createElement("h3").innerHTML = `Wind: ${wind2} MPH`;
            var humidity = document.createElement("h3").innerHTML = `Humidity:  ${hum}%`;
            var uvIndex = document.createElement("h3").innerHTML = `UV Index: ${uvi}`;
            currentWeather.append(singleDay, bk1, singleDate, bk2, twhu, temp, bk3, wind, bk4, humidity, bk5, uvIndex);

            
            

            for (let i = 1; i < 6; i++) {
            var day5 = String(new Date ( data.daily[i].dt * 1000));
            var today5 = day5.slice(0,10)
            console.log("testing", data.daily[i])
            var temp15 = data.daily[i].temp.day;
            var wind25 = data.daily[i].wind_speed;
            var hum5 = data.daily[i].humidity;
            var bk25 = document.createElement("br")
            var bk35 = document.createElement("br")
            var bk45 = document.createElement("br")
            var bk55 = document.createElement("br")
            var singleDate5 = document.createElement("h3").innerHTML = `${today5}` ;
            var twhu5 = document.createElement("ul");
            var temp5 = document.createElement("h3").innerHTML = `Temp: ${temp15} °F`;
            var wind5 = document.createElement("h3").innerHTML = `Wind: ${wind25} MPH`;
            var humidity5 = document.createElement("h3").innerHTML = `Humidity:  ${hum5}%`;
            fiveDay.append(bk25, singleDate5, twhu5, temp5, bk35, wind5, bk45, humidity5, bk55);

            }


          console.log("single", singleDay)
            // var temp = doc
          console.log("3", data.current.temp);
           console.log("2", data.current.wind_speed);
           console.log("1", data.current.humidity);
           console.log("0", data.current.uvi);





          });
        });
      }
    });
  });

}

searchBtn();
