import './App.css';
import { useRef, useState } from 'react';
import axios from 'axios';
import  WeatherInfo from './components/WeatherInfo/WeatherInfo';
import  WeatherInfo5Days from './components/WeatherInfo5Days/WeatherInfo5Days';


function App() {
	const inputRef = useRef();
	const [weather, setWeather] = useState();
	const [weather5Days, setWeather5Days] = useState();


	async function searchCity() {
		const city = inputRef.current.value;
		const key = "8d8c08c7689b531c4b06131c942a1ab8";
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
		const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

		const dataWeather = await axios.get(url);
		const dataForecast = await axios.get(url5Days);

		setWeather(dataWeather.data);
		setWeather5Days(dataForecast.data);
	}

  	return (
		<div className='container'>
			<h1>Previsão do Tempo</h1>
			<input ref={inputRef} type='text' placeholder='Digite o nome da cidade'></input>
			<button onClick={searchCity}>Buscar</button>

			{ weather && <WeatherInfo weather={weather}/> }
			{ weather5Days && <WeatherInfo5Days weather5Days={weather5Days}/> }

		</div>
  	);
}

export default App;