(()=>{const s=$('scr'),i=$('cmd');
const add=(t,c)=>{const p=document.createElement('p');p.textContent=t;if(c)p.className=c;s.appendChild(p);s.scrollTop=s.scrollHeight};
function run(v){v=v.trim().toLowerCase();if(!v)return;add('$ '+v,'cm');
if(v==='clear')s.innerHTML='';else if(Object.hasOwn(SITE.commands,v))add(SITE.commands[v]);else add('Comando "'+v+'" desconhecido. Digite help.','er')}
$('tf').onsubmit=e=>{e.preventDefault();run(i.value);i.value=''};
s.onclick=e=>{const c=e.target.dataset.cmd;if(c)run(c)}})();
