import './App.css';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import  WeatherInfo from './components/WeatherInfo/WeatherInfo';
import  WeatherInfo5Days from './components/WeatherInfo5Days/WeatherInfo5Days';

function App() {
	const inputRef = useRef();
	const [weather, setWeather] = useState();
	const KEY = import.meta.env.VITE_API_KEY;
	const URL = import.meta.env.VITE_API_URL;
	const URL_5DAYS = import.meta.env.VITE_API_URL_5DAYS;


	const [weather5Days, setWeather5Days] = useState();
	const [userLocation, setUserLocation] = useState(null);
	
	useEffect(() => {
		searchCityDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation({ latitude, longitude });
					searchCityDefault();
				}, (error) => {
					console.error("Erro ao obter localização", error);
				}
			);
		} else {
			console.error("A geolocalização não é suportada por este navegador");
		}
	}

	async function searchCityDefault() {
		if (userLocation) {
			const url = `${URL}lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${KEY}&lang=pt_br&units=metric`;
			const url5Days = `${URL_5DAYS}lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${KEY}&lang=pt_br&units=metric`;

			const dataWeather = await axios.get(url);
			const dataForecast = await axios.get(url5Days);

			setWeather(dataWeather.data);
			setWeather5Days(dataForecast.data);
		} else {
			getLocation();
		}
	};

	async function searchCity() {
		const city = inputRef.current.value;
		const url = `${URL}q=${city}&appid=${KEY}&lang=pt_br&units=metric`;
		const url5Days = `${URL_5DAYS}q=${city}&appid=${KEY}&lang=pt_br&units=metric`;

		const dataWeather = await axios.get(url);
		const dataForecast = await axios.get(url5Days);

		setWeather(dataWeather.data);
		setWeather5Days(dataForecast.data);
	};

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