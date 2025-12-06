document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-sidebar")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nav = document.querySelector(".sidebar-nav")
      nav.classList.toggle("active")
    })
  }

  // Guardar configuración
  document.querySelectorAll(".settings-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Configuración guardada exitosamente")
    })
  })
})
