function changePeriod() {
  alert("Período actualizado")
}

function exportPDF() {
  alert("Descargando reporte en PDF...")
}

function exportExcel() {
  alert("Descargando reporte en Excel...")
}

// Simular gráficas
function initCharts() {
  const chartIds = ["revenueChart", "occupancyChart", "statusChart", "cabinRevenueChart"]

  chartIds.forEach((id) => {
    const ctx = document.getElementById(id)
    if (ctx) {
      const canvas = ctx.getContext("2d")
      drawSimpleChart(canvas)
    }
  })
}

function drawSimpleChart(ctx) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  ctx.fillStyle = "#2d5f3f"
  ctx.fillRect(20, 20, width - 40, height - 40)

  ctx.fillStyle = "white"
  ctx.font = "14px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Gráfica de Datos", width / 2, height / 2)
}

document.addEventListener("DOMContentLoaded", () => {
  initCharts()

  const toggleBtn = document.querySelector(".toggle-sidebar")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nav = document.querySelector(".sidebar-nav")
      nav.classList.toggle("active")
    })
  }
})
