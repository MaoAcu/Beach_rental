document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-sidebar")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nav = document.querySelector(".sidebar-nav")
      nav.classList.toggle("active")
    })
  }

  // Cambiar avatar
  const changeAvatarBtn = document.getElementById("changeAvatarBtn")
  const avatarInput = document.getElementById("avatarInput")

  if (changeAvatarBtn && avatarInput) {
    changeAvatarBtn.addEventListener("click", () => avatarInput.click())
    avatarInput.addEventListener("change", () => {
      alert("Avatar actualizado exitosamente")
    })
  }

  // Guardar cambios de perfil
  document.querySelectorAll(".profile-form").forEach((form) => {
    const buttons = form.querySelectorAll("button")
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        alert("Cambios guardados exitosamente")
      })
    })
  })

  // Eliminar cuenta
  const deleteAccountBtn = document.getElementById("deleteAccountBtn")
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", () => {
      if (confirm("¿Estás seguro? Esta acción es irreversible.")) {
        alert("Cuenta eliminada")
        localStorage.removeItem("userSession")
        window.location.href = "index.html"
      }
    })
  }
})
