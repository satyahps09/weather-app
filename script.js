
const search = document.querySelector(".search"),
    inputField = search.querySelector("input"),
    informationText = document.querySelector(".information-text"),
    locationButton = document.querySelector("button"),
    temperature = document.getElementById("text"),
    city = document.querySelector(".city"),
    humidity = document.getElementById("humidity"),
    wind = document.getElementById("wind"),
    minTemp = document.getElementById("min-temp"),
    maxTemp = document.getElementById("max-temp"),
    clouds = document.getElementById("clouds"),
    button = document.getElementById("button");

    let api;

search.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

button.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("your browser dont support geolocation function");
    }
});

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=57aec86a380147606981ff103ee83d33`;
    fetchData();
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=57aec86a380147606981ff103ee83d33`;
    fetchData();

}

function onError(error) {
    alert("error");
}

function fetchData() {
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            city.innerHTML = data.name;
            let tempValue = data.main.temp;
            temperature.innerHTML = tempValue > 273 ? ((tempValue.toFixed()) - 273) : (tempValue.toFixed());
            humidity.innerHTML = data.main.humidity;
            wind.innerHTML = data.wind.speed;
            minTemp.innerHTML = data.main.temp_min > 273 ? ((data.main.temp_min.toFixed()) - 273) : (data.main.temp_min);
            maxTemp.innerHTML = data.main.temp_max > 273 ? ((data.main.temp_max.toFixed()) - 273) : (data.main.temp_max);
            clouds.textContent =data.weather[0].description;
        });
       
}
