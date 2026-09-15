import { guides, themes } from "./data.js";
import { registerD01 } from "./data-d01.js";

registerD01(guides, themes);

(() => {
 const root=document.getElementById('dados-guides-review');
 const $=s=>root.querySelector(s);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normal=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[.?]$/,'').trim();
 const themeForCode=code=>themes.find(t=>t.guides.includes(code));
 const guideIndex=code=>guides.findIndex(g=>g.code===code);
 const guideOptions=()=>themes.map(t=>`<optgroup label="${esc(t.title)}">${t.guides.map(code=>guideIndex(code)).filter(i=>i>=0).map(i=>`<option value="${i}">${esc(guides[i].title)}</option>`).join('')}</optgroup>`).join('');
 const state={guide:guides.findIndex(g=>g.code==='D03'),ficha:-1,home:true};
 const design={showMedia:true,grid:'Cartões'};
 const related={D01:['D13','D14'],D03:['D05','D06','D07'],D04:['D05','D07'],D05:['D03','D07'],D06:['D03','D07'],D07:['D05','CM'],CM:['D07','D05'],D08:['D03','D04'],D09:['D03','D04'],D10:['D02','D07'],D11:['D13','D12'],D12:['D03','D14'],D13:['D01','D02','D11','D14']};
 $('#dg-guide').innerHTML=guideOptions();
 $('.dg-all').textContent='Ver todos os temas';
 function nav(){
  const g=guides[state.guide]; $('#dg-guide').value=state.guide;
  $('.dg-side-title').textContent=g.title;
  $('nav').before($('.dg-side-title'));
  $('nav').classList.remove('dg-home-theme-nav');
  $('nav').innerHTML=[{title:'Visão geral'},...g.fichas].map((f,i)=>`<button type="button" class="dg-nav-item" data-ficha="${i-1}" ${state.ficha===i-1?'aria-current="page"':''}>${esc(f.title)}</button>`).join('');
  $('.dg-mobile label').textContent='Neste guia';
  $('#dg-ficha').innerHTML=[{title:'Visão geral'},...g.fichas].map((f,i)=>`<option value="${i-1}">${esc(f.title)}</option>`).join(''); $('#dg-ficha').value=state.ficha;
 }
 function navHome(){
  $('.dg-side-title').textContent='Explorar por tema';
  $('nav').classList.add('dg-home-theme-nav');
  $('nav').innerHTML=themes.map(t=>`<button type="button" class="dg-nav-item" data-theme-target="${t.id}">${esc(t.title)}</button>`).join('');
  $('nav').after($('.dg-side-title'));
  $('.dg-mobile label').textContent='Temas';
  $('#dg-ficha').innerHTML='<option value="">Escolher tema</option>'+themes.map(t=>`<option value="${t.id}">${esc(t.title)}</option>`).join('');
  $('#dg-ficha').value='';
 }
 function review(g){return '';}
 function card(f,i,gi=state.guide){return `<button type="button" class="dg-choice" data-guide="${gi}" data-ficha="${i}"><span class="dg-number">${String(i+1).padStart(2,'0')}</span><span><strong>${esc(f.title)}</strong><small>${esc(f.intro)}</small></span></button>`;}
 function links(g){return (related[g.code]||[]).map(code=>guides.findIndex(x=>x.code===code)).filter(i=>i>=0).map(gi=>`<button type="button" class="dg-text-button" data-guide="${gi}" data-ficha="-1">${esc(guides[gi].title)}${!guides[gi].fichas.length?' (pendente)':''}</button>`).join('');}
 function overview(){
  const g=guides[state.guide],f=g.fichas[0],theme=themeForCode(g.code);
  return `<div class="dg-breadcrumb">Guias do utilizador / ${theme?esc(theme.title)+' / ':''}${esc(g.title)}</div>${theme?`<span class="dg-theme-chip">${esc(theme.title)}</span>`:''}<div class="dg-kicker">${g.code==='CM'?'Documento complementar':'Guia prático'}</div><h1>${esc(g.title)}</h1><p class="dg-lead">${esc(g.intro)}</p><p class="dg-audience">${esc(g.audience)}</p><h2>O que pretende fazer?</h2><div class="dg-grid">${g.fichas.map((f,i)=>card(f,i)).join('')}</div><div class="dg-example"><h2>Exemplo</h2><p>${esc(f.example)}</p></div><button type="button" class="dg-primary" data-ficha="0">Começar por ${esc(f.title.toLowerCase())} →</button>${links(g)?`<h2>Guias relacionados</h2><div class="dg-related">${links(g)}</div>`:''}`;
 }
 function home(){
  const themeIndex=themes.map(t=>`<button type="button" class="dg-theme-jump" data-theme-target="${t.id}"><strong>${esc(t.title)}</strong><small>${esc(t.intro)}</small></button>`).join('');
  const sections=themes.map(t=>{const gs=t.guides.map(code=>guideIndex(code)).filter(i=>i>=0);return `<section class="dg-theme-section" id="tema-${t.id}"><div class="dg-theme-heading"><div><h2>${esc(t.title)}</h2><p>${esc(t.intro)}</p></div></div><div class="dg-guide-grid">${gs.map(i=>`<button type="button" class="dg-guide-card" data-guide="${i}" data-ficha="-1"><span><strong>${esc(guides[i].title)}</strong><small>${esc(guides[i].intro)}</small></span><span class="dg-arrow" aria-hidden="true">→</span></button>`).join('')}</div></section>`}).join('');
  return `<div class="dg-breadcrumb">Guias do utilizador</div><div class="dg-kicker">Guias práticos</div><h1>Como podemos ajudar?</h1><p class="dg-lead dg-home-intro">Escolha o tema relacionado com o que pretende fazer no dados.gov.pt. Dentro de cada tema encontra guias práticos organizados por tarefas.</p><div class="dg-theme-index">${themeIndex}</div>${sections}`;
 }
 function next(g,f){
  const target=normal(f.next);
  const own=g.fichas.findIndex(x=>normal(x.title)===target);
  if(own>=0 && own!==state.ficha)return {gi:state.guide,fi:own,label:g.fichas[own].title};
  const gi=guides.findIndex(x=>normal(x.title)===target);
  if(gi>=0)return {gi,fi:-1,label:guides[gi].title+(!guides[gi].fichas.length?' (pendente)':'')};
  const fi=state.ficha+1;
  return fi<g.fichas.length?{gi:state.guide,fi,label:g.fichas[fi].title}:{gi:state.guide,fi:-1,label:'Voltar à visão geral'};
 }
 function detail(){
  const g=guides[state.guide],f=g.fichas[state.ficha],n=next(g,f);
  const table=f.table?`<table class="dg-table"><thead><tr>${f.table[0].map(x=>`<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>${f.table.slice(1).map(row=>`<tr>${row.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`:'';
  const theme=themeForCode(g.code);
  return `<div class="dg-breadcrumb">Guias do utilizador / ${theme?esc(theme.title)+' / ':''}${esc(g.title)} / Ficha ${state.ficha+1} de ${g.fichas.length}</div>${review(g)}${theme?`<span class="dg-theme-chip">${esc(theme.title)}</span>`:''}${f.roles?`<span class="dg-role">${esc(f.roles)}</span>`:''}<h1>${esc(f.title)}</h1><p class="dg-lead">${esc(f.intro)}</p><h2>Como fazer</h2><ol class="dg-steps">${f.steps.map(s=>`<li><span>${esc(s)}</span></li>`).join('')}</ol>${table}<div class="dg-example"><h2>Exemplo</h2><p>${esc(f.example)}</p></div>${design.showMedia?`<div class="dg-media"><div><div class="dg-media-label">Imagem ou vídeo previsto</div><p>${esc(f.media)}</p></div></div>`:''}<div class="dg-tip"><strong>Dica</strong><p>${esc(f.tip)}</p></div><div class="dg-bottom"><button type="button" class="dg-text-button" data-ficha="-1">Visão geral deste guia</button><button type="button" class="dg-primary" data-guide="${n.gi}" data-ficha="${n.fi}">${esc(n.label)} →</button></div>`;
 }
 function render(){
  if(state.home){navHome();$('main').innerHTML=home();}
  else{nav();$('main').innerHTML=state.ficha<0?overview():detail();$('.dg-grid')?.style.setProperty('grid-template-columns',design.grid==='Lista'?'1fr':'');}
 }
 function resetView(){requestAnimationFrame(()=>{const main=$('main'),header=document.querySelector('.portal-header');if(!main)return;const offset=(header?.getBoundingClientRect().height||0)+24;const top=main.getBoundingClientRect().top+window.scrollY-offset;window.scrollTo({top:Math.max(0,top),behavior:'auto'});const title=main.querySelector('h1');if(title){title.setAttribute('tabindex','-1');title.focus({preventScroll:true});}});}
 function openGuide(gi,fi=-1){state.guide=gi;state.ficha=fi;state.home=false;$('#dg-query').value='';render();resetView();}
 function scrollToTheme(id){const el=root.querySelector(`#tema-${CSS.escape(id)}`);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}
 root.addEventListener('click',e=>{
  const themeButton=e.target.closest('[data-theme-target]');
  if(themeButton){if(!state.home){state.home=true;render();requestAnimationFrame(()=>scrollToTheme(themeButton.dataset.themeTarget));}else scrollToTheme(themeButton.dataset.themeTarget);return;}
  const b=e.target.closest('button[data-ficha]');if(!b)return;
  if(b.dataset.guide!==undefined){openGuide(Number(b.dataset.guide),Number(b.dataset.ficha));return;}
  state.home=false;state.ficha=Number(b.dataset.ficha);render();resetView();
 });
 $('#dg-guide').addEventListener('change',e=>openGuide(Number(e.target.value),-1));
 $('#dg-ficha').addEventListener('change',e=>{if(state.home){if(e.target.value)scrollToTheme(e.target.value);return;}state.ficha=Number(e.target.value);render();resetView();});
 $('.dg-all').addEventListener('click',()=>{state.home=true;state.ficha=-1;$('#dg-query').value='';render();resetView();});
 function search(){
  const q=$('#dg-query').value.trim();if(!q){render();resetView();return;}
  state.home=false;
  const hits=[];guides.forEach((g,gi)=>g.fichas.forEach((f,i)=>{if(normal(f.title+' '+f.intro+' '+f.steps.join(' ')+' '+f.tip).includes(normal(q)))hits.push({f,i,gi,theme:themeForCode(g.code)});}));
  navHome();
  const grouped=themes.map(t=>({theme:t,hits:hits.filter(h=>h.theme?.id===t.id)})).filter(x=>x.hits.length);
  $('main').innerHTML=`<div class="dg-breadcrumb">Pesquisa nos guias disponíveis</div><h1>Resultados da pesquisa</h1><p>${hits.length} ${hits.length===1?'ficha encontrada':'fichas encontradas'} para “${esc(q)}”.</p>${hits.length?grouped.map(x=>`<h2 class="dg-search-theme">${esc(x.theme.title)}</h2><div class="dg-grid">${x.hits.map(h=>card(h.f,h.i,h.gi)).join('')}</div>`).join(''):'<p>Experimente menos palavras ou outra expressão.</p>'}`;
  resetView();
 }
 $('.dg-search button').type='button';
 $('.dg-search button').addEventListener('click',search);
 $('#dg-query').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();search();}});
 $('.dg-search').addEventListener('submit',e=>{e.preventDefault();search();});
 render();
 if(globalThis.Tweak){const tweak=new Tweak({container:root,onChange:render});tweak.addSelect(design,'grid',{label:'Apresentação das tarefas',options:['Cartões','Lista']});tweak.addToggle(design,'showMedia',{label:'Mostrar espaço previsto para imagens'});}
})();
