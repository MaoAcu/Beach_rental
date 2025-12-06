document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-sidebar")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nav = document.querySelector(".sidebar-nav")
      nav.classList.toggle("active")
    })
  }

  // Guardar cambios en precios
  document.querySelectorAll(".season-card .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Cambios guardados exitosamente")
    })
  })
})
