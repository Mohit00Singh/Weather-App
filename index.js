
const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "44eb3596cc946d59f7be2742be624f5a";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if(city){
       try{
        const weatherdata = await getWeatherData(city);
        DisplayWeatherInfo(weatherdata);
       }

       catch(error)
       {
        console.error(error);
        displayError(error);
       }
    }
    else{
        displayError("Please Enter the City!");
    }

});

async function getWeatherData(city){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const res = await fetch(url);

  if(!res.ok)
  {
    throw new Error("Couldn't fetch data");
  }
  return await res.json();
}

function DisplayWeatherInfo(data){
    const {name : city, 
           main : {temp, humidity}, 
           weather : [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex"; 
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°`;
    humidityDisplay.textContent = `Humidity : ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getweatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    
}

function getweatherEmoji(id){
    
    switch(true)
    {
        case (id >= 200 && id < 300):
            return "⛈️";
        case (id >= 300 && id < 400):
            return "🌦️";
        case (id >= 500 && id < 600):
            return "🌧️";   
        case (id >= 600 && id < 700):
            return "❄️"; 
        case (id >= 700 && id < 800):
            return "🌫️";
        case (id == 800):
            return "☀️";  
        case (id > 800 && id < 810):
            return "☁️";
        default :
            return "🛸";             
    }
}

function displayError(message){
  const e = document.createElement("p");
  e.textContent = message;
  e.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(e);
}