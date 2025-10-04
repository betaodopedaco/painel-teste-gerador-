// iabox.js - IABox minimal (coloque na raiz do repo como /iabox.js)
(function(){
  // evita carregar 2x
  if(window.IABoxLoaded) return;
  window.IABoxLoaded = true;

  // cria uma função globalia para possível uso externo
  window.IABox = window.IABox || {};
  window.IABox.__version = 'v1';

  window.IABox.init = function(config){
    try {
      var siteId = (config && config.siteId) ? config.siteId : 'unknown';

      // evita reinserir com mesmo siteId
      if(document.querySelector('#iabox-root[data-siteid="'+siteId+'"]')) return;

      // root host
      var host = document.createElement('div');
      host.id = 'iabox-root';
      host.setAttribute('data-siteid', siteId);
      host.style.all = 'initial';
      host.style.position = 'fixed';
      host.style.zIndex = 2147483647; // máximo

      // shadow DOM para evitar conflito de CSS
      var shadow = host.attachShadow({mode:'open'});

      // markup
      var style = document.createElement('style');
      style.textContent = '\
        .iabox-btn{position:fixed;bottom:20px;right:20px;background:#2563eb;color:#fff;padding:12px 14px;border-radius:16px;cursor:pointer;font-family:Arial,Helvetica,sans-serif;box-shadow:0 8px 30px rgba(37,99,235,.18);border:none}\
        .iabox-panel{position:fixed;bottom:80px;right:20px;width:320px;height:420px;background:#fff;border-radius:12px;box-shadow:0 12px 40px rgba(2,6,23,.2);display:flex;flex-direction:column;overflow:hidden;font-family:Arial,Helvetica,sans-serif}\
        .iabox-header{padding:10px;background:#111827;color:#fff;font-weight:600;display:flex;justify-content:space-between;align-items:center}\
        .iabox-body{padding:12px;flex:1;overflow:auto;background:#f8fafc}\
        .iabox-footer{display:flex;padding:10px;border-top:1px solid #e6edf6}\
        .iabox-footer input{flex:1;padding:8px;border-radius:8px;border:1px solid #e2e8f0}\
        .iabox-footer button{margin-left:8px;padding:8px 10px;border-radius:8px;border:none;background:#2563eb;color:#fff;cursor:pointer}\
      ';

      // button open
      var openBtn = document.createElement('button');
      openBtn.className = 'iabox-btn';
      openBtn.textContent = '💬 IABox';
      openBtn.onclick = togglePanel;

      // panel
      var panel = document.createElement('div');
      panel.className = 'iabox-panel';
      panel.style.display = 'none';

      var header = document.createElement('div');
      header.className = 'iabox-header';
      header.innerHTML = '<span>IABox</span><span style="cursor:pointer" id="iabox-close">×</span>';

      var body = document.createElement('div');
      body.className = 'iabox-body';
      body.innerHTML = '<div style="color:#374151">Olá — IABox ativo para <strong>' + siteId + '</strong>.</div><div style="margin-top:10px;color:#6b7280">Resposta de exemplo. Integre sua lógica de backend/AI aqui.</div>';

      var footer = document.createElement('div');
      footer.className = 'iabox-footer';
      var input = document.createElement('input');
      input.placeholder = 'Digite sua mensagem...';
      var send = document.createElement('button');
      send.textContent = 'Enviar';
      footer.appendChild(input);
      footer.appendChild(send);

      panel.appendChild(header);
      panel.appendChild(body);
      panel.appendChild(footer);

      // append styles + nodes to shadow
      shadow.appendChild(style);
      shadow.appendChild(openBtn);
      shadow.appendChild(panel);

      // add host to DOM
      document.documentElement.appendChild(host);

      // events
      shadow.getElementById('iabox-close').onclick = function(){
        panel.style.display = 'none';
        openBtn.style.display = 'block';
      };

      send.onclick = function(){
        var text = input.value && input.value.trim();
        if(!text) return;
        var el = document.createElement('div');
        el.style.marginTop = '8px';
        el.style.padding = '8px';
        el.style.background = '#e1ffc7';
        el.style.borderRadius = '8px';
        el.textContent = 'Você: ' + text;
        body.appendChild(el);
        input.value = '';
        body.scrollTop = body.scrollHeight;

        // simulate resposta
        setTimeout(function(){
          var r = document.createElement('div');
          r.style.marginTop = '8px';
          r.style.padding = '8px';
          r.style.background = '#f0f0f0';
          r.style.borderRadius = '8px';
          r.textContent = 'IA: Recebi "' + text + '"';
          body.appendChild(r);
          body.scrollTop = body.scrollHeight;
        }, 600);
      };

      function togglePanel(){
        if(panel.style.display === 'none' || panel.style.display === ''){
          panel.style.display = 'flex';
          openBtn.style.display = 'none';
        } else {
          panel.style.display = 'none';
          openBtn.style.display = 'block';
        }
      }

      // allow external open
      window.IABox.open = togglePanel;

    } catch (err) {
      console.error('IABox error:', err);
    }
  };

  // auto-init fallback (não obrigatório) -> apenas se desejar inicializar sem init()
  // window.IABox.init && window.IABox.init({siteId:'auto-' + Math.random().toString(36).slice(2,6)});
})();
