'use strict';
const pedals=[['Boss GT-10','gt10'],['Boss GT-100','gt100'],['Line 6 POD HD500','hd500'],['M-Vave Tank G','tankg'],['M-Vave Black Box','blackbox'],['M-Vave MK300','mk300'],['Sonicake Matribox 2 Pro','matribox'],['Valeton GP-200','gp200']];
const genres=['Rock','Blues','Country','Jazz','Fusion'];
const players=Object.keys(rigs).sort((a,b)=>a.localeCompare(b,'pt-BR'));
const sounds=['Clean','Crunch','Drive','Solo'];
const state={step:0,device:null,genre:null,player:null,sound:'Drive',pack:false};
const app=document.getElementById('app');
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>s.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
function go(step){state.step=step;render();window.scrollTo({top:0,behavior:'smooth'})}
function selectPedal(i){state.device=pedals[i][1];go(1)}
function selectGenre(i){state.genre=genres[i];state.player=null;state.pack=false;go(2)}
function selectPlayer(i){if(!players[i]||!rigs[players[i]])return;state.player=players[i];state.sound='Drive';state.pack=false;go(3)}
function setSound(s){if(sounds.includes(s)){state.sound=s;render()}}
function setPack(value){state.pack=value;render()}
function currentRig(){if(!rigs[state.player])return null;const r={...rigs[state.player]};if(state.player==='Kiko (Roupa Nova)'){
 const i=sounds.indexOf(state.sound);r.target=['bassman','plexi','ac30','ac30'][i];r.amp=['Kemper · profile Fender Bassman — “Dona”','Kemper · profile Marshall — “Seu Jeito, Meu Jeito”','Kemper · profile Vox AC30 — bases','Kemper · profile Vox AC30 — solo principal'][i];
 }return r;}
