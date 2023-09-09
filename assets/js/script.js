// var apikey: e9fd4d66744477a7c633b9e44349f6b3;

//Dependencies
var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var recentSearchesEl = document.getElementById("recent-searches");
var currentDateEl = document.getElementById("current-date");
var currentTempEl = document.getElementById("current-temp");
var currentWindEl = document.getElementById("current-wind");
var currentHumidEl = document.getElementById("current-humid");
//data
var date = dayjs().format(`M/D/YYYY`);

//functions
function appendToList(cityName) {
  var newListItem = recentSearchesEl.appendChild(document.createElement("li"));
  var listButton = newListItem.appendChild(document.createElement("button"));
  listButton.textContent = cityName;
  listButton.setAttribute("id", "list-button");
}

//fetch API
function fetchAPI(API) {
  return fetch(API)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

//event listener
searchButtonEl.addEventListener("click", function () {
  var searchinput = searchInputEl.value;

  //appends search input to list
  appendToList(searchinput);

  var currentWeatherAPIKey = `https://api.openweathermap.org/data/2.5/weather?q=${searchinput}&appid=e9fd4d66744477a7c633b9e44349f6b3&units=imperial`;

  //fetch and manipulate current weather data
  fetchAPI(currentWeatherAPIKey).then(function (data) {
    console.log(data);
    //data
    var wind = data.wind.speed;
    var temp = data.main.temp;
    var humidity = data.main.humidity;

    //manipulate elements
    currentDateEl.textContent = `${searchinput} (${date})`;
    currentWindEl.textContent = `Wind: ${wind}mph`;
    currentHumidEl.textContent = `Humidity: ${humidity}`;
    currentTempEl.textContent = `Temp: ${temp} degrees`;
  });
});
//create event listener for search button to take text input
//create function that takes the weather from that city and displays it in the divs created
// create function that takes the 5day forecast and displays it
//create event listener for the recently searched cities button to do the same thing, but with the text input of the button
