//Declaro constantes para las distintas secciones de la app.
const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.err');

// Evento addlistener para la funcion "click"

search.addEventListener('click', () =>{

    //Consumir API y declarar variable del input de busqueda

    const APIKey = 'd68c47ff1a227b1929eeb165ea28bb8e'
    const city = document.querySelector('.search input').value;

    if (city === '')
        return;
    
    // Realizo un fetch para solicitar datos dentro de la api

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

    // Condicional para evaluar las distnitas respuestas de la app (404)

    if(json.cod === '404'){
        container.style.height = '500px';
        weatherBox.style.display= 'none';
        weatherDetails.style.display= 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    // Declaro constantes sobre los datos de diferentes resultados

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span')
    
    // Creo expresion switch para evaluar los diferentes casos del clima

        switch (json.weather[0].main){
            case "Clear":
                    image.src = "./icons/clear.png";
                break;

            case 'Rain':
                    image.src = "./icons/rain.png";
                break;

            case "Snow":
                    image.src = "./icons/snow.png";
                break;

            case "Clouds":
                    image.src = "./icons/cloud.png";
                break;

            case "Haze":
                    image.src = "./icons/mist.png";
                break;

                default:
                    image.src = "";
        }

            // Mostrar resultados por pantalla

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
    });
});