// Existence comes from the catalog. Choice of a substitute is Tone Lab curation.
const familyFallback={yamaha:'smooth',fgc:'smooth',gh250:'smooth',legacy:'smooth',superreverb:'clean',tworock:'clean',deville:'clean',twinolux:'tweedDeluxe',amp1:'plexi',zwreck:'drz',triaxis:'mesa',jp2c:'mesa',heartbreaker:'mesa',yjm:'plexi',sh100:'plexi',bludotone:'dumble',majorjubilee:'jubilee'};
function findNative(device,r){
 const c=nativeCatalog[device],target=r.target;let key=target;
 if(!c[key]){
  if(['jp2c','triaxis','heartbreaker'].includes(target))key='mesa';
  else if(target==='majorjubilee')key=c.jubilee?'jubilee':'brit';
  else if(target==='yjm'||target==='sh100'||target==='amp1')key='plexi';
  else if(target==='plexi50')key=c.plexi50?'plexi50':'plexi';
  else if(['superreverb','tworock','deville'].includes(target))key='twin';
  else if(target==='twinolux')key=c.tweedDeluxe?'tweedDeluxe':'bassman';
  else if(['yamaha','fgc','gh250','legacy'].includes(target))key=c.lonestar?'lonestar':c.soldano?'soldano':c.mesa?'mesa':c.deluxe?'deluxe':'jc';
  else if(target==='bludotone')key=c.dumble?'dumble':c.lonestar?'lonestar':c.mesa?'mesa':'deluxe';
  else if(target==='dumble')key=c.lonestar?'lonestar':c.mesa?'mesa':'deluxe';
  else if(target==='ecstasy')key=c.bognerUber?'bognerUber':c.brit?'brit':c.jvm?'jvm':'jcm900';
  else if(target==='jvm'||target==='dsl'||target==='jubilee')key=c.jcm800?'jcm800':c.brit?'brit':c.jvm?'jvm':'jcm900';
  else if(target==='jcm800')key=c.brit?'brit':'jcm900';
  else if(target==='plexi')key=c.brit?'brit':c.jcm900?'jcm900':'twin';
  else if(target==='bassman')key=c.twin?'twin':c.deluxe?'deluxe':'jc';
  else if(target==='jtm45')key=c.plexi?'plexi':c.brit?'brit':'jcm900';
  else if(target==='zwreck')key=c.drz?'drz':c.ac30?'ac30':c.deluxe?'deluxe':'jc';
  else if(target==='powerball')key=c.engl?'engl':c['5150']?'5150':c.mesa?'mesa':'jcm900';
  else if(target==='triamp')key=c.soldano?'soldano':c.jvm?'jvm':'jcm900';
  else if(target==='rockerverb')key=c.jcm800?'jcm800':c.brit?'brit':'jcm900';
  else if(target==='5150')key=c.soldano?'soldano':c.jvm?'jvm':'jcm900';
  else if(target==='soldano')key=c.jvm?'jvm':'jcm900';
  else if(target==='hiwatt'||target==='twin')key=c.twin?'twin':c.deluxe?'deluxe':'jc';
  else if(target==='jc')key=c.twin?'twin':'deluxe';
  else if(target==='ac30')key=c.deluxe?'deluxe':'jcm900';
 }
 if(!c[key]){if(key==='bassman')key=c.twin?'twin':c.deluxe?'deluxe':'jc';else if(key==='brit')key=c.jcm800?'jcm800':c.jvm?'jvm':'jcm900';else if(key==='deluxe')key='jc';else if(key==='twin')key=c.deluxe?'deluxe':'jc';else if(key==='plexi')key=c.brit?'brit':c.jcm800?'jcm800':'jcm900';else if(key==='mesa')key=c.rectifier?'rectifier':c.jvm?'jvm':'jcm900';else if(target==='lonestar')key=c.twin?'twin':c.deluxe?'deluxe':'jc';else if(target==='tweedDeluxe')key=c.bassman?'bassman':c.deluxe?'deluxe':'jc';}if(!c[key])throw new Error('Sem alternativa catalogada: '+device+' / '+target);
 let entry=c[key],index=sounds.indexOf(state.sound),model=entry.models[index],kind=key===target?'corresponding':'alternative',note='';
 if(key!==target)note='O amp exato da ficha não está listado no catálogo consultado. Esta é uma alternativa que já existe na pedaleira.';
 const related=(['ac30','triamp','mesa'].includes(key)&&key===target)||((['yjm','sh100','plexi50','amp1'].includes(target)&&key==='plexi')||(['triaxis','jp2c','heartbreaker'].includes(target)&&key==='mesa')||(target==='bludotone'&&key==='dumble')||(target==='zwreck'&&key==='drz')||(target==='majorjubilee'&&key==='jubilee'))||(['5150','rockerverb','ecstasy','jvm'].includes(key)&&['mk300','blackbox'].includes(device)&&key===target)||(target==='powerball'&&key==='powerball');
 if(related){kind='related';note='Modelo da mesma família ou de projeto relacionado. Compare a versão descrita abaixo com o amp da ficha; não são necessariamente o mesmo circuito.';}
 if(device==='hd500'&&key==='bognerUber')note='Bomber Uber é Uberschall, não Ecstasy. Serve como alternativa interna; ajuste ganho e presença para suavizar o lead.';
 if(key==='ecstasy'&&state.sound==='Clean'&&['matribox','gp200'].includes(device)){kind='alternative';note='O catálogo lista os canais azul e vermelho do Ecstasy. Para Clean, a sugestão interna é o Shiva limpo; é outro modelo Bogner.';}
 if(device==='mk300'&&['jvm','jubilee'].includes(key)&&state.sound==='Clean'){kind='alternative';note='A opção limpa usa um JCM800 disponível no catálogo; o canal limpo exato desta referência não está listado.';}
 const optional=optionalModels[device]?.[target]||null;
 if(state.pack&&device===state.device&&optional){model=optional.model;entry={based:optional.based,condition:optional.condition};kind='optional';note='Modelo correspondente disponível em pacote opcional. Selecione apenas se o pacote estiver licenciado e instalado.';}
 const labels={corresponding:'Modelo correspondente no catálogo',related:'Versão / família relacionada',alternative:'Alternativa interna disponível',optional:'Modelo de pacote opcional'};
 return {model,based:entry.based,condition:entry.condition||'',kind,label:labels[kind],note,optional,key};
}
function adjustment(r){const t=r.target;
 if(['ac30','zwreck'].includes(t))return 'Controle os agudos e preserve o ataque. Use ganho moderado; para Brian May, o treble booster é parte central da referência.';
 if(['superreverb','tworock','deville','twin','bassman','twinolux'].includes(t))return 'Preserve a dinâmica e o headroom. Nos sons saturados, use o drive indicado na ficha completa; não compense a caixa diferente apenas aumentando o ganho.';
 if(['hiwatt'].includes(t))return 'Mantenha a base limpa; Big Muff é a referência para sustain e solos. Delay e modulações dependem da música.';
 if(['jp2c','triaxis','powerball'].includes(t))return 'Controle os graves antes da distorção; use gate sem cortar o sustain e ajuste o corpo com EQ após o amp.';
 if(['dumble','bludotone','yamaha','fgc','gh250','legacy','ecstasy'].includes(t))return 'Priorize médios e sustain, reduzindo presença áspera. Use delay com clareza e evite ganho excessivo.';
 return 'Comece com ganho moderado e médios presentes. Ajuste o volume da guitarra e o ataque antes de acrescentar mais distorção.';
}
function recipe(r){const s=state.sound;let gain={Clean:'15–25',Crunch:'30–45',Drive:'45–60',Solo:'50–65'}[s];let drive=s==='Clean'?'Desligado por padrão; mantenha o ataque.':s==='Crunch'?'Overdrive leve apenas se necessário.':'Use o ganho do amp ou o drive indicado na ficha; evite somar saturações sem necessidade.';let comp='Opcional, com compressão leve e ataque preservado.';let delay=s==='Solo'?'300–420 ms, poucas repetições e mix discreto; ajuste à música.':'Discreto ou desligado, conforme a música.';let reverb='Room ou plate curto, com mix baixo.';
 if(state.player==='Brent Mason'){comp='Compressor moderado; referência Wampler Ego.';drive=s==='Clean'?'Desligado.':'Referências: Wampler Euphoria, BB Preamp e Hot Wired; escolha um drive disponível.';delay='Slapback de 90–130 ms como ponto de partida.';}
 if(state.player==='Andy Wood')comp='Woodshed Comp como referência; não apague o ataque.';
 if(state.player==='Stevie Ray Vaughan'){drive=s==='Clean'?'Desligado.':'Tube Screamer como referência; ganho baixo e médios presentes.';delay='Desligado por padrão.';reverb='Spring discreto.';comp='Desligado por padrão.';}
 if(state.player==='Nuno Bettencourt')drive='RAT como filtro e alteração da resposta; evite excesso de distorção.';
 if(['Brad Paisley','Nile Rodgers','Prince'].includes(state.player))comp='Desligado por padrão; opcional como adaptação.';
 if(state.player==='David Gilmour')drive=['Drive','Solo'].includes(s)?'Big Muff para sustain; ajuste no contexto da banda.':'Desligado ou boost leve, conforme a música.';
 if(state.player==='Brian May'){drive=s==='Clean'?'Reduza o volume da guitarra; booster faz parte da referência.':'Treble booster empurrando o AC30.';delay=s==='Solo'?'800 ms; variação histórica com segunda linha de 1.600 ms, quando disponível e adequado à música.':'Desligado por padrão.';comp='Desligado por padrão.';}
 if(state.player==='The Edge')delay='Sincronize com o BPM; colcheia pontuada é um ponto de partida, conforme a música.';
 if(state.player==='Gary Moore')drive=s==='Clean'?'Desligado.':'Guv’nor como referência, sobre JTM45 relativamente limpo.';
 if(state.player==='Kiko (Roupa Nova)'){drive='Saturação do próprio profile; sem drive adicional obrigatório.';comp='Compressor externo citado; modelo provável, não confirmado.';delay=s==='Clean'?'Desligado — “Dona”.':s==='Drive'?'300–320 ms, bem discreto.':s==='Solo'?'Aproximadamente 600 ms; mais presente que na base.':'Ajuste conforme a música.';reverb=s==='Clean'?'Desligado — som seco.':'Muito discreto.';}
 return {gain,drive,comp,delay,reverb};}
