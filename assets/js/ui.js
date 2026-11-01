const $=i=>document.getElementById(i);
addEventListener('mousemove',e=>{const s=$('spot').style;s.setProperty('--x',e.clientX+'px');s.setProperty('--y',e.clientY+'px')});
function tick(){$('clk').textContent=new Date().toLocaleTimeString('pt-BR',{timeZone:'America/Fortaleza',hour12:false})+' GMT-3'}
tick();setInterval(tick,1000);
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2800)}
async function copyEmail(){try{await navigator.clipboard.writeText(SITE.email);toast('E-mail copiado!')}catch(e){toast('Copie manualmente: '+SITE.email)}}
document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=copyEmail);
barChart($('tr'),SITE.trello.labels,[{v:SITE.trello.values,c:'#22d3ee'}],'Atividades no quadro Trello do ProdTEA');
