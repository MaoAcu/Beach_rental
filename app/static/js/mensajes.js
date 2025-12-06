function selectConversation(element, conversationId) {
  document.querySelectorAll(".conversation-item").forEach((item) => {
    item.classList.remove("active")
  })
  element.classList.add("active")
}

function sendMessage() {
  const messageInput = document.getElementById("messageInput")
  const messageText = messageInput.value.trim()

  if (messageText) {
    const messagesContainer = document.getElementById("messagesContainer")
    const newMessage = document.createElement("div")
    newMessage.className = "message admin"
    newMessage.innerHTML = `
            <p>${messageText}</p>
            <span class="time">Ahora</span>
        `
    messagesContainer.appendChild(newMessage)
    messageInput.value = ""
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
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
