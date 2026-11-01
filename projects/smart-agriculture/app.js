const $=i=>document.getElementById(i),N=['Ideal','Alerta','Crítico'],C=['ok','alert','crit'];
const cT=t=>t>38||t<15?2:(t>32||t<20?1:0),cS=s=>s<25||s>85?2:(s<40||s>70?1:0);
let h=[],tm=null,t=27,s=55;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function read(){t=clamp(t+(Math.random()-.5)*5,10,45);s=clamp(s+(Math.random()-.55)*10,5,95);
h.push({h:new Date().toLocaleTimeString('pt-BR'),t:+t.toFixed(1),s:+s.toFixed(0)});if(h.length>20)h.shift();draw()}
function rec(){if(s<25)return'Solo muito seco: irrigar imediatamente.';if(s<40)return'Umidade baixa: programar irrigação nas próximas horas.';if(s>85)return'Solo saturado: suspender irrigação e verificar drenagem.';if(s>70)return'Umidade elevada: não irrigar.';if(cT(t)==2)return'Temperatura extrema: avaliar proteção da cultura.';return'Condições adequadas: manter monitoramento sem irrigar.'}
function badge(el,c){el.textContent=N[c];el.className='bd '+C[c]}
function draw(){const a=cT(t),b=cS(s),g=Math.max(a,b);$('vt').textContent=t.toFixed(1)+' °C';$('vs').textContent=s.toFixed(0)+' %';badge($('ct'),a);badge($('cs'),b);
$('vg').textContent=N[g];$('vg').className='big '+C[g];$('rec').textContent=rec();
lineChart($('ch'),[{v:h.map(x=>x.t),c:'#22d3ee'},{v:h.map(x=>x.s),c:'#4ade80'}],0,100,'Histórico simulado de temperatura e umidade');
$('tb').innerHTML=h.slice().reverse().slice(0,8).map(x=>{const k=Math.max(cT(x.t),cS(x.s));return`<tr><td>${x.h}</td><td>${x.t}°C</td><td>${x.s}%</td><td class="${C[k]}">${N[k]}</td></tr>`}).join('')}
for(let i=0;i<12;i++)read();
$('up').onclick=read;
$('au').onclick=()=>{if(tm){clearInterval(tm);tm=null}else tm=setInterval(read,3000);$('au').textContent='Atualização automática: '+(tm?'ligada':'desligada');$('au').setAttribute('aria-pressed',!!tm)};
