# 🤖 IABox - Chatbot Embeddable

Um sistema de chatbox inteligente que pode ser embedado em qualquer site com apenas uma linha de código.

## ✨ Funcionalidades

- ✅ Fácil integração (apenas 1 linha de código)
- ✅ Chatbox responsiva e customizável
- ✅ Bookmarklet para testes rápidos
- ✅ Multi-site support
- ✅ Deploy automático na Vercel

## 🚀 Como usar

### 1. Para desenvolvedores de sites:
```html
<!-- Cole isto antes do </body> -->
<script>
(function(w,d){
  if(w.__iabox_loaded)return;
  w.__iabox_loaded=true;
  var s=d.createElement("script");
  s.src="https://seu-projeto.vercel.app/iabox.js";
  s.async=true;
  s.onload=function(){
    if(window.IABox&&window.IABox.init)
      window.IABox.init({siteId:"seu-site-id"});
  };
  d.body.appendChild(s);
})(window,document);
</script>
