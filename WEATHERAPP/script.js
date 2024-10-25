let cityInput = document.querySelector("input#cityInput");
let btn = document.querySelector("button#searchButton");
let cityName = document.querySelector("h2#cityName");
let weatherIcon = document.querySelector("img#weatherIcon");
let temp = document.querySelector("span#temp");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");

// Function to fetch weather data
async function fetchData(city) {
    // Get the city name and trim whitespace
    if (city) {
        try {
            const apiKey = 'eea091fc0bc944b28e6e42c271833674';
            let response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&units=M`);

            // Check if the response is OK (status code 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let data = await response.json();
            console.log(data.data[0]);

            // Display the weather data
            cityName.textContent = data.data[0].city_name;

            let iconCode = data.data[0].weather.icon;
            weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;

            temp.textContent = `${data.data[0].temp}°C`;
            wind.textContent = `Wind Speed: ${data.data[0].wind_spd} km/h`;
            humidity.textContent = `Humidity: ${data.data[0].rh}%`;

            // Store the last searched city in local storage
            localStorage.setItem("lastCity", data.data[0].city_name);
        } catch (err) {
            console.log(err);
            cityInput.placeholder = "Error fetching data"; // Inform the user about the error
        }
    } else {
        cityInput.placeholder = "Please Enter A city name"; 
    }
}

// Check local storage for last searched city on page load
window.onload = () => {
    const lastCity = localStorage.getItem("lastCity"); // Retrieve last city from local storage
    if (lastCity) {
        fetchData(lastCity); // Fetch and display the weather for the last searched city
    }
};

// Event listener for the search button
btn.addEventListener("click", async () => {
    let city = cityInput.value.trim(); // Get the city name and trim whitespace
    fetchData(city); // Fetch weather data for the entered city
});
