(() => {
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

  // Boussole
  const compass = $('[data-tool="boussole"]');
  if (compass) {
    const needsByPersona = {
      adulte: [
        ['comprendre','Comprendre mon fonctionnement','Mettre des mots sans partir d’une checklist.'],
        ['diagnostic','Préparer une démarche diagnostique','Savoir quoi documenter et où commencer.'],
        ['surcharge','Comprendre une surcharge ou un épuisement','Relier contexte, signaux et récupération.'],
        ['quotidien','Rendre le quotidien plus soutenable','Organisation, attention et récupération.']
      ],
      parent: [
        ['ecole','École et aménagements','Comprendre les dispositifs et préparer les besoins.'],
        ['diagnostic','Orientation ou évaluation','Préparer les faits et les questions utiles.'],
        ['dys','Apprentissages et troubles dys','Trouver des repères sans réduire l’enfant à une étiquette.'],
        ['sensoriel','Surcharge sensorielle','Repérer les contextes et préparer des ajustements.']
      ],
      travail: [
        ['amenagements','Aménagements et obstacles','Partir du travail réel avant le statut.'],
        ['communication','Consignes et communication','Réduire l’implicite et les ambiguïtés.'],
        ['droits','Droits et reconnaissance','Identifier les démarches selon le territoire.'],
        ['fatigue','Charge et récupération','Repérer ce qui consomme la marge.']
      ],
      proche: [
        ['communication','Mieux se comprendre','Rendre les attentes et les besoins explicites.'],
        ['double','Comprendre les décalages relationnels','Sortir de l’idée qu’une seule personne communique mal.'],
        ['recuperation','Comprendre le besoin de récupération','Après une soirée, une journée dense ou une surcharge.'],
        ['annonce','Parler d’un diagnostic ou d’un questionnement','Dire ce qui change sans tout expliquer en une fois.']
      ]
    };
    const routes = {
      'adulte:comprendre':['Comprendre','../articles/diagnostic-adulte-francophonie.html','Diagnostic adulte dans l’espace francophone','../outils-pratiques/preparer-rendez-vous.html','Préparer un rendez-vous'],
      'adulte:diagnostic':['Préparer la démarche','../articles/diagnostic-tardif-camouflage-cooccurrences.html','Diagnostic tardif, camouflage et cooccurrences','../outils-pratiques/preparer-rendez-vous.html','Préparer un rendez-vous'],
      'adulte:surcharge':['Comprendre la surcharge','../articles/burnout-autistique.html','Burnout autistique','../outils-pratiques/journal-surcharge.html','Journal de surcharge'],
      'adulte:quotidien':['Alléger le quotidien','../vie-quotidienne.html','Vie quotidienne','../outils-pratiques/budget-attention.html','Budget attention'],
      'parent:ecole':['Comprendre l’école','../articles/ecole-amenagements-francophonie.html','École et aménagements selon le territoire','../outils-pratiques/clarifier-une-consigne.html','Clarifier une consigne'],
      'parent:diagnostic':['Préparer l’orientation','../articles/neurodiversite-neurodivergence-diagnostic.html','Neurodiversité, neurodivergence et diagnostic','../outils-pratiques/preparer-rendez-vous.html','Préparer un rendez-vous'],
      'parent:dys':['Comprendre les apprentissages','../articles/troubles-dys-reperes.html','Troubles dys : repères','../outils-pratiques/clarifier-une-consigne.html','Clarifier une consigne'],
      'parent:sensoriel':['Observer la surcharge','../articles/surcharge-sensorielle-quotidien.html','Surcharge sensorielle au quotidien','../outils-pratiques/kit-sensoriel.html','Kit sensoriel'],
      'travail:amenagements':['Partir des obstacles','../articles/travail-handicap-francophonie.html','Travail et handicap dans l’espace francophone','../outils-pratiques/fiche-manager.html','Fiche manager'],
      'travail:communication':['Rendre les attentes explicites','../articles/amenagements-raisonnables-travail-belgique.html','Aménagements et obstacles au travail','../outils-pratiques/clarifier-une-consigne.html','Clarifier une consigne'],
      'travail:droits':['Comprendre les démarches','../droits-et-reconnaissance-francophonie.html','Droits et reconnaissance','../outils-pratiques/fiche-manager.html','Fiche manager'],
      'travail:fatigue':['Observer la charge','../articles/burnout-autistique.html','Burnout autistique','../outils-pratiques/budget-attention.html','Budget attention'],
      'proche:communication':['Rendre l’implicite visible','../relations-concretes.html','Relations concrètes','../outils-pratiques/traducteur-implicite.html','Traducteur d’implicite'],
      'proche:double':['Changer de cadre','../articles/double-empathie.html','Double empathie','../outils-pratiques/traducteur-implicite.html','Traducteur d’implicite'],
      'proche:recuperation':['Comprendre la récupération','../recuperation-apres-vie-sociale.html','Récupération après une journée sociale','../outils-pratiques/scripts-communication.html','Scripts de communication'],
      'proche:annonce':['Préparer la discussion','../amitie-famille-et-annonce-diagnostic.html','Amitié, famille et annonce d’un diagnostic','../outils-pratiques/traducteur-implicite.html','Traducteur d’implicite']
    };
    let persona='';
    const step1=$('#boussole-step-1', compass), step2=$('#boussole-step-2', compass), needs=$('#boussole-needs', compass), result=$('#boussole-result', compass);
    const showNeeds = p => {
      persona=p; needs.innerHTML='';
      needsByPersona[p].forEach(([key,title,desc])=>{
        const b=document.createElement('button'); b.type='button'; b.className='choice-button'; b.dataset.need=key;
        b.innerHTML='<strong>'+title+'</strong><span>'+desc+'</span>'; needs.appendChild(b);
      });
      step1.hidden=true; step2.hidden=false; result.hidden=true; step2.scrollIntoView({behavior:'smooth', block:'center'});
    };
    $$('.choice-button[data-persona]', compass).forEach(b=>b.addEventListener('click',()=>showNeeds(b.dataset.persona)));
    needs.addEventListener('click', e=>{
      const b=e.target.closest('[data-need]'); if(!b) return;
      const r=routes[persona+':'+b.dataset.need]; if(!r) return;
      result.innerHTML='<p class="eyebrow">Votre point de départ</p><h2>'+r[0]+'</h2><div class="result-links">'+
        '<a href="'+r[1]+'"><span>1 · Comprendre</span><strong>'+r[2]+'</strong></a>'+
        '<a href="'+r[3]+'"><span>2 · Agir</span><strong>'+r[4]+'</strong></a>'+
        '<a href="carte-francophone.html"><span>3 · Localiser</span><strong>Ouvrir la carte francophone à 4 cases</strong></a></div>'+
        '<p class="tool-caution">Ce résultat est un raccourci de navigation, pas une interprétation de votre situation.</p><button type="button" class="button ghost" id="boussole-reset">Recommencer</button>';
      step2.hidden=true; result.hidden=false; result.scrollIntoView({behavior:'smooth', block:'start'});
      $('#boussole-reset', result).addEventListener('click',()=>{persona=''; result.hidden=true; step1.hidden=false; window.scrollTo({top:compass.offsetTop-120,behavior:'smooth'});});
    });
    $('#boussole-back', compass).addEventListener('click',()=>{step2.hidden=true;step1.hidden=false;});
  }

  // Traducteur d'implicite
  const translator=$('[data-tool="traducteur"]');
  if (translator) {
    const templates={
      delay:{when:'Je ne réponds pas tout de suite.',meaning:'J’ai souvent besoin de temps pour traiter l’information et formuler une réponse. Mon silence ne signifie pas forcément un refus ou un désintérêt.',help:'Me laisser quelques minutes et préciser si une réponse immédiate est réellement nécessaire.',avoid:'Multiplier les relances ou interpréter mon silence à ma place.'},
      withdraw:{when:'Je m’isole après un échange ou une journée dense.',meaning:'J’essaie souvent de faire redescendre la charge et de récupérer. Ce retrait peut être un besoin de calme plutôt qu’un rejet de l’autre.',help:'Me laisser un temps de récupération et convenir d’un moment pour reprendre l’échange si nécessaire.',avoid:'Exiger une discussion immédiate ou transformer mon besoin de retrait en accusation.'},
      details:{when:'Je demande beaucoup de détails.',meaning:'J’ai besoin de rendre la demande plus explicite pour savoir ce qui est attendu, dans quel ordre et avec quelle priorité.',help:'Préciser le résultat attendu, la priorité, l’échéance et ce qui peut être adapté.',avoid:'Répondre seulement « c’est évident » ou ajouter plusieurs attentes implicites en même temps.'},
      direct:{when:'Je parle de façon très directe.',meaning:'Je peux me concentrer sur le contenu de ce que je veux dire sans toujours ajouter les codes sociaux attendus. Cela ne signifie pas automatiquement que je suis en colère.',help:'Me demander ce que je veux dire lorsqu’un ton ou une formulation prête à confusion.',avoid:'Déduire une intention hostile à partir du style de formulation seulement.'},
      decline:{when:'Je décline une sortie ou je change d’avis.',meaning:'Ma marge peut avoir diminué depuis le moment où j’ai accepté. Renoncer peut être une façon d’éviter une surcharge plutôt qu’un manque d’intérêt pour la personne.',help:'Me permettre de dire non ou de proposer une autre modalité sans devoir me justifier longuement.',avoid:'Présenter l’annulation comme une preuve que la relation ne compte pas.'},
      gaze:{when:'Je regarde ailleurs pendant qu’on me parle.',meaning:'Détourner le regard peut parfois m’aider à écouter, réfléchir ou réduire la charge. Le contact visuel n’est pas toujours un bon indicateur de mon attention.',help:'Vérifier ma compréhension avec une question claire plutôt que juger mon attention à partir du regard.',avoid:'M’obliger à maintenir le contact visuel pour prouver que j’écoute.'},
      custom:{when:'',meaning:'',help:'',avoid:''}
    };
    const fields={when:$('#implicit-when'),meaning:$('#implicit-meaning'),help:$('#implicit-help'),avoid:$('#implicit-avoid')};
    const select=$('#implicit-situation'), preview=$('#implicit-preview'), status=$('#implicit-status');
    const applyTemplate=()=>{const t=templates[select.value]; Object.keys(fields).forEach(k=>fields[k].value=t[k]); refresh();};
    const refresh=()=>{
      const v=Object.fromEntries(Object.entries(fields).map(([k,f])=>[k,f.value.trim()]));
      preview.innerHTML='<p>Je t’envoie ce repère pour éviter qu’on interprète trop vite certains de mes comportements.</p>'+
        '<p><strong>Quand je fais ou dis ceci</strong><br>'+escapeHtml(v.when || '…')+'</p>'+
        '<p><strong>Chez moi, cela peut vouloir dire</strong><br>'+escapeHtml(v.meaning || '…')+'</p>'+
        '<p><strong>Ce qui m’aide</strong><br>'+escapeHtml(v.help || '…')+'</p>'+
        (v.avoid?'<p><strong>Ce qu’il vaut mieux éviter</strong><br>'+escapeHtml(v.avoid)+'</p>':'')+
        '<p>Ce texte décrit mon fonctionnement dans cette situation. Il ne prétend pas parler au nom de toutes les personnes neurodivergentes.</p>';
    };
    const escapeHtml=s=>s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
    const plain=()=>preview.innerText.trim();
    select.addEventListener('change', applyTemplate);
    Object.values(fields).forEach(f=>f.addEventListener('input', refresh));
    $('#implicit-reset').addEventListener('click', applyTemplate);
    $('#implicit-copy').addEventListener('click', async()=>{try{await navigator.clipboard.writeText(plain());status.textContent='Message copié.';}catch(e){status.textContent='La copie automatique est indisponible. Sélectionnez le texte dans l’aperçu.';}});
    $('#implicit-email').addEventListener('click',()=>{window.location.href='mailto:?subject='+encodeURIComponent('Un repère pour mieux me comprendre')+'&body='+encodeURIComponent(plain());});
    applyTemplate();
  }

  // Carte francophone à 4 portes
  const map=$('[data-tool="carte-francophone"]');
  if (map && window.LEP_DIRECTORY_DATA) {
    const data=window.LEP_DIRECTORY_DATA, select=$('#four-gate-country',map), summary=$('#four-gate-summary',map);
    const gates={
      listen:{label:'Écouter / orienter', match:e=>e.doors.includes('ecoute-orientation') || e.needs.includes('orientation'), door:'ecoute-orientation'},
      diagnose:{label:'Diagnostiquer', match:e=>e.doors.includes('diagnostic') || e.needs.includes('diagnostic'), door:'diagnostic'},
      school:{label:'Scolariser', match:e=>e.doors.includes('ecole') || e.needs.includes('ecole'), door:'ecole'},
      work:{label:'Travailler', match:e=>e.doors.includes('emploi') || e.needs.includes('emploi') || e.needs.includes('droits'), door:'emploi'}
    };
    const verifiedLabel=s=>{if(!s)return''; const p=s.split('-'); return p.length===3 ? p[2]+'/'+p[1]+'/'+p[0] : s;};
    const journeys={belgique:'../parcours-belgique.html',france:'../parcours-france.html',suisse:'../parcours-suisse.html',luxembourg:'../parcours-luxembourg.html',canada:'../parcours-quebec.html'};
    const render=()=>{
      const c=select.value;
      if(!c){$$('.gate-results',map).forEach(x=>x.innerHTML='<p class="gate-empty">Choisissez un territoire.</p>');summary.innerHTML='<p>Choisissez d’abord un territoire.</p>';return;}
      const pool=data.entries.filter(e=>e.country===c || e.region===c);
      let total=0;
      Object.entries(gates).forEach(([key,g])=>{
        const box=$('[data-gate="'+key+'"] .gate-results',map);
        const matches=pool.filter(g.match).slice(0,3); total+=matches.length;
        if(matches.length){
          box.innerHTML='<ul>'+matches.map(e=>'<li><a href="'+e.href+'" target="_blank" rel="noopener noreferrer"><strong>'+e.title+'</strong></a><span>'+ (e.verified?'Vérifié le '+verifiedLabel(e.verified):'Source de l’annuaire') +'</span></li>').join('')+'</ul>';
        } else {
          box.innerHTML='<p class="gate-empty">Aucune porte assez stable n’est actuellement vérifiée dans cette catégorie.</p>';
        }
        box.insertAdjacentHTML('beforeend','<a class="gate-filter" href="../annuaire-francophone.html?country='+encodeURIComponent(c)+'&door='+g.door+'">Voir l’annuaire filtré →</a>');
      });
      summary.innerHTML='<p><strong>'+ (data.labels[c]||c) +'</strong> : '+total+' porte'+(total>1?'s':'')+' affichée'+(total>1?'s':'')+' dans les quatre cases. Pour les autres besoins, ouvrez l’annuaire complet.</p>'+(journeys[c]?'<p><a class="button ghost" href="'+journeys[c]+'">Voir le parcours complet du territoire →</a></p>':'');
    };
    select.addEventListener('change', render); render();
  }
})();
