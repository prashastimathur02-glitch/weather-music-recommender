const apiKey = "215400e012774d3f7835d7da796518e3";
function getPlaylistLinks(weather, isDay) {
  weather = weather.toLowerCase();

  if (weather.includes("clear")) {
    if (isDay) {
      return {
        spotify: "https://open.spotify.com/search/happy%20pop%20travel%20songs",
        youtube: "https://www.youtube.com/results?search_query=happy+pop+travel+songs+playlist"
      };
    } else {
      return {
        spotify: "https://open.spotify.com/search/lofi%20chill%20night%20playlist",
        youtube: "https://www.youtube.com/results?search_query=lofi+chill+night+playlist"
      };
    }
  }

  if (weather.includes("rain")) {
    return {
      spotify: "https://open.spotify.com/search/rainy%20lofi%20songs",
      youtube: "https://www.youtube.com/results?search_query=rainy+lofi+songs+playlist"
    };
  }

  if (weather.includes("cloud")) {
    return {
      spotify: "https://open.spotify.com/search/chill%20acoustic%20playlist",
      youtube: "https://www.youtube.com/results?search_query=chill+acoustic+playlist"
    };
  }

  if (weather.includes("thunderstorm")) {
    return {
      spotify: "https://open.spotify.com/search/deep%20focus%20instrumental",
      youtube: "https://www.youtube.com/results?search_query=deep+focus+instrumental+playlist"
    };
  }

  if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) {
    return {
      spotify: "https://open.spotify.com/search/peaceful%20ambient%20music",
      youtube: "https://www.youtube.com/results?search_query=peaceful+ambient+music+playlist"
    };
  }

  return {
    spotify: "https://open.spotify.com/search/mood%20playlist",
    youtube: "https://www.youtube.com/results?search_query=mood+playlist"
  };
}
function changeBackground(weather, isDay) {
    weather = weather.toLowerCase();

    if (weather.includes("clear")) {
        if (isDay) {
          document.body.style.background =
          "linear-gradient(to right, #89f7fe, #66a6ff)";
        } else {
            document.body.style.background =
                "linear-gradient(to right, #141e30, #243b55)";
        }
    }

    else if (weather.includes("cloud")) {
        document.body.style.background =
            "linear-gradient(to right, #757f9a, #d7dde8)";
    }

    else if (weather.includes("rain")) {
        document.body.style.background =
            "linear-gradient(to right, #4b79a1, #283e51)";
    }

    else if (weather.includes("thunderstorm")) {
        document.body.style.background =
            "linear-gradient(to right, #232526, #414345)";
    }

    else if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) {
        document.body.style.background =
            "linear-gradient(to right, #bdc3c7, #2c3e50)";
    }
}

function isDayTime(currentTime, sunrise, sunset) {
  return currentTime >= sunrise && currentTime <= sunset;
}

function getMusicRecommendation(weather, isDay) {
  
  weather = weather.toLowerCase();

  if (weather.includes("clear")) {
    if (isDay) {
      return "☀️ Clear Day → Listen to happy pop, travel, and energetic songs";
    } else {
      return "🌙 Clear Night → Listen to lo-fi, chill, and late-night acoustic songs";
    }
  }

  if (weather.includes("rain")) {
    if (isDay) {
      return "🌧️ Rainy Day → Listen to soft acoustic and calm songs";
    } else {
      return "🌧️ Rainy Night → Listen to lo-fi and relaxing songs";
    }
  }

  if (weather.includes("cloud")) {
    if (isDay) {
      return "☁️ Cloudy Day → Listen to indie, chill, and soft pop songs";
    } else {
      return "☁️ Cloudy Night → Listen to calm instrumental and slow songs";
    }
  }

  if (weather.includes("thunderstorm")) {
    return "⛈️ Stormy Weather → Listen to deep focus and instrumental music";
  }

  if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) {
    if (isDay) {
      return "🌫️ Misty Day → Listen to peaceful and ambient music";
    } else {
      return "🌫️ Misty Night → Listen to slow, dreamy, and relaxing music";
    }
  }

  return "🎵 Mixed Weather → Enjoy your favorite playlist";
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

    if (data.cod == 404 || data.cod == "404") {
      result.innerHTML = "City not found. Please check spelling.";
      return;
    }

    if (data.cod == 401 || data.cod == "401") {
      result.innerHTML = "Invalid API key or API key not activated yet.";
      return;
    }

    const weather = data.weather[0].main;
    const description = data.weather[0].description;
    const temp = data.main.temp;

    const currentTime = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    const isDay = isDayTime(currentTime, sunrise, sunset);
    changeBackground(weather, isDay);
    const timeText = isDay ? "Day" : "Night";
    const timeIcon = isDay ? "☀️" : "🌙";

    const music = getMusicRecommendation(weather, isDay);
    const playlists = getPlaylistLinks(weather, isDay);
   result.innerHTML = `
  <h2>📍 ${data.name}</h2>

  <p>${timeIcon} <strong>${timeText}</strong></p>

  <p>☁️ ${description}</p>

  <p>🌡️ ${temp.toFixed(1)} °C</p>

  <hr>

  <h3>🎵 Music Recommendation</h3>

  <p>${music}</p>

  <div class="playlist-buttons">
    <a href="${playlists.spotify}" target="_blank">🎧 Open Spotify</a>
    <a href="${playlists.youtube}" target="_blank">▶️ Open YouTube</a>
  </div>
`;
  } catch (error) {
    console.log(error);
    result.innerHTML = "Something went wrong. Check internet or API key.";
  }
}