const $=i=>document.getElementById(i),K='bugmgr.v1',L={baixa:'Baixa',media:'Média',alta:'Alta',critica:'Crítica',aberto:'Aberto',andamento:'Em andamento',resolvido:'Resolvido'};
let bugs=[],eid=null;try{bugs=JSON.parse(localStorage.getItem(K))||[]}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(bugs));$('err').textContent=''}catch(e){$('err').textContent='Não foi possível salvar no navegador (armazenamento indisponível).'}};
function render(){const q=$('q').value.toLowerCase(),s=$('fs').value,v=$('fv').value;
const r=bugs.filter(b=>b.t.toLowerCase().includes(q)&&(!s||b.st==s)&&(!v||b.sv==v));
$('ls').innerHTML=r.length?r.map(b=>`<div class="item"><div style="flex:1;min-width:200px"><h3>#${b.id} ${esc(b.t)}</h3><p class="m" style="margin:0 0 6px">${esc(b.d)}</p><span class="bd ${b.sv}">Sev: ${L[b.sv]}</span> <span class="bd ${b.pr}">Prio: ${L[b.pr]}</span> <span class="bd ${b.st}">${L[b.st]}</span></div><div class="row" style="align-items:start"><button class="btn" data-e="${b.id}">Editar</button><button class="btn d" data-x="${b.id}">Excluir</button></div></div>`).join(''):`<p class="m" style="padding:16px 0">${bugs.length?'Nenhum bug corresponde aos filtros.':'Nenhum bug cadastrado.'}</p>`}
function reset(){eid=null;$('f').reset();$('ft').textContent='Novo bug';$('cn').hidden=true;$('err').textContent=''}
$('f').onsubmit=e=>{e.preventDefault();const t=$('t').value.trim(),d=$('d').value.trim();
if(t.length<3||!d){$('err').textContent='Título (mín. 3 caracteres) e descrição são obrigatórios.';return}
const o={t,d,sv:$('sv').value,pr:$('pr').value,st:$('st').value};
if(eid){Object.assign(bugs.find(b=>b.id==eid),o)}else bugs.push({id:(bugs.reduce((m,b)=>Math.max(m,b.id),0))+1,...o});
save();reset();render()};
$('cn').onclick=reset;['q','fs','fv'].forEach(i=>$(i).oninput=render);
$('ls').onclick=e=>{const x=e.target.dataset.x,ed=e.target.dataset.e;
if(x&&confirm('Excluir este bug?')){bugs=bugs.filter(b=>b.id!=x);save();render()}
if(ed){const b=bugs.find(b=>b.id==ed);eid=b.id;$('t').value=b.t;$('d').value=b.d;$('sv').value=b.sv;$('pr').value=b.pr;$('st').value=b.st;$('ft').textContent='Editando #'+b.id;$('cn').hidden=false;$('t').focus()}};
render();
