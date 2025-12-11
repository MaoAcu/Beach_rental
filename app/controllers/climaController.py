from flask import Blueprint, jsonify
import requests
from datetime import datetime
import os
#from dotenv import load_dotenv
clima_bp = Blueprint("clima", __name__, url_prefix='/clima')



#oad_dotenv()


LAT=os.getenv('LAT')
LON=os.getenv('LON')
OPENWEATHER_API_KEY=os.getenv('OPENWEATHER_API_KEY')


@clima_bp.route("/G_clima", methods=["GET"])
def GetClima():
    try:
      
        url = (
           f"https://api.openweathermap.org/data/2.5/weather"
           f"?lat={LAT}&lon={LON}&appid={OPENWEATHER_API_KEY}"
           f"&units=metric&lang=es"
        )
        
        response = requests.get(url, timeout=10)
        
        # Validar código HTTP
        if response.status_code != 200:
            return jsonify({
                "error": "Error en OpenWeather",
                "status_code": response.status_code,
                "detalle": response.text
            }), 500

        data = response.json()
       

        clima = {
            "temperatura": round(data["main"]["temp"]),
            "sensacion": round(data["main"]["feels_like"]),
            "minima": round(data["main"]["temp_min"]),
            "maxima": round(data["main"]["temp_max"]),
            "humedad": data["main"]["humidity"],
            "descripcion": data["weather"][0]["description"].capitalize(),
            "icono": data["weather"][0]["icon"],
            "viento": round(data["wind"]["speed"] * 3.6),
            "presion": data["main"]["pressure"],
            "amanecer": datetime.fromtimestamp(data["sys"]["sunrise"]).strftime("%H:%M"),
            "atardecer": datetime.fromtimestamp(data["sys"]["sunset"]).strftime("%H:%M"),
            "actualizado": datetime.now().strftime("%H:%M"),
            "ciudad": data["name"],
            "pais": data["sys"]["country"]
        }
      
        return jsonify(clima)

    except requests.exceptions.Timeout:
        return jsonify({"error": "Timeout al consultar OpenWeather"}), 504

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error de conexión", "detalle": str(e)}), 500

    except Exception as e:
        print(f"Error inesperado en get_clima: {e}")
        return jsonify({"error": "Error interno", "detalle": str(e)}), 500
