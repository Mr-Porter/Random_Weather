async function fetchCitiesData() {
const response = await fetch('cities.json');
return await response.json();
}

function getRandomCity() {
  const citiesData = fetchCitiesData();
  return citiesData.then(data => {
    const cities = data.cities;
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  });
}

getRandomCity().then(randomCity => {
  const cityName = randomCity.name;
  const countryName = randomCity.country;
  const cityPopulation = randomCity.population.toLocaleString();;
  const latitude = randomCity.latitude;
  const longitude = randomCity.longitude;

  console.log("Selected City:", cityName);
//---------------------------------------------------------------------------------------
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,cloud_cover,surface_pressure,wind_speed_10m&models=gfs_global`;
  

  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .then(data => {
      const currentTemperature = data.current.temperature_2m;
      const currentCloudCoverage = data.current.cloud_cover;
      const currentIsDay = data.current.is_day;
      const currentRain = data.current.precipitation;
      const currentPressure =data.current.surface_pressure;
      const currentWindSpeed =data.current.wind_speed_10m;

      console.log('Current Temperature:', currentTemperature);
      console.log('Current Cloud Coverage:', currentCloudCoverage);
//--------------------------------------------------------------------------------------      
      let gradientColors = 'linear-gradient(0deg, rgba(16,52,92,1) 0%, rgba(52,78,101,1) 100%)';
      let textColor = 'white';

      const locationText = document.getElementById('location-text');
      const locationPopulation = document.getElementById('location-population');
      const pressureText = document.getElementById('weather-pressure')
      const temparatureText = document.getElementById('weather-temparature')
      const cloudCoverageText = document.getElementById('weather-cloudCoverage')
      const rainText = document.getElementById('weather-rain')
      const windSpeedText = document.getElementById('weather-windSpeed')
      const weatherIcon = document.getElementById('weather-svg');

      locationText.textContent = `${cityName}, ${countryName}`;
      locationPopulation.textContent = `${cityPopulation}`;
      pressureText.textContent = `${currentPressure}`;
      rainText.textContent = `${currentRain}`;
      temparatureText.textContent = `${currentTemperature}`;
      cloudCoverageText.textContent = `${currentCloudCoverage}`;
      windSpeedText.textContent = `${currentWindSpeed}`;

      if (currentIsDay == 1) {
        if(currentRain < 0.05){
        gradientColors = 'linear-gradient(0deg, rgba(42,151,199,1) 0%, rgba(144,215,245,1) 100%)'; //sunny
        if (currentCloudCoverage < 25) {
            weatherIcon.src = 'assets/sun.svg'
        } else if (currentCloudCoverage >= 25 && currentCloudCoverage <= 75) {
            weatherIcon.src = 'assets/cloudSun.svg'
        } else {
          weatherIcon.src = 'assets/cloud.svg';
      }
      }else{
      gradientColors = 'linear-gradient(0deg, rgba(42,151,199,1) 0%, rgba(144,215,245,1) 100%)'; //sunny rainy
        if (currentCloudCoverage < 60) {
            weatherIcon.src = 'assets/sunRain.svg'
        } else {
          weatherIcon.src = 'assets/rain.svg';
        }
      }
      } else {
        if(currentRain < 0.05){
      gradientColors = 'linear-gradient(0deg, rgba(29,63,101,1) 0%, rgba(45,97,136,1) 100%)'; //night
        if (currentCloudCoverage < 25) {
            weatherIcon.src = 'assets/moon.svg'
        } else if (currentCloudCoverage >= 25 && currentCloudCoverage <= 75) {
            weatherIcon.src = 'assets/cloudMoon.svg'
        } else {
        weatherIcon.src = 'assets/cloud.svg';
        }
      }else{
      gradientColors = 'linear-gradient(0deg, rgba(29,63,101,1) 0%, rgba(45,97,136,1) 100%)'; //night rainy
        if (currentCloudCoverage < 60) {
            weatherIcon.src = 'assets/moonRain.svg'
        } else {
          weatherIcon.src = 'assets/rain.svg';
        }
        }
      }

      document.body.style.backgroundImage = gradientColors;

      const weatherHeader = document.querySelector('.weather-header');
      weatherHeader.style.color = textColor;
//-------------------------------------------------------      
      if (currentRain > -1) {
        console.log('big penis');
        const rain = document.getElementById('rain');
        for(let i = 0; i < 100; i++) {
          const drop = document.createElement('div');
          drop.className = 'drop';
          rain.appendChild(drop);
        }
      }
//-------------------------------------------------------    
    })
});
