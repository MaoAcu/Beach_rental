const uploadArea = document.getElementById("uploadArea")
const fileInput = document.getElementById("fileInput")

if (uploadArea && fileInput) {
  uploadArea.addEventListener("click", () => fileInput.click())

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    uploadArea.style.backgroundColor = "rgba(45, 95, 63, 0.05)"
  })

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.style.backgroundColor = "white"
  })

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    uploadArea.style.backgroundColor = "white"
    handleFiles(e.dataTransfer.files)
  })

  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files)
  })
}

function handleFiles(files) {
  alert(`${files.length} archivo(s) cargado(s) exitosamente`)
}

function deleteImage(id) {
  if (confirm("¿Deseas eliminar esta imagen?")) {
    alert("Imagen eliminada exitosamente")
  }
}

function filterImagesByCabin() {
  alert("Imágenes filtradas")
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-sidebar")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nav = document.querySelector(".sidebar-nav")
      nav.classList.toggle("active")
    })
  }
})
