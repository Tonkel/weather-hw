// var apikey: e9fd4d66744477a7c633b9e44349f6b3;

//Dependencies
var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var recentSearchesEl = document.getElementById("recent-searches");
var currentDateEl = document.getElementById("current-date");
var currentTempEl = document.getElementById("current-temp");
var currentWindEl = document.getElementById("current-wind");
var currentHumidEl = document.getElementById("current-humid");
var forecastContainer = document.querySelector(".container-4");
var sidebarEl = document.querySelector(".container");
//data
var date = dayjs().format(`M/D/YYYY`);

//functions
function appendToList(cityName) {
  var newListItem = recentSearchesEl.appendChild(document.createElement("li"));
  var listButton = newListItem.appendChild(document.createElement("button"));
  listButton.textContent = cityName;
  listButton.setAttribute("id", "list-button");
}

//delete children
function deleteChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
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

//function to get weather and make cards
function makeCards(city) {
  var currentWeatherAPIKey = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e9fd4d66744477a7c633b9e44349f6b3&units=imperial`;

  //fetch and manipulate current weather data
  fetchAPI(currentWeatherAPIKey).then(function (data) {
    //data
    var wind = data.wind.speed;
    var temp = data.main.temp;
    var humidity = data.main.humidity;

    //manipulate elements
    currentDateEl.textContent = `${city} (${date})`;
    currentWindEl.textContent = `Wind: ${wind}mph`;
    currentHumidEl.textContent = `Humidity: ${humidity}`;
    currentTempEl.textContent = `Temp: ${temp} degrees`;
  });

  //now get data for 5 day forecast
  var weatherForecastKey = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e9fd4d66744477a7c633b9e44349f6b3&units=imperial`;

  fetchAPI(weatherForecastKey).then(function (data) {
    console.log(data);
    dataList = data.list;

    //clear children
    deleteChildren(forecastContainer);

    //for statement to isolate only the 12pm timestamps
    for (obj in dataList) {
      if (dataList[obj].dt_txt.includes("12:00:00")) {
        console.log(dataList[obj]);
        //data
        var date2 = dayjs(dataList[obj].dt_txt).format("M/D/YYYY");
        var icon = dataList[obj].weather[0].icon;
        var temp = dataList[obj].main.temp;
        var wind = dataList[obj].wind.speed;
        var humidity = dataList[obj].main.humidity;

        //create div to put in flex container
        var divEl = document.createElement("div");
        //build
        divEl.setAttribute("class", ".card");
        //place
        forecastContainer.appendChild(divEl);

        var dateEl = document.createElement("h3");
        dateEl.textContent = date2;
        divEl.appendChild(dateEl);

        var iconEl = document.createElement("i");
        iconEl.innerHTML = icon;
        divEl.appendChild(iconEl);

        var tempEL = document.createElement("p");
        tempEL.textContent = temp;
        divEl.appendChild(tempEL);

        var windEl = document.createElement("p");
        windEl.textContent = wind;
        divEl.appendChild(windEl);

        var humidEl = document.createElement("p");
        humidEl.textContent = humidity;
        divEl.appendChild(humidEl);
      }
    }
  });
}

//event listener
searchButtonEl.addEventListener("click", function () {
  var searchinput = searchInputEl.value;

  //appends search input to list
  appendToList(searchinput);
  makeCards(searchinput);
});

//ge/display data on previous searches
sidebarEl.addEventListener("click", function (event) {
  element = event.target;
  city = event.target.textContent;

  if (element.matches("#list-button")) {
    makeCards(city);
  }
});

//create event listener for search button to take text input
//create function that takes the weather from that city and displays it in the divs created
// create function that takes the 5day forecast and displays it
//create event listener for the recently searched cities button to do the same thing, but with the text input of the button
