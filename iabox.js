// iabox.js
(function(){
  if(window.IABox) return;

  window.IABox = {
    init: function(config){
      console.log("IABox iniciado para site:", config.siteId);

      // Criar o balão do chat
      const box = document.createElement('div');
      box.innerHTML = "🤖 IABox ativo - SiteID: " + config.siteId;
      box.style.position = "fixed";
      box.style.bottom = "20px";
      box.style.right = "20px";
      box.style.background = "#2563eb";
      box.style.color = "#fff";
      box.style.padding = "10px 15px";
      box.style.borderRadius = "12px";
      box.style.fontFamily = "Arial, sans-serif";
      box.style.cursor = "pointer";
      box.style.zIndex = "99999";

      box.onclick = () => alert("Abrindo chat IABox para " + config.siteId);

      document.body.appendChild(box);
    }
  };

})();
