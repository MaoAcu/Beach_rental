// Verificar sesión al cargar
window.addEventListener("load", () => {
  const session = localStorage.getItem("userSession")
  if (!session) {
    window.location.href = "index.html"
  }
})

// Simular gráficas con Canvas
function initCharts() {
  // Gráfica de Ingresos
  const ctx1 = document.getElementById("incomesChart")
  if (ctx1) {
    const canvas1 = ctx1.getContext("2d")
    drawLineChart(canvas1, [1200, 1900, 2500, 2200, 2800, 3200], "Ingresos")
  }

  // Gráfica de Ocupación
  const ctx2 = document.getElementById("occupancyChart")
  if (ctx2) {
    const canvas2 = ctx2.getContext("2d")
    drawBarChart(canvas2, ["Pino", "Roble", "Cedro"], [75, 85, 72])
  }
}

function drawLineChart(ctx, data, label) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  const padding = 40

  // Limpiar canvas
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, width, height)

  // Dibujar ejes
  ctx.strokeStyle = "#ccc"
  ctx.beginPath()
  ctx.moveTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.stroke()

  // Dibujar línea de datos
  const maxValue = Math.max(...data)
  const pointSpacing = (width - 2 * padding) / (data.length - 1)

  ctx.strokeStyle = "#2d5f3f"
  ctx.lineWidth = 2
  ctx.beginPath()

  data.forEach((value, index) => {
    const x = padding + index * pointSpacing
    const y = height - padding - (value / maxValue) * (height - 2 * padding)

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()
}

function drawBarChart(ctx, labels, values) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  const padding = 40

  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, width, height)

  const barWidth = (width - 2 * padding) / labels.length
  const maxValue = Math.max(...values)

  values.forEach((value, index) => {
    const x = padding + index * barWidth + barWidth / 4
    const barHeight = (value / maxValue) * (height - 2 * padding)
    const y = height - padding - barHeight

    ctx.fillStyle = "#2d5f3f"
    ctx.fillRect(x, y, barWidth / 2, barHeight)

    ctx.fillStyle = "#333"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(labels[index], x + barWidth / 4, height - padding + 20)
  })
}

// Logout
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector(".logout")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("userSession")
      window.location.href = "index.html"
    })
  }

  // Toggle sidebar en móvil
  const toggleBtn = document.querySelector(".toggle-sidebar")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nav = document.querySelector(".sidebar-nav")
      nav.classList.toggle("active")
    })
  }

  initCharts()
})
