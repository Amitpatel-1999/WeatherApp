let loc = document.getElementById('location');
let tempicon = document.getElementById('temp-icon');
let tempvalue = document.getElementById('temp-value');
let climate = document.getElementById('climate');
let iconfile;
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


/* code for fetching the API */

searchButton.addEventListener('click', (e)=>{
	e.preventDefault();
	getWeather(searchInput.value);
	searchInput.value='';
});

const getWeather = async(city)=>{
	try {
		const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=42054cf7c72cccf1694715676b91a20e`);

		const weatherData = await response.json();

		const{name} = weatherData;
		const{feels_like} = weatherData.main;
		const{id, main} = weatherData.weather[0];

		loc.textContent = name;
		climate.textContent = main;
		tempvalue.textContent = Math.round(feels_like - 273);

		if(id < 300 && id >= 200){
			tempicon.src = "./static/thunderstorm.png";
		}else if(id < 400 && id >= 300){
			tempicon.src = "./static/cloud.png";
		}else if(id < 600 && id >= 500){
			tempicon.src = "./static/rainy.png";
		}else if(id < 700 && id >= 600){
			tempicon.src = "./static/snowflake.png";
		}else if(id < 800 && id >= 700){
			tempicon.src = "./static/thunderstorm.png";
		}else if(id < 800 && id >= 700){
			tempicon.src = "./static/cloud.png";
		}else if(id == 800){
			tempicon.src = "./static/sun.png";
		}else if(id >= 800){
			tempicon.src = "./static/cloud.png";
		}

	}catch(error){
		alert('City Not Found');
	}


}

window.addEventListener("load", ()=>{

	let long;
	let lat;

	if(navigator.geolocation){

		navigator.geolocation.getCurrentPosition((position)=>{

			long = position.coords.longitude;
			lat = position.coords.latitude;
			

			const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=42054cf7c72cccf1694715676b91a20e`;

			fetch(api).then((response) => response.json())

			.then(data =>{

				const{name} = data;
				const{feels_like} = data.main;
				const{id, main} = data.weather[0];


				loc.textContent = name;
				climate.textContent = main;
				tempvalue.textContent = Math.round(feels_like - 273); // kelvin to celsius

				if(id < 300 && id >= 200){
					tempicon.src = "./static/thunderstorm.png";
				}else if(id < 400 && id >= 300){
					tempicon.src = "./static/cloud.png";
				}else if(id < 600 && id >= 500){
					tempicon.src = "./static/rainy.png";
				}else if(id < 700 && id >= 600){
					tempicon.src = "./static/snowflake.png";
				}else if(id < 800 && id >= 700){
					tempicon.src = "./static/cloud.png";
				}else if(id >= 800){
					tempicon.src = "./static/sun.png";
				}

				

			})
		})
	}
})
