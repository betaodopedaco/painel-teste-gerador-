#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando criação do projeto IABox...${NC}"

# 1️⃣ Criar pasta e entrar nela
echo -e "${YELLOW}1. Criando pasta iabox-painel...${NC}"
mkdir iabox-painel && cd iabox-painel

# 2️⃣ Criar index.html
echo -e "${YELLOW}2. Criando index.html...${NC}"
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>IABox - Painel</title>
<style>
body{font-family:Arial,sans-serif;padding:30px;background:#f5f5f5;}
h1{color:#333;}
textarea{width:100%;height:120px;margin-top:10px;padding:10px;font-size:14px;}
button{margin-top:10px;padding:10px 20px;font-size:14px;cursor:pointer;}
a.book{display:inline-block;margin-top:20px;background:#4CAF50;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;}
</style>
</head>
<body>
<h1>🚀 IABox - Painel</h1>
<p>Copie o código abaixo e cole no seu site antes de &lt;/body&gt;:</p>
<textarea id="codigo" readonly></textarea><br>
<button id="btnCopy">📋 Copiar código</button>
<a id="dragBtn" class="book" href="#">IABox 🚀 (arraste-me)</a>
<script>
const SCRIPT_URL = "https://SEU-PROJETO.vercel.app/iabox.js";
function copyText(id){
  const el=document.getElementById(id);
  navigator.clipboard.writeText(el.value||el.innerText).then(()=>{alert("Copiado!")});
}
function gerarSnippet(){
  const siteId='site-'+Math.random().toString(36).slice(2,8);
  const snippet='<script>(function(w,d){if(w.__iabox_loaded)return;w.__iabox_loaded=true;var s=d.createElement("script");s.src="'+SCRIPT_URL+'";s.async=true;s.onload=function(){if(window.IABox&&window.IABox.init)window.IABox.init({siteId:"'+siteId+'"});};d.body.appendChild(s);})(window,document);</script>';
  document.getElementById("codigo").value=snippet;
  document.getElementById("dragBtn").href='javascript:(function(){var s=document.createElement("script");s.src="'+SCRIPT_URL+'";document.body.appendChild(s);})();';
}
document.getElementById("btnCopy").addEventListener("click",()=>copyText("codigo"));
gerarSnippet();
</script>
</body>
</html>
EOF

# 3️⃣ Criar iabox.js
echo -e "${YELLOW}3. Criando iabox.js...${NC}"
cat > iabox.js << 'EOF'
(function(){if(window.IABoxLoaded)return;window.IABoxLoaded=true;
window.IABox={init:function(config){var siteId=config.siteId||'unknown';
if(document.querySelector('#iabox-root[data-siteid="'+siteId+'"]'))return;
var host=document.createElement('div');host.id='iabox-root';host.setAttribute('data-siteid',siteId);
host.style.position='fixed';host.style.bottom='20px';host.style.right='20px';host.style.width='300px';host.style.height='400px';host.style.background='#fff';host.style.border='1px solid #ccc';host.style.borderRadius='10px';host.style.boxShadow='0 4px 10px rgba(0,0,0,0.2)';host.style.fontFamily='Arial,sans-serif';host.style.display='flex';host.style.flexDirection='column';document.body.appendChild(host);
var header=document.createElement('div');header.style.background='#4CAF50';header.style.color='#fff';header.style.padding='10px';header.style.fontWeight='bold';header.innerText='🤖 IABox Chat';host.appendChild(header);
var messages=document.createElement('div');messages.style.flex='1';messages.style.padding='10px';messages.style.overflowY='auto';host.appendChild(messages);
var inputWrap=document.createElement('div');inputWrap.style.display='flex';inputWrap.style.borderTop='1px solid #ccc';
var input=document.createElement('input');input.type='text';input.placeholder='Digite sua mensagem...';
var btn=document.createElement('button');btn.innerText='Enviar';inputWrap.appendChild(input);inputWrap.appendChild(btn);host.appendChild(inputWrap);
btn.onclick=function(){var t=input.value.trim();if(!t)return;var m=document.createElement('div');m.style.margin='5px 0';m.style.padding='8px';m.style.background='#e1ffc7';m.style.borderRadius='6px';m.innerText='Você: '+t;messages.appendChild(m);input.value='';messages.scrollTop=messages.scrollHeight;setTimeout(function(){var r=document.createElement('div');r.style.margin='5px 0';r.style.padding='8px';r.style.background='#f0f0f0';r.style.borderRadius='6px';r.innerText='IA: Recebi "'+t+'"';messages.appendChild(r);messages.scrollTop=messages.scrollHeight;},600);};
}})();
EOF

# 4️⃣ Inicializar Git
echo -e "${YELLOW}4. Inicializando repositório Git...${NC}"
git init
git add .
git commit -m "Initial commit: painel IABox + script"

echo -e "${GREEN}✅ Projeto criado com sucesso!${NC}"
echo ""
echo -e "${YELLOW}📝 Próximos passos:${NC}"
echo -e "1. ${GREEN}cd iabox-painel${NC}"
echo -e "2. Crie um repositório no GitHub e execute:"
echo -e "   ${GREEN}git remote add origin https://github.com/SEU-USER/SEU-REPO.git${NC}"
echo -e "   ${GREEN}git branch -M main${NC}"
echo -e "   ${GREEN}git push -u origin main${NC}"
echo -e "3. Faça deploy na Vercel:"
echo -e "   - Acesse ${GREEN}https://vercel.com${NC}"
echo -e "   - Importe o repositório"
echo -e "   - Deploy automático!"
echo ""
echo -e "${YELLOW}⚠️ Lembre-se de:${NC}"
echo -e "- Substituir ${GREEN}SEU-PROJETO${NC} pela URL da Vercel no index.html"
echo -e "- Testar o bookmarklet (arrastar o botão para a barra de favoritos)"
