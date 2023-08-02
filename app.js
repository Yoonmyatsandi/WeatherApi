let weather = {
    apiKey : "", //Add Your API Key
    fetchWeather : function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => {
            this.displayWeather(data);
            const weatherDescription = data.weather[0].description;
            fetchUnsplashImage(weatherDescription);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0]; 
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city-wea").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".descrip").innerText = description;
        document.querySelector(".temperature").innerText = temp.toFixed(1) + "°C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed : " + speed + "km/h";
    },
};

document.querySelector(".search-icon").addEventListener("click", function(){
    const searchTerm = document.querySelector(".search-bar").value;
    weather.fetchWeather(searchTerm);
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        const searchTerm = document.querySelector(".search-bar").value;
        weather.fetchWeather(searchTerm);
        document.querySelector(".search-bar").value = "";
    }
});

function fetchUnsplashImage(weatherDescription) {
  let photoKeyword = "";

  switch (weatherDescription.toLowerCase()) {
    case "clear sky":
      photoKeyword = "sunny";
      break;
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
      photoKeyword = "cloudy";
      break;
    case "overcast clouds":
      photoKeyword = "cloudy";
      break;
    case "shower rain":
    case "rain":
    case "thunderstorm":
      photoKeyword = "rain";
      break;
    case "light rain":
    case "moderate rain":
    case "thunderstorm with light rain":
      photoKeyword = "light-rain";
      break;
    case "heavy intensity rain": 
      photoKeyword = "heavy-rain";
      break;
    case "snow":
      photoKeyword = "snow";
      break;
    case "mist":
      photoKeyword = "mist";
      break;
    default:
      photoKeyword = "default";
      break;
  }

  const imageUrl = `https://source.unsplash.com/1600x900/?${photoKeyword}`;
  const unsplashImage = document.getElementById("unsplash-image");
  unsplashImage.src = imageUrl;
}
