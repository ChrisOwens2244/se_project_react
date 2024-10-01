export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(data.main.temp);
  return result;
};

const getWeatherType = (tempature) => {
  if (tempature > 85) {
    return "hot";
  } else if (tempature >= 66 && tempature <= 85) {
    return "warm";
  } else if (tempature <= 65) {
    return "cold";
  }
};
