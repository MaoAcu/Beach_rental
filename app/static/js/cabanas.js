function openCabinModal() {
  document.getElementById("cabinModal").classList.add("active")
}

function closeCabinModal() {
  document.getElementById("cabinModal").classList.remove("active")
}

function editCabin(id) {
  document.getElementById("cabinModalTitle").textContent = "Editar Cabaña"
  openCabinModal()
}

function deleteCabin(id) {
  if (confirm("¿Estás seguro que deseas eliminar esta cabaña?")) {
    alert("Cabaña eliminada exitosamente")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cabinForm").addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Cabaña guardada exitosamente")
    closeCabinModal()
  })

  // Cerrar modal al hacer clic fuera
  document.addEventListener("click", (e) => {
    const modal = document.getElementById("cabinModal")
    if (e.target === modal) {
      closeCabinModal()
    }
  })

  const toggleBtn = document.querySelector(".toggle-sidebar")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nav = document.querySelector(".sidebar-nav")
      nav.classList.toggle("active")
    })
  }
})
