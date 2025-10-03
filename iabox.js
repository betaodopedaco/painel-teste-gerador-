// iabox.js - IABox minimal v1
(function(){
  if(window.IABox && window.IABox.__iabox_version) return;
  window.IABox = window.IABox || {};
  window.IABox.__iabox_version = 'v1';

  window.IABox.init = function(config){
    try {
      if(!config || !config.siteId) console.warn('IABox iniciado sem siteId');

      // evita reinserir UI se já existe para esse siteId
      if(document.querySelector('div.iabox-root[data-siteid="'+(config.siteId||'')+'"]')) return;

      // container com shadow DOM para proteger estilos
      const host = document.createElement('div');
      host.className = 'iabox-root';
      host.setAttribute('data-siteid', config.siteId || '');
      host.style.all = 'initial';
      host.style.zIndex = 999999;

      // attach shadow
      const shadow = host.attachShadow({mode:'open'});
      const outer = document.createElement('div');
      outer.setAttribute('role','dialog');

      // estilos
      const style = document.createElement('style');
      style.textContent = `
        .iabox-btn{position:fixed;bottom:20px;right:20px;background:#2563eb;color:#fff;padding:12px 14px;border-radius:14px;cursor:pointer;font-family:Arial,Helvetica,sans-serif;box-shadow:0 8px 30px rgba(37,99,235,.2)}
        .iabox-box{position:fixed;bottom:80px;right:20px;width:320px;height:420px;background:#fff;border-radius:12px;box-shadow:0 12px 40px rgba(2,6,23,.2);overflow:hidden;font-family:Arial,Helvetica,sans-serif;display:flex;flex-direction:column}
        .iabox-header{padding:10px;background:#111827;color:#fff}
        .iabox-body{padding:12px;flex:1;overflow:auto;background:#f8fafc}
        .iabox-input{display:flex;padding:10px;border-top:1px solid #e6edf6}
        .iabox-input input{flex:1;padding:8px;border-radius:8px;border:1px solid #e2e8f0}
        .iabox-input button{margin-left:8px;padding:8px 10px;border-radius:8px;border:none;background:#2563eb;color:#fff}
        .iabox-close{float:right;cursor:pointer;color:#fff;font-weight:bold}
      `;

      // button
      const openBtn = document.createElement('button');
      openBtn.className = 'iabox-btn';
      openBtn.textContent = '💬 IABox';
      openBtn.onclick = toggleBox;

      // chat box
      const box = document.createElement('div');
      box.className = 'iabox-box';
      box.style.display = 'none';

      const header = document.createElement('div');
      header.className = 'iabox-header';
      header.innerHTML = `<span>IABox</span><span class="iabox-close" title="Fechar">×</span>`;

      const body = document.createElement('div');
      body.className = 'iabox-body';
      body.innerHTML = `<div>Olá — IABox ativo para <strong>${config.siteId||'N/A'}</strong>.</div><div style="margin-top:12px;color:#6b7280">Exemplo de resposta automática. Integre suas respostas reais aqui.</div>`;

      const footer = document.createElement('div');
      footer.className = 'iabox-input';
      const input = document.createElement('input');
      input.placeholder = 'Escreva uma mensagem...';
      const send = document.createElement('button');
      send.textContent = 'Enviar';
      send.onclick = function(){
        if(!input.value) return;
        const m = document.createElement('div');
        m.textContent = 'Você: ' + input.value;
        m.style.marginTop = '8px';
        m.style.fontSize = '14px';
        body.appendChild(m);
        input.value = '';
        body.scrollTop = body.scrollHeight;
      };

      footer.appendChild(input);
      footer.appendChild(send);

      // eventos
      header.querySelector('.iabox-close').onclick = function(){ box.style.display = 'none'; openBtn.style.display = 'block'; };

      function toggleBox(){
        if(box.style.display === 'none' || box.style.display === ''){ box.style.display = 'flex'; openBtn.style.display = 'none'; }
        else { box.style.display = 'none'; openBtn.style.display = 'block'; }
      }

      // montar
      outer.appendChild(style);
      outer.appendChild(openBtn);
      outer.appendChild(box);
      box.appendChild(header);
      box.appendChild(body);
      box.appendChild(footer);
      shadow.appendChild(outer);
      document.documentElement.appendChild(host);

      // posição / theme (simples handling)
      if(config && config.position && config.position.indexOf('left') !== -1){
        openBtn.style.right = 'auto'; openBtn.style.left = '20px';
        box.style.right = 'auto'; box.style.left = '20px';
      }

      console.log('IABox iniciado para siteId:', config.siteId);
    } catch(err){
      console.error('IABox erro:', err);
    }
  };

})();
