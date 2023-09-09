// var apikey: e9fd4d66744477a7c633b9e44349f6b3;

//Dependencies
var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var recentSearchesEl = document.getElementById("recent-searches");
//functions
function appendToList(cityName) {
  var newListItem = recentSearchesEl.appendChild(document.createElement("li"));
  var listButton = newListItem.appendChild(document.createElement("button"));
  listButton.textContent = cityName;
}

//event listener
searchButtonEl.addEventListener("click", function () {
  var searchinput = searchInputEl.value;
  console.log(searchinput);
  appendToList(searchinput);
});
//create event listener for search button to take text input
//create function that takes the weather from that city and displays it in the divs created
// create function that takes the 5day forecast and displays it
//create event listener for the recently searched cities button to do the same thing, but with the text input of the button
