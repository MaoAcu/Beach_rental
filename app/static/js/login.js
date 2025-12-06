document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const remember = document.getElementById("remember").checked

  // Validación simple
  if (email === "admin@test.com" && password === "123456") {
    // Guardar sesión
    localStorage.setItem(
      "userSession",
      JSON.stringify({
        email: email,
        name: "Admin",
        loggedIn: true,
      }),
    )

    // Redirigir al dashboard
    window.location.href = DASHBOARD_UR 
  } else {
    
  }
})

// Verificar si hay sesión activa
window.addEventListener("load", () => {
  const session = localStorage.getItem("userSession")
  if (!session && window.location.pathname !== "/index.html") {
    // Si no hay sesión y no estamos en login, redirigir
  }
})
