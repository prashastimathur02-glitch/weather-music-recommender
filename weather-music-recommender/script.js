const apiKey = "215400e012774d3f7835d7da796518e3";

function getMusicRecommendation(weather) {
  weather = weather.toLowerCase();

  if (weather.includes("rain")) {
    return "🌧️ Rainy Weather → Listen to Lo-fi and Romantic songs";
  } else if (weather.includes("clear")) {
    return "🌤️ Clear Sky → Enjoy upbeat and energetic music";
  } else if (weather.includes("cloud")) {
    return "☁️ Cloudy Weather → Listen to Chill and Acoustic songs";
  } else if (weather.includes("thunderstorm")) {
    return "⛈️ Stormy Weather → Listen to Deep Focus and Instrumental music";
  } else {
    return "🎵 Enjoy your favorite playlist";
  }
}

async function getRecommendationButton() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("result");

  if (city === "") {
    result.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (data.cod == "404") {
      result.innerHTML = "City not found. Please check spelling.";
      return;
    }

    if (data.cod == "401") {
      result.innerHTML = "Invalid API key or API key not activated yet.";
      return;
    }

    const weather = data.weather[0].main;
    const temp = data.main.temp;
    const music = getMusicRecommendation(weather);

    result.innerHTML = `
      <h2>${data.name}</h2>
      <p>Weather: ${weather}</p>
      <p>Temperature: ${temp} °C</p>
      <h3>${music}</h3>
    `;

  } catch (error) {
    console.log(error);
    result.innerHTML = "Something went wrong. Check internet or API key.";
  }
}