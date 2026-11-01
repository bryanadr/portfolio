const $=i=>document.getElementById(i),K='finance.v1',R=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const CAT={receita:['Salário','Freelance','Investimentos','Outros'],despesa:['Moradia','Alimentação','Transporte','Lazer','Saúde','Educação','Outros']};
let tx=[];try{tx=JSON.parse(localStorage.getItem(K))||[]}catch(e){}
const loc=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;$('dt').value=loc(new Date());
function cats(){$('ct').innerHTML=CAT[$('ty').value].map(c=>`<option>${c}</option>`).join('')}cats();$('ty').onchange=cats;
const persist=()=>{try{localStorage.setItem(K,JSON.stringify(tx));$('err').textContent=''}catch(x){$('err').textContent='Não foi possível salvar no navegador.'}};
function render(){const m=loc(new Date()).slice(0,7),sum=(t,p)=>tx.filter(x=>x.ty==t&&(!p||x.dt.startsWith(p))).reduce((a,x)=>a+x.vl,0);
const sd=sum('receita')-sum('despesa');$('sd').textContent=R(sd);$('sd').style.color=sd<0?'var(--r)':'var(--t)';$('rm').textContent=R(sum('receita',m));$('dm').textContent=R(sum('despesa',m));
const ms=[],n=new Date();for(let i=5;i>=0;i--){ms.push(loc(new Date(n.getFullYear(),n.getMonth()-i,1)).slice(0,7))}
barChart($('ch'),ms.map(k=>k.slice(5)+'/'+k.slice(2,4)),[{v:ms.map(k=>sum('receita',k)),c:'#4ade80'},{v:ms.map(k=>sum('despesa',k)),c:'#f87171'}],'Receitas e despesas mensais');
$('hs').innerHTML=tx.length?tx.slice().sort((a,b)=>b.dt.localeCompare(a.dt)).map(x=>`<div class="item"><div><b>${esc(x.ds)}</b><br><span class="m">${x.dt.split('-').reverse().join('/')} · ${esc(x.ct)}</span></div><div class="row"><b class="${x.ty}">${x.ty=='despesa'?'−':'+'}${R(x.vl)}</b><button class="btn d" data-x="${x.id}" aria-label="Excluir ${esc(x.ds)}">Excluir</button></div></div>`).join(''):'<p class="m">Nenhuma movimentação registrada.</p>'}
$('f').onsubmit=e=>{e.preventDefault();const ds=$('ds').value.trim(),vl=parseFloat($('vl').value),dt=$('dt').value;
if(!ds||!(vl>0)||!dt){$('err').textContent='Informe descrição, valor maior que zero e data.';return}
tx.push({id:Date.now(),ty:$('ty').value,ds,vl:Math.round(vl*100)/100,ct:$('ct').value,dt});persist();$('ds').value='';$('vl').value='';render()};
$('hs').onclick=e=>{const x=e.target.dataset.x;if(x&&confirm('Excluir movimentação?')){tx=tx.filter(t=>t.id!=x);persist();render()}};
render();