function modelCard(device,r){const a=findNative(device,r),src=modelSources[device];return `<span class="tag ${a.kind==='corresponding'?'good':'related'}">${safe(a.label)}</span><p><strong>${safe(a.model)}</strong></p><p>Base do modelo: ${safe(a.based)}.</p>${a.note?`<p>${safe(a.note)}</p>`:''}${a.condition?`<p class="catalog-note">${safe(a.condition)}</p>`:''}<p class="note">${safe(src.scope)}</p><a href="${safe(src.url)}" target="_blank" rel="noopener">${safe(src.label)}</a>`;}
function render(){document.querySelectorAll('.steps span').forEach((el,i)=>el.classList.toggle('active',i===state.step));const back=state.step?`<button class="back" onclick="go(${state.step-1})">← Voltar</button>`:'';
 if(state.step===0){app.innerHTML=`<h2>Qual é a sua pedaleira?</h2><p class="hint">Escolha o equipamento que você vai usar.</p><div class="grid">${pedals.map(([p,id],i)=>`<button class="card" onclick="selectPedal(${i})" aria-label="Escolher ${safe(p)}"><div class="photo"><img src="assets/${id}.webp" alt="${safe(p)}" loading="lazy" width="1000" height="1000"></div><b>${safe(p)}</b></button>`).join('')}</div>`;return;}
 if(state.step===1){app.innerHTML=back+`<h2>Que estilo você quer tocar?</h2><p class="hint">${safe(pedals.find(p=>p[1]===state.device)[0])}</p><div class="choicegrid">${genres.map((g,i)=>`<button class="choice" onclick="selectGenre(${i})">${g}<small>${players.filter(n=>rigs[n].genres.includes(g)).length} referências</small></button>`).join('')}</div>`;return;}
 if(state.step===2){app.innerHTML=back+`<h2>${safe(state.genre)} · escolha sua referência</h2><p class="hint">Somente guitarristas presentes no PDF. Um artista pode aparecer em mais de um estilo.</p><input id="search" class="search" type="search" placeholder="Buscar guitarrista neste estilo" aria-label="Buscar guitarrista"><div class="choicegrid" id="players"></div><p id="empty" class="hint hidden">Nenhum guitarrista deste estilo corresponde à busca.</p>`;const input=document.getElementById('search');const filter=()=>{const matches=players.map((n,i)=>[n,i]).filter(([n])=>rigs[n].genres.includes(state.genre)&&norm(n).includes(norm(input.value.trim())));document.getElementById('players').innerHTML=matches.map(([n,i])=>`<button class="choice" onclick="selectPlayer(${i})">${safe(n)}<small>${safe(rigs[n].amp)}</small></button>`).join('');document.getElementById('empty').classList.toggle('hidden',!!matches.length)};input.addEventListener('input',filter);filter();return;}
 const r=currentRig();if(!r){go(2);return;}const a=findNative(state.device,r),f=recipe(r);const pedal=pedals.find(p=>p[1]===state.device)[0];
 app.innerHTML=back+`<h2>${safe(state.player)}</h2><span class="tag">${safe(state.genre)}</span><span class="tag">${safe(pedal)}</span><div class="amp-hero">${r.image?`<figure><img src="${safe(r.image)}" alt="Conjunto de referência: ${safe(r.amp)}"><figcaption>Imagem ilustrativa fornecida. A ficha completa identifica a fase e as adaptações.</figcaption></figure>`:'<div class="no-amp">Imagem deste amp não fornecida</div>'}<div><div class="eyebrow">Amp de referência do guitarrista</div><h3>${safe(r.amp)}</h3><p>${safe(r.cab)}</p><a href="referencias.pdf#page=${r.page}" target="_blank" rel="noopener">Referência no PDF · página ${r.page}</a></div></div><div class="modes" aria-label="Tipo de som">${sounds.map(s=>`<button class="choice ${state.sound===s?'selected':''}" aria-pressed="${state.sound===s}" onclick="setSound('${s}')">${s}</button>`).join('')}</div><p class="note">${safe(state.sound)} é uma proposta de preset; consulte a ficha para saber quais sons têm maior relevância para o artista.</p><div class="chain">${[a.model,'Caixa / CAB',f.delay.startsWith('Desligado')?'Delay desligado':'Delay conforme a música','Reverb conforme o som'].map(s=>`<span>${safe(s)}</span>`).join('')}</div><div class="recipe"><div class="block"><h3>Amp na ${safe(pedal)}</h3>${modelCard(state.device,r)}${a.optional?`<p class="catalog-note">Também existe ${safe(a.optional.model)} — ${safe(a.optional.based)}. ${safe(a.optional.condition)}</p><label><input type="checkbox" ${state.pack?'checked':''} onchange="setPack(this.checked)"> Tenho o Model Pack indicado instalado</label>`:''}</div><div class="block"><h3>Caixa e ajuste do amp</h3><strong>${safe(r.cab)}</strong><p>Primeiro, selecione a caixa interna que mais se aproxima desta referência. Use IR externo apenas se desejar e o aparelho aceitar.</p><p>${safe(adjustment(r))}</p>${state.device==='mk300'&&a.model.includes('_FG')?'<p class="catalog-note">A descrição desta captura inclui uma caixa. Confira o som antes de acrescentar outro CAB para evitar duas simulações em série.</p>':''}<p>Ganho inicial sugerido: ${safe(f.gain)} / 100. EQ inicial normalizado: graves 45 · médios 60 · agudos 50. Adapte à escala do aparelho e ajuste pelo ouvido.</p></div><div class="block"><h3>Compressor e drive · proposta</h3><p><strong>Compressor:</strong> ${safe(f.comp)}</p><p><strong>Drive:</strong> ${safe(f.drive)}</p>${state.device==='tankg'?'<p class="catalog-note">A Tank G não dispõe de blocos separados de compressor e overdrive. Os nove slots AMP podem conter capturas de drives; um pedal adicional em série exige equipamento externo ou uma captura que reúna a cadeia desejada.</p>':''}</div><div class="block"><h3>Delay e reverb · proposta</h3><p><strong>Delay:</strong> ${safe(f.delay)}</p><p><strong>Reverb:</strong> ${safe(f.reverb)}</p></div><div class="block wide"><details><summary>Ficha completa do guitarrista</summary><div class="reference-text">${safe(r.text)}</div><a href="referencias.pdf#page=${r.page}" target="_blank" rel="noopener">Abrir PDF original</a></details></div><div class="block wide"><details><summary>Comparar amps nas oito pedaleiras</summary><div class="device-alternatives">${pedals.map(([n,id])=>`<article class="block"><h3>${safe(n)}</h3>${modelCard(id,r)}</article>`).join('')}</div></details></div></div><p class="note">Os nomes internos foram conferidos nas fontes dos fabricantes. A escolha de alternativas e as regulagens são propostas do Tone Lab. Um CAB com o nome de um amp não confirma a existência desse amp no bloco AMP. Capturas e IRs importados podem substituir o conteúdo original dos slots.</p>`;
}
render();
