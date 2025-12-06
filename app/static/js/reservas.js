// Datos de ejemplo
const bookingsData = [
  {
    id: 1,
    name: "Juan García",
    email: "juan@email.com",
    cabin: "Cabaña Pino",
    checkin: "15/12/2024",
    checkout: "17/12/2024",
    guests: 2,
    total: 450,
    phone: "+34 123 456 789",
  },
  {
    id: 2,
    name: "María López",
    email: "maria@email.com",
    cabin: "Cabaña Roble",
    checkin: "18/12/2024",
    checkout: "20/12/2024",
    guests: 4,
    total: 500,
    phone: "+34 987 654 321",
  },
  {
    id: 3,
    name: "Carlos Martín",
    email: "carlos@email.com",
    cabin: "Cabaña Cedro",
    checkin: "21/12/2024",
    checkout: "23/12/2024",
    guests: 3,
    total: 480,
    phone: "+34 555 666 777",
  },
]

function viewDetails(id) {
  const booking = bookingsData.find((b) => b.id === id)
  if (booking) {
    document.getElementById("detailName").textContent = booking.name
    document.getElementById("detailEmail").textContent = booking.email
    document.getElementById("detailPhone").textContent = booking.phone
    document.getElementById("detailCabin").textContent = booking.cabin
    document.getElementById("detailDates").textContent = `${booking.checkin} - ${booking.checkout}`
    document.getElementById("detailGuests").textContent = booking.guests
    document.getElementById("detailTotal").textContent = `$${booking.total}`

    document.getElementById("detailsModal").classList.add("active")
  }
}

function closeModal() {
  document.getElementById("detailsModal").classList.remove("active")
}

function approveBooking() {
  alert("Reserva aprobada exitosamente")
  closeModal()
}

function rejectBooking() {
  alert("Reserva rechazada")
  closeModal()
}

// Cerrar modal al hacer clic fuera
document.addEventListener("click", (e) => {
  const modal = document.getElementById("detailsModal")
  if (e.target === modal) {
    closeModal()
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-sidebar")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nav = document.querySelector(".sidebar-nav")
      nav.classList.toggle("active")
    })
  }
})
