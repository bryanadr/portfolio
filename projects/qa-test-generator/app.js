const $=i=>document.getElementById(i);let n=0,txt='';
const lines=v=>v.split('\n').map(x=>x.trim()).filter(Boolean);
$('f').onsubmit=e=>{e.preventDefault();const f=$('n').value.trim(),st=lines($('s').value),ex=$('e').value.trim();
if(!f||!st.length||!ex){$('err').textContent='Informe funcionalidade, ao menos um passo e o resultado esperado.';return}
$('err').textContent='';n++;const pre=lines($('p').value),id='CT-'+String(n).padStart(3,'0');
txt=`ID: ${id}\nFuncionalidade: ${f}\nCenário: ${$('d').value.trim()||'—'}\n\nPRÉ-CONDIÇÕES\n${pre.length?pre.map(x=>'- '+x).join('\n'):'- Nenhuma'}\n\nPASSOS\n${st.map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\nRESULTADO ESPERADO\n${ex}\n\nRESULTADO OBTIDO: ________\nSTATUS: [ ] Aprovado  [ ] Reprovado`;
$('o').textContent=txt;$('cp').disabled=false};
$('cl').onclick=()=>{$('f').reset();$('err').textContent='';txt='';$('o').textContent='Preencha o formulário e clique em Gerar.';$('cp').disabled=true};
$('cp').onclick=async()=>{try{await navigator.clipboard.writeText(txt);$('cp').textContent='Copiado ✓'}catch(e){const r=document.createRange();r.selectNodeContents($('o'));getSelection().removeAllRanges();getSelection().addRange(r);$('cp').textContent='Selecionado: Ctrl+C'}setTimeout(()=>$('cp').textContent='Copiar',2000)};
