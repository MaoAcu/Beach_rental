from functools import wraps
from flask import session, redirect, url_for, flash , request


#este metodo se usa para que si no se ha incioado sesion no se pueda navegar por las paginas 
def loginRequired(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        #valida si existe una sesion con ese nombre sino lo envia al login 
        if "usuario" not in session:
            flash("Debes iniciar sesión primero.", "warning")
            return redirect(url_for("auth.login"))
        return f(*args, **kwargs)
    return decorated_function
