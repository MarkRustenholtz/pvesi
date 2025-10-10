
(function(){
  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));
  const home = $('#homePage');
  const show = $('#showPage');
  const sheet = $('#sheet');
  const assistList = $('#assistList');
  const esiList = $('#esiList');

  const KEY = 'pv_esi_state_v1';

  const state = {
    agent:{grade:'',nom:'',prenom:'',unite:'',sexe:'M'},
    contexte:{annee:'deux mil vingt-cinq',dateTxt:'17 Juillet',heureTxt:'16 heures et 25 minutes',ppa:'la Turbie',plage:'15 heures à 23 heures',chef:'Emmanuelle JOUBERT'},
    bus:{heure:'16 heures et 30 minutes',cie:'FLIXBUS',pays:'Italie',immat:'GT-503-RE',orig:'Turin (Italie)',dest:'Nice (France)'},
    assistants:[],
    esi:[]
  };

  function save(){
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  function load(){
    try{ Object.assign(state, JSON.parse(localStorage.getItem(KEY)||'{}')); }catch{}
  }

  function navigate(to){
    if(to==='home'){ home.classList.add('active'); show.classList.remove('active'); }
    else{ show.classList.add('active'); home.classList.remove('active'); window.scrollTo({top:0,behavior:'instant'}); }
  }

  function bindForm(){
    const a = state.agent;
    $('#frm_agent_grade').value = a.grade||'';
    $('#frm_agent_nom').value = a.nom||'';
    $('#frm_agent_prenom').value = a.prenom||'';
    $('#frm_agent_unite').value = a.unite||'';
    $('#frm_agent_sexe').value = a.sexe||'M';

    const c = state.contexte;
    $('#frm_annee').value = c.annee||'';
    $('#frm_date_txt').value = c.dateTxt||'';
    $('#frm_heure_txt').value = c.heureTxt||'';
    $('#frm_ppa').value = c.ppa||'';
    $('#frm_plage').value = c.plage||'';
    $('#frm_chef').value = c.chef||'';

    const b = state.bus;
    $('#frm_bus_heure').value = b.heure||'';
    $('#frm_bus_cie').value = b.cie||'';
    $('#frm_bus_pays').value = b.pays||'';
    $('#frm_bus_immat').value = b.immat||'';
    $('#frm_bus_orig').value = b.orig||'';
    $('#frm_bus_dest').value = b.dest||'';

    renderAssist();
    renderEsi();
  }

  function pullForm(){
    const a = state.agent;
    a.grade = $('#frm_agent_grade').value.trim();
    a.nom = $('#frm_agent_nom').value.trim();
    a.prenom = $('#frm_agent_prenom').value.trim();
    a.unite = $('#frm_agent_unite').value.trim();
    a.sexe = $('#frm_agent_sexe').value;

    const c = state.contexte;
    c.annee = $('#frm_annee').value.trim();
    c.dateTxt = $('#frm_date_txt').value.trim();
    c.heureTxt = $('#frm_heure_txt').value.trim();
    c.ppa = $('#frm_ppa').value.trim();
    c.plage = $('#frm_plage').value.trim();
    c.chef = $('#frm_chef').value.trim();

    const b = state.bus;
    b.heure = $('#frm_bus_heure').value.trim();
    b.cie = $('#frm_bus_cie').value.trim();
    b.pays = $('#frm_bus_pays').value.trim();
    b.immat = $('#frm_bus_immat').value.trim();
    b.orig = $('#frm_bus_orig').value.trim();
    b.dest = $('#frm_bus_dest').value.trim();
  }

  function renderAssist(){
    assistList.innerHTML = '';
    state.assistants.forEach((as,i)=>{
      const row = document.createElement('div');
      row.className='item';
      row.innerHTML = `
        <input placeholder="Grade" value="${as.grade||''}">
        <input placeholder="Nom" value="${as.nom||''}">
        <input placeholder="Prénom" value="${as.prenom||''}">
        <input placeholder="Unité" value="${as.unite||''}">
        <select>
          <option value="M" ${as.sexe==='M'?'selected':''}>M</option>
          <option value="F" ${as.sexe==='F'?'selected':''}>F</option>
        </select>
        <button class="del" title="Retirer">✕</button>
      `;
      const [g, n, p, u, s, btn] = row.children;
      g.oninput=()=>as.grade=g.value; n.oninput=()=>as.nom=n.value; p.oninput=()=>as.prenom=p.value; u.oninput=()=>as.unite=u.value; s.onchange=()=>as.sexe=s.value;
      btn.onclick=()=>{ state.assistants.splice(i,1); renderAssist(); save(); };
      assistList.appendChild(row);
    });
  }

  function renderEsi(){
    esiList.innerHTML = '';
    state.esi.forEach((e,i)=>{
      const row = document.createElement('div');
      row.className='item';
      row.innerHTML = `
        <input placeholder="Nom" value="${e.nom||''}">
        <input placeholder="Prénom" value="${e.prenom||''}">
        <input placeholder="Date de naissance (JJ/MM/AAAA)" value="${e.naissance||''}">
        <input placeholder="Lieu de naissance" value="${e.lieu||''}">
        <input placeholder="Nationalité" value="${e.nationalite||''}">
        <select>
          <option value="M" ${e.sexe==='M'?'selected':''}>M</option>
          <option value="F" ${e.sexe==='F'?'selected':''}>F</option>
        </select>
        <button class="del" title="Retirer">✕</button>
      `;
      const [n, p, d, l, nat, s, btn] = row.children;
      n.oninput=()=>e.nom=n.value; p.oninput=()=>e.prenom=p.value; d.oninput=()=>e.naissance=d.value; l.oninput=()=>e.lieu=l.value; nat.oninput=()=>e.nationalite=nat.value; s.onchange=()=>e.sexe=s.value;
      btn.onclick=()=>{ state.esi.splice(i,1); renderEsi(); save(); };
      esiList.appendChild(row);
    });
  }

  function artLeLa(sex){ return sex==='F'?'la':'le'; }
  function soussigne(sex){ return sex==='F'?'Soussignée':'Soussigné'; }
  function assiste(sex){ return sex==='F'?'assistée':'assisté'; }
  function neNee(sex){ return sex==='F'?'née':'né'; }
  function monsieurMadame(sex){ return sex==='F'?'Madame':'Monsieur'; }
  function assistantWord(n){ return n>1 ? 'assistants' : 'assistant'; }

  function buildESIBlocks(){
    if(state.esi.length===0){
      return `<div class="pv-block">— Il s’agit de : —</div>
      <div class="pv-block">— <span class="var">[Identité à compléter]</span>. —</div>`;
    }
    const parts = [`<div class="pv-block">— Il s’agit de : —</div>`];
    state.esi.forEach(e=>{
      const civil = `${monsieurMadame(e.sexe)} ${e.nom||'[NOM]'} ${e.prenom||'[Prénom]'} ${neNee(e.sexe)} le ${e.naissance||'[JJ/MM/AAAA]'} à ${e.lieu||'[Lieu]'} (${(e.nationalite||'').toUpperCase()||'NAT.'}), de nationalité ${e.nationalite||'[Nationalité]'}, de sexe ${e.sexe==='F'?'féminin':'masculin'}, majeur.`;
      parts.push(`<div class="pv-block">— ${civil} —</div>`);
    });
    return parts.join('\n');
  }

  function buildAssistPara(){
    const N = state.assistants.length;
    if(N===0) return '';
    const arr = state.assistants.map(a=>`${a.grade||'Gendarme'} ${a.nom||'[NOM]'} ${a.prenom||'[Prénom]'}, Agent de Police Judiciaire Adjoint (APJA), affecté${a.sexe==='F'?'e':''} à la ${a.unite||'[Unité]'}`);
    return `<div class="pv-block">
      ${assiste(state.agent.sexe)} de ${arr.join(' ; ')}
    </div>`;
  }

  function generatePV(){
    pullForm(); save();

    const a = state.agent, c = state.contexte, b = state.bus;
    const Nassist = state.assistants.length;

    const header = `
      <div class="line">MINISTERE DE L'INTERIEUR</div>
      <div class="line">-------------------</div>
      <div class="line">DIRECTION GENERALE</div>
      <div class="line">DE LA POLICE NATIONALE</div>
      <div class="line">DIRECTION GÉNÉRALE DE LA GENDARMERIE     NATIONALE</div>
    `;

    const blocks = [
      `<div class="pv-title">REPUBLIQUE FRANCAISE</div>`,
      `<div class="pv-title">RAPPORT DE SAISINE</div>`,
      `<div class="pv-block">L'an ${c.annee},</div>`,
      `<div class="pv-block">Le ${c.dateTxt}, à ${c.heureTxt}</div>`,
      `<div class="pv-block">NOUS :</div>`,
      `<div class="pv-block">
        ${soussigne(a.sexe)} ${a.grade||'GND'} ${a.nom||'[NOM]'} ${a.prenom||'[Prénom]'}, Agent de Police Judiciaire Adjoint (APJA), affecté${a.sexe==='F'?'e':''} à la ${a.unite||'CRT 06/1 Nice'},
      </div>`,
      buildAssistPara(),
      `<div class="pv-block">En fonction du Groupement de Gendarmerie Départementale des Alpes Maritimes, et détachés pour emplois au profit de Lutte contre l’Immigration Irrégulière et Clandestine, dans le cadre du dispositif Border Force 06</div>`,
      `<div class="pv-block">— Nous trouvant en mission de lutte contre l’immigration irrégulière et clandestine dans le département des Alpes-Maritimes (06) au point de passage autorisé de ${c.ppa} ce jour de ${c.plage}. —</div>`,
      `<div class="pv-block">— Mis temporairement et nominativement à la disposition de Monsieur le Préfet des Alpes-Maritimes, aux fins d'assurer une mission de lutte contre l'immigration irrégulière dans le département des Alpes-Maritimes. —</div>`,
      `<div class="pv-block">— Agissant conformément aux instructions reçues de Madame la Commissaire Divisionnaire ${c.chef}, Cheffe du Service Départemental de la Police aux Frontières des Alpes-Maritimes. —</div>`,
      `<div class="pv-block">— Vu l'article 21-1 du code de procédure pénale. —</div>`,
      `<div class="pv-block">— Vu les articles 20, D13 D14 et D15 du code de procédure pénale. —</div>`,
      `<div class="pv-block">— Placés sous l'égide de la coordination départementale de la police aux frontières pour assurer la mission de contrôle des points de passage frontaliers. —</div>`,
      `<div class="pv-block">— Vu le titre II du règlement (UE) 2016/399 du Parlement européen et du Conseil du 9 mars 2016 concernant un code de l’Union relatif au régime de franchissement des frontières par les personnes (code frontière Schengen) JO L 077 du 23 mars 2016, p.1. —</div>`,
      `<div class="pv-block">— Vu les articles 5 à 8, 14 et 32 de ce règlement. —</div>`,
      `<div class="pv-block">— Vu la note des autorités françaises notifiant au premier Vice-président de la commission européenne son intention, à compter du 1er mai 2025 et jusqu’au 31 octobre 2025, de prolonger le rétablissement des contrôles aux frontières intérieures de la France avec la Belgique, le Luxembourg, l’Allemagne, l’Italie, l’Espagne, et la confédération Suisse, sur le fondement des articles 25 et 27 du règlement 2016/399 susvisé. —</div>`,
      `<div class="pv-block">— Revêtus de nos uniformes réglementaires et insignes afférents à notre fonction et munis du gilet réfléchissant GENDARMERIE. —</div>`,
      `<div class="pv-block">— Étant positionnés au point de passage autorisé de la barrière de péage de La Turbie, sur l’autoroute A8, dans le sens Italie / France, sur la commune de La Turbie (06). —</div>`,
      `<div class="pv-block">— A ${b.heure}, nous constatons la présence sur la barrière de péage d’un autobus de la compagnie ${b.cie} immatriculé en ${b.pays} sous le numéro ${b.immat} assurant la ligne régulière entre ${b.orig} et ${b.dest}. —</div>`,
      `<div class="pv-block">— Faisons signe réglementairement au conducteur de stationner son véhicule correctement, sur le parking de l’aire de repos du péage de La Turbie, afin de procéder au contrôle de l’identité des passagers du véhicule. —</div>`,
      `<div class="pv-block">— Le conducteur obtempère à notre demande, déclinons notre qualité et le motif de notre contrôle. —</div>`,
      `<div class="pv-block">— Procédons au contrôle d'identité des passagers à bord du véhicule. —</div>`,
      buildESIBlocks(),
      `<div class="pv-block">— Effectuons des recherches le concernant auprès des fichiers de Police mis à notre disposition, à l’aide de notre tablette de service : —</div>`,
      `<div class="pv-block">— FPR : <span class="var">Négatif/Positif</span> —</div>`,
      `<div class="pv-block">— AGDREF : <span class="var">Négatif/Positif</span> —</div>`,
      `<div class="pv-block">— Passé aux fichiers Nationaux il appert qu’à ce jour et sous cette identité il a fait l’objet d’une <span class="var">OQTF</span>. —</div>`,
      `<div class="pv-block">— Rendons immédiatement compte des faits à l’Officier de Police Judiciaire Territorialement Compétent de permanence du poste de la Police Aux Frontières de Saint Louis à Menton, qui nous donne l’ordre de lui présenter <span class="var">l’intéressé</span> dans les plus brefs délais. —</div>`,
      `<div class="pv-block">— Dès lors, nous trouvant en présence d’un étranger en situation irrégulière au voyage, à la circulation ou au séjour sur le territoire national français, —</div>`,
      `<div class="pv-block">— Agissant en vertu des articles L813-1 à L813-16 du Code de l’Entrée et du Séjour des Étrangers et du Droit d’Asile, —</div>`,
      `<div class="pv-block">— Informons l’individu qu’il se trouve en situation irrégulière sur le territoire national français. —</div>`,
      `<div class="pv-block">— Invitons <span class="var">l’intéressé</span> à nous suivre. —</div>`,
      `<div class="pv-block">— Palpé par mesure de sécurité, par un personnel <span class="var">masculin/féminin</span>, il n’est trouvé porteur d’aucun objet dangereux pour autrui ou pour lui-même. —</div>`,
      `<div class="pv-block">— Transportons l’individu sans contrainte ni entraves au poste de la Police Aux Frontières de Saint Louis à Menton, à bord de notre véhicule de service sérigraphié « GENDARMERIE » / translation. —</div>`,
      `<div class="pv-block">— Présentons l’individu devant l’Officier de Police Judiciaire Territorialement Compétent de permanence du poste de la Police Aux Frontières de Saint Louis à Menton à <span class="var">[heure]</span>. L’horaire de présentation étant différé eu égard au délai de route. —</div>`,
      `<div class="pv-block">— Dont rapport de saisine que signent avec nous nos ${assistantWord(Nassist)} —</div>`,
      `<div class="pv-block" style="margin-top:12mm; display:flex; justify-content:space-between;">
        <div>L’assistant<br><br><span class="var">[Nom, Grade]</span></div>
        <div style="text-align:right;">L’APJA<br><br><span class="var">${a.nom||'[Nom]'} ${a.prenom||''}, ${a.grade||'[Grade]'}</span></div>
      </div>`
    ];

    sheet.innerHTML = `<div class="line">${header}</div>` + blocks.join('\n');
  }

  // Public API
  window.PVApp = {
    newPV(){
      // defaults
      if(state.assistants.length===0) state.assistants.push({grade:'Gendarme',nom:'',prenom:'',unite:'CRT 06/2 Cannes',sexe:'M'});
      if(state.esi.length===0) state.esi.push({nom:'THIAM',prenom:'Mamadou Moustapha',naissance:'01/01/1992',lieu:'DAKAR (SENEGAL)',nationalite:'sénégalaise',sexe:'M'});
      bindForm(); generatePV(); navigate('show'); save();
    },
    loadPV(){
      load(); bindForm(); generatePV(); navigate('show');
    },
    clearAll(){
      if(confirm('Effacer la sauvegarde locale ?')){ localStorage.removeItem(KEY); location.reload(); }
    },
    back(){ navigate('home'); },
    print(){ window.print(); },
    save(){ pullForm(); save(); alert('Sauvegardé localement.'); },
    addAssistant(){
      state.assistants.push({grade:'Gendarme',nom:'',prenom:'',unite:'',sexe:'M'});
      renderAssist(); save();
    },
    addEsi(){
      state.esi.push({nom:'',prenom:'',naissance:'',lieu:'',nationalite:'',sexe:'M'});
      renderEsi(); save();
    },
    generate(){ generatePV(); }
  };

  // init
  load(); // stays on home until user starts
})();