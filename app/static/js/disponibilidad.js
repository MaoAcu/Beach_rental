const currentMonth = new Date()
let currentCabin = "1"

function generateCalendar() {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const calendar = document.getElementById("calendar")
  calendar.innerHTML = ""

  const monthName = currentMonth.toLocaleString("es-ES", { month: "long", year: "numeric" })
  document.getElementById("currentMonth").textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1)

  // Días de semana
  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
  daysOfWeek.forEach((day) => {
    const dayEl = document.createElement("div")
    dayEl.textContent = day
    dayEl.style.fontWeight = "bold"
    dayEl.style.textAlign = "center"
    dayEl.style.padding = "10px"
    calendar.appendChild(dayEl)
  })

  // Espacios vacíos al inicio
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendar.appendChild(document.createElement("div"))
  }

  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement("div")
    dayEl.textContent = day
    dayEl.style.textAlign = "center"
    dayEl.style.padding = "15px"
    dayEl.style.border = "1px solid #ddd"
    dayEl.style.cursor = "pointer"

    // Colores según disponibilidad (simulado)
    const random = Math.random()
    if (random > 0.7) {
      dayEl.style.backgroundColor = "#4CAF50" // Disponible
      dayEl.style.color = "white"
    } else if (random > 0.4) {
      dayEl.style.backgroundColor = "#F44336" // Ocupado
      dayEl.style.color = "white"
    } else if (random > 0.2) {
      dayEl.style.backgroundColor = "#FFC107" // Última noche
      dayEl.style.color = "#333"
    }

    calendar.appendChild(dayEl)
  }
}

function previousMonth() {
  currentMonth.setMonth(currentMonth.getMonth() - 1)
  generateCalendar()
}

function nextMonth() {
  currentMonth.setMonth(currentMonth.getMonth() + 1)
  generateCalendar()
}

function changeCalendarCabin() {
  currentCabin = document.getElementById("cabinSelect").value
  generateCalendar()
}

document.addEventListener("DOMContentLoaded", () => {
  generateCalendar()

  const toggleBtn = document.querySelector(".toggle-sidebar")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nav = document.querySelector(".sidebar-nav")
      nav.classList.toggle("active")
    })
  }
})
