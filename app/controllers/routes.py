from flask import Blueprint, render_template
import os
from .decorators import loginRequired

routes_bp = Blueprint("routes", __name__)



@routes_bp.route('/')
def index():
    return render_template('login.html')

@routes_bp.route("/cabanas", endpoint="cabanas")
def Cabanas():
    return render_template("cabanas.html")

@routes_bp.route("/configuracion", endpoint="config")
def Configuracion():
    return render_template("configuracion.html")

@routes_bp.route("/dashBoard", endpoint="dashB")
def DashBoard():
    return render_template("dashboard.html")

@routes_bp.route("/disponibilidad", endpoint="disponibilidad")
def Disponibilidad():
    return render_template("disponibilidad.html")

@routes_bp.route("/estadisticas", endpoint="ver_estadisticas")
def VerEstadisticas():
    return render_template("estadisticas.html")

@routes_bp.route("/imagenes", endpoint="image")
def Imagenes():
    return render_template("imagenes.html")

@routes_bp.route("/mensaje", endpoint="message")
def Mensajes():
    return render_template("mensajes.html")

@routes_bp.route("/perfil", endpoint="profile")
def Perfil():
    return render_template("perfil.html")

@routes_bp.route("/precios", endpoint="price")
def Precios():
    return render_template("precios.html")

@routes_bp.route("/reservas", endpoint="reserve")
def Reservas():
    return render_template("reservas.html")