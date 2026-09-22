const selector=document.getElementById('dg-guide');
selector?.addEventListener('change',()=>location.assign(selector.value));
const query=new URL(location.href).searchParams.get('q')?.trim();
if(query){
 const main=document.getElementById('conteudo');
 document.getElementById('dg-query').value=query;
 const normal=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 try{
  const response=await fetch(new URL('./search-index.json',import.meta.url));
  if(!response.ok)throw Error('Search unavailable');
  const hits=(await response.json()).filter(f=>normal(f.text).includes(normal(query)));
  main.querySelector('h1').textContent='Resultados da pesquisa';
  document.title='Pesquisa: '+query+' | Guias do utilizador | dados.gov.pt';
  const status=main.querySelector('.dg-lead');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.textContent=`${hits.length} resultados para “${query}”.`;
  const grid=main.querySelector('.dg-grid');grid.replaceChildren();
  for(const hit of hits){const a=document.createElement('a');a.className='dg-choice';a.href=hit.url;const span=document.createElement('span'),strong=document.createElement('strong'),small=document.createElement('small');strong.textContent=hit.title;small.textContent=hit.intro;span.append(strong,small);a.append(span);grid.append(a);}
  if(!hits.length)grid.textContent='Experimente menos palavras ou outra expressão.';
 }catch{const status=main.querySelector('.dg-lead');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.textContent='Não foi possível efectuar a pesquisa. Consulte os temas ou tente novamente.';}
}