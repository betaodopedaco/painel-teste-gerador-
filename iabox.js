(function () {
  // Evita carregar 2 vezes
  if (window.IABoxLoaded) return;
  window.IABoxLoaded = true;

  // Cria container
  const box = document.createElement("div");
  box.id = "iabox-container";
  box.style.position = "fixed";
  box.style.bottom = "20px";
  box.style.right = "20px";
  box.style.width = "300px";
  box.style.height = "400px";
  box.style.background = "#fff";
  box.style.border = "1px solid #ccc";
  box.style.borderRadius = "10px";
  box.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  box.style.display = "flex";
  box.style.flexDirection = "column";
  box.style.overflow = "hidden";
  box.style.fontFamily = "Arial, sans-serif";
  document.body.appendChild(box);

  // Cabeçalho
  const header = document.createElement("div");
  header.style.background = "#4CAF50";
  header.style.color = "#fff";
  header.style.padding = "10px";
  header.style.fontWeight = "bold";
  header.innerText = "🤖 IABox Chat";
  box.appendChild(header);

  // Área de mensagens
  const messages = document.createElement("div");
  messages.style.flex = "1";
  messages.style.padding = "10px";
  messages.style.overflowY = "auto";
  messages.style.fontSize = "14px";
  box.appendChild(messages);

  // Input
  const inputWrap = document.createElement("div");
  inputWrap.style.display = "flex";
  inputWrap.style.borderTop = "1px solid #ccc";
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Digite sua mensagem...";
  input.style.flex = "1";
  input.style.border = "none";
  input.style.padding = "10px";
  const btn = document.createElement("button");
  btn.innerText = "Enviar";
  btn.style.background = "#4CAF50";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.padding = "10px";
  btn.style.cursor = "pointer";
  inputWrap.appendChild(input);
  inputWrap.appendChild(btn);
  box.appendChild(inputWrap);

  // Função de enviar
  function sendMessage(text, from = "user") {
    const msg = document.createElement("div");
    msg.style.margin = "5px 0";
    msg.style.padding = "8px";
    msg.style.borderRadius = "6px";
    msg.style.maxWidth = "80%";
    msg.style.clear = "both";
    if (from === "user") {
      msg.style.background = "#e1ffc7";
      msg.style.alignSelf = "flex-end";
      msg.innerText = "👤 " + text;
    } else {
      msg.style.background = "#f0f0f0";
      msg.innerText = "🤖 " + text;
    }
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  btn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;
    sendMessage(text, "user");
    input.value = "";

    // Simula resposta da IA (aqui você integra sua lógica de IA real)
    setTimeout(() => {
      sendMessage("Recebi sua mensagem: " + text, "bot");
    }, 600);
  };
})();
