window.addEventListener('load', (e) => {
    let searchInput = document.querySelector("#search-input");
    searchInput.addEventListener('change', _e => {
        if (_e) {
            let city = _e.target.value;
            let cityName = document.querySelector("#city-name");
            let weatherStatus = document.querySelector("#weather-status");
            let weatherIcon = document.querySelector("#weather-icon");
            let temperature = document.querySelector("#temperature");
            let sunrise = document.querySelector("#sunrise");
            let sunset = document.querySelector("#sunset");
            let humidity = document.querySelector("#humidity");
            let winSpeed = document.querySelector("#win-speed");
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21f64a715eae4e2931cc32d254f65bbc&units=metric&lang=vi`)
                .then(async (res) => {
                    if (res) {
                        let data = await res.json();
                        if (cityName && weatherStatus && weatherIcon && temperature && sunrise && sunset && humidity && winSpeed) {
                            cityName.innerHTML = data?.name || "_ _";
                            weatherStatus.innerHTML = data?.weather[0]?.description || '_ _';
                            weatherIcon.src = `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png` || '';
                            temperature.innerHTML = data?.main?.temp || '_ _';
                            humidity.innerHTML = data?.main?.humidity + " %" || '_ _ %';
                            winSpeed.innerHTML = data?.wind?.speed + " km/h" || '_ _ km/h';
                            sunrise.innerHTML = moment.unix(data?.sys?.sunrise).format('H:mm') || '_ _';
                            sunset.innerHTML = moment.unix(data?.sys?.sunset).format('H:mm') || '_ _';
                        }
                    }
                }).catch(err => {
                console.log(err);
                if (cityName && weatherStatus && weatherIcon && temperature && sunrise && sunset && humidity && winSpeed) {
                    cityName.innerHTML = "_ _";
                    weatherStatus.innerHTML = '_ _';
                    weatherIcon.src = 'http://openweathermap.org/img/wn/10d@2x.png';
                    temperature.innerHTML = '_ _';
                    humidity.innerHTML = '_ _';
                    winSpeed.innerHTML = '_ _';
                    sunrise.innerHTML = '_ _';
                    sunset.innerHTML = '_ _';
                }
            })
        }
    });
    var synth = window.speechSynthesis;
    let speech = (text) => {
        if (synth.speaking) {
            console.log("busy. Speaking...");
            return;
        }
        let utter = new SpeechSynthesisUtterance(text);
        utter.onend = () => {

        }
        synth.speak(utter);
    }
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.lang = "vi-VI";
    let microPhone = document.getElementById("speech-icon");
    microPhone.addEventListener('click', (e) => {
        e.preventDefault();
        recognition.start();
    });
    recognition.onspeechend = () => {
        recognition.stop();
    }
    recognition.onerror = (err) => {
        console.log(err)
    }
    recognition.onresult = (e) => {
        console.log(e.results[0][0].transcript);
        searchInput.value = e.results[0][0].transcript.toLowerCase();
        speech(e.results[0][0].transcript.toLowerCase());
        searchInput.dispatchEvent(new Event('change'));
    }
});

