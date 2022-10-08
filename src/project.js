function getCurrentDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[date.getDay()];
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let sentence = `${day} ${hours}:${minutes}`;

  return `${sentence}`;
}

let now = new Date();
let todayDate = document.querySelector("#current-time");
todayDate.innerHTML = getCurrentDate(now);

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].main}!`;

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${temperature}°`;
  let showHumidity = Math.round(response.data.main.humidity);
  let showWind = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  humidity.innerHTML = `Humidity: ${showHumidity}%`;
  wind.innerHTML = `Wind: ${showWind}km/h`;
  let icon = document.querySelector("#icon");
  let showicon = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${showicon}@2x.png`
  );
}

function cityStart(city) {
  let apiKey = "9cf0c4601d22d1093438ea4179820380";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  cityStart(city);
}

cityStart("Kyiv");

let enterCity = document.querySelector("#enter-city");
enterCity.addEventListener("submit", searchCity);

function clickTemp(event) {
  event.preventDefault();

  clickCelsius.classList.add("active");
  clickFahrenheit.classList.remove("active");
  let getCelsius = document.querySelector("#temperature");
  getCelsius.innerHTML = Math.round(celsiusTemperature);
}
function clickTempFar(event) {
  event.preventDefault();
  let getFahrenheit = document.querySelector("#temperature");
  clickCelsius.classList.remove("active");
  clickFahrenheit.classList.add("active");
  let farTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  getFahrenheit.innerHTML = `${farTemp}°`;
}
function clickCurrentButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "9cf0c4601d22d1093438ea4179820380";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `
   <ul class="fivedayslist">
                   <li class="dayone" id="dayone">
                      <div class="row">
                      <div class="col-3">
                      Mon 
                      </div>
                      <div class="col-3">
                      <span class="icon"> <i class="fa-solid fa-sun"></i> </span>
                      </div>
                      <div class="col-3">
                      <span class="temp-min">2°</span> 
                      </div>
                       <div class="col-3">
                      <span class="temp-forcast-max">4°</span> 
                      </div>
                      </div>
                   </li>
                </ul>
  `;
}

let clickCelsius = document.querySelector("#celsius-link");
clickCelsius.addEventListener("click", clickTemp);
let clickFahrenheit = document.querySelector("#fahrenheit-link");
clickFahrenheit.addEventListener("click", clickTempFar);
let clickCurrent = document.querySelector("#currentButton");
clickCurrent.addEventListener("click", clickCurrentButton);
let celsiusTemperature = null;

displayForecast();
