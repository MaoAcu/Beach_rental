from flask import Flask

import os
# Genera la clave
def create_app():
    app = Flask(__name__)

    #  Clave secreta para sesiones
    app.secret_key = os.getenv(
        "SECRET_KEY",
        "9a8c7e4f1d2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d"
    )

    

    # Seguridad de cookies
    app.config["SESSION_COOKIE_SECURE"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    from .controllers.routes import routes_bp
    app.register_blueprint(routes_bp)
    return app
