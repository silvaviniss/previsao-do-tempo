import './WeatherInfo5Days.css';

function WeatherInfo5Days({ weather5Days }) {
    console.log(weather5Days);

    let dailyForecast = {};

    for (let forecast of weather5Days.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();

        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast;
        }
    }

    const next5DaysForecast = Object.values(dailyForecast).slice(1,6);

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit'});

        return newDate;
    }

    return (
        <div className='weather-container'>
            <h3>Previsão dos próximos 5 dias</h3>

            <div className='weather-list'>
                { 
                    next5DaysForecast.map(forecast => (
                        <div key={forecast.dt} className='weather-item'>
                            <p className='forecast-day'>{convertDate(forecast)}</p>
                            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} />
                            <p className='description'>{forecast.weather[0].description}</p>
                            <p className='description'>{Math.round(forecast.main.temp_min)} ºC min / {Math.round(forecast.main.temp_max)} ºC máx</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

WeatherInfo5Days.propTypes = {
    weather5Days: Object
}

export default WeatherInfo5Days;