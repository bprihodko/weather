


class Weather {
    constructor(date, sunrise, time, humidity, pressure, speed, src,
        temp, feelslike, description, sunset) {
        this.date = date;
        let i = new Date(date * 1000);

        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' })
        const [{ value: dayShort }, , { value: monthShort }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date * 1000);
        this.dateString = monthShort + ' ' + day + ', ' + year + ' - ' + dayShort;
       
        this.time = time;
        let hours = i.getHours();
        let minutes = "0" + i.getMinutes();
        this.formattedTime = hours + ':' + minutes.substr(-2);
        
        this.humidity = humidity,
        this.pressure = pressure,
        this.speed = speed,
        this.src = src,
        this.temp = temp,
        this.feelsLike = feelslike,
        this.description = description,
        this.parent = document.querySelector(".indicators")
    }
    render() {
        let indicator = document.createElement("indicator");
        // indicator.classList.add("col-7");
        indicator.innerHTML = `
        <div class="row">
             <div class="col-7">
                <div class="data">${this.dateString}</div>
                <div class="time">${this.formattedTime}<span></span></div>
                <div class="humidity">Humidity: ${this.humidity} %</div>
                <div class="pressure">Pressure: ${this.pressure} hPA</div>
                <div class="speed"> Wind: ${this.speed} km/h SSE</div>
                </div>
            <div class="col-5">
                <div class="icon">
                <img src="http://openweathermap.org/img/w/${this.src}.png">
                </div>
                <div class="temp">${this.temp} &#176;C</div>
                <div class="feels-like">Feells Like: ${this.feelsLike} &#176;C</div>
                <div class="description">${this.description}</div>
            </div>
        </div>
        `
        this.parent.append(indicator)
    }
}

let city = prompt('Where do you live, bro?', 'Dnipro');
fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=5d066958a60d315387d9492393935c19")
    .then(response => response.json())
    .then(data => {
        new Weather(data.dt, data.sys.sunrise, data.dt, data.main.humidity, data.main.pressure,
            data.wind.speed, data.weather[0].icon, data.main.temp, data.main.feels_like,
            data.weather[0].description, data.sys.sunset
        ).render()
    })


