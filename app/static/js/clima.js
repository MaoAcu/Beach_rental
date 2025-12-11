class WeatherService {
    constructor() {
        this.cacheDuration = 10 * 60 * 1000; // 10 minutos
        this.cacheKey = 'lionsV8_weather_cache';
    }
    
  
    getCachedWeather() {
        const data = localStorage.getItem(this.cacheKey);
        return data ? JSON.parse(data) : null;
    }

    isCacheExpired(cached) {
        return Date.now() - cached.time > this.cacheDuration;
    }

    saveToCache(data) {
        localStorage.setItem(this.cacheKey, JSON.stringify({
            data,
            time: Date.now()
        }));
    }

    // ---------- FETCH CLIMA ----------
    async getCurrentWeather() {
        try {
            // Revisar caché
            const cached = this.getCachedWeather();
            if (cached && !this.isCacheExpired(cached)) {
                
                return cached.data;
            }

            // Llamar API real
            const response = await fetch(CLIMA_UR);
            if (!response.ok) throw new Error("Error en la respuesta");

            const weatherData = await response.json();

            // Guardar nueva respuesta
            this.saveToCache(weatherData);

            return weatherData;

        } catch (error) {
            console.error("Error obteniendo clima:", error);

          
            return {
                message:"Ocurrio un error "
            };
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const weatherService = new WeatherService();

    try {
        const clima = await weatherService.getCurrentWeather();

        const actual = clima.temperatura;
        const min = clima.minima;
        const max = clima.maxima;
        const descripcion = clima.descripcion;

        // Actualizar footer
        document.getElementById("currentTemp").textContent =
            `°C - Actual ${actual} °C - Maxima ${max}`;

        const icono = document.getElementById("weatherIcon");

        const weatherText = document.getElementById("weatherText");
        const weatherValue = document.getElementById("weatherValue");

        if (weatherText) {
            weatherText.textContent = "";
        }

        if (weatherValue) {
            weatherValue.textContent =
            `°C - Actual ${actual} °C - Máxima ${max} ${descripcion}`;
        }

        if (icono) {
            icono.className = "";
            icono.classList.add("fas");

            if (clima.icono.includes("d") || clima.icono.includes("01"))
                icono.classList.add("fa-sun");
            else if (clima.icono.includes("n"))
                icono.classList.add("fa-moon");
            else
                icono.classList.add("fa-cloud");
        }

    } catch (error) {
        console.error("Error clima:", error);

        document.getElementById("currentTemp").textContent =
            "Clima no disponible";

        const widget = document.querySelector("#weatherWidget span");
        if (widget) widget.textContent = "Clima no disponible";
    }
});

