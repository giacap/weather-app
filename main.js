const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', showWeather);



let cityName;
let countryName;
let weatherConditionCode;
let temperatureInC;
let temperatureInF;
let humidity;

let hour;
let dayOrNight;

let weatherCurrentConditions;

let api_key = '';




//show weather
async function showWeather(){
    let userInput = document.querySelector('#input').value;
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${userInput}`)
    let data = await response.json();
    

    //prova
    if(response.ok == false){
        console.log(data.error.code)
        document.getElementById('input').value = '';
        document.getElementById('input').placeholder = 'Reinsert city';
        document.getElementById('input').classList.add('input-on-error')
    } else {

        //get weather data
        cityName = data.location.name;
        countryName = data.location.country;
        hour = data.location.localtime.split(' ')[1];
        dayOrNight = parseInt(hour.replace(':', ''));
        weatherConditionCode = data.current.condition.code;
        temperatureInC = data.current.temp_c;
        temperatureInF = data.current.temp_f;
        humidity = data.current.humidity;
    


        //show weather data in the page

        document.querySelector('#city-name-text').innerHTML = `${cityName}, ${countryName}`;
        document.querySelector('#weather-temperature-text').innerHTML = `Temperature: ${temperatureInC}C ; ${temperatureInF}F`;
        document.querySelector('#weather-humidity-text').innerHTML = `Humidity: ${humidity}%`;

    
        let response2 = await fetch('weather_conditions.json');
        let data2 = await response2.json();
        data2.forEach(function(singleData){
            if(singleData.code == weatherConditionCode){
                weatherCurrentConditions = singleData;
            }
        })

    
        if(dayOrNight >= 1700 || dayOrNight < 600){
            document.querySelector('#weather-condition-text').innerHTML = weatherCurrentConditions.night;
            document.querySelector('#weather-img').src = `icons/weather/weather/64x64/night/${weatherCurrentConditions.icon}.png`;
        } else{
            document.querySelector('#weather-condition-text').innerHTML = weatherCurrentConditions.day;
            document.querySelector('#weather-img').src = `icons/weather/weather/64x64/day/${weatherCurrentConditions.icon}.png`;
        }
    

        document.querySelector('#weather-container').classList.add('weather-container-activeMode');
        document.querySelector('#city-name').classList.add('city-name-activeMode');
        document.querySelector('#weather-condition').classList.add('weather-condition-activeMode');
        

        document.getElementById('input').classList.remove('input-on-error');
        document.getElementById('input').value = '';

    }

    
}

