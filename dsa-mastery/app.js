const DATA = window.DSA_DATA;
const $ = s => document.querySelector(s);
const stateKey = 'dsaMasteryV1';
const storage = (() => {
  try {
    const test = '__dsa_storage_test__';
    window.localStorage.setItem(test, '1');
    window.localStorage.removeItem(test);
    return window.localStorage;
  } catch (_) {
    const mem = new Map();
    return {
      getItem: k => mem.has(k) ? mem.get(k) : null,
      setItem: (k,v) => mem.set(k, String(v)),
      removeItem: k => mem.delete(k)
    };
  }
})();
let state;
try { state = JSON.parse(storage.getItem(stateKey) || '{}'); } catch (_) { state = {}; }
state.problems ||= {}; state.mastery ||= {}; state.friction ||= []; state.dojo ||= {};
let current = 'dashboard'; let currentBlock = null; let filter = 'All';
const save = () => storage.setItem(stateKey, JSON.stringify(state));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const slug = s => s.toLowerCase().replace(/[^a-z0-9א-ת]+/g,'-');
const daysBetween=(a,b)=>Math.floor((b-a)/(1000*60*60*24));
function problemState(name){ return state.problems[name] ||= {reviewCount:0,lastPracticed:null}; }
function dueInfo(name){
  const p=problemState(name); if(!p.lastPracticed) return {cls:'new',txt:'חדש'};
  const interval=DATA.reviewIntervals[Math.min(Math.max(p.reviewCount-1,0),DATA.reviewIntervals.length-1)];
  const last=new Date(p.lastPracticed+'T12:00:00'); const due=new Date(last); due.setDate(due.getDate()+interval);
  const today=new Date(); today.setHours(0,0,0,0); due.setHours(0,0,0,0); const d=daysBetween(today,due);
  if(d<=0) return {cls:'now',txt:d<0?`באיחור ${Math.abs(d)} ימים`:'לתירגול היום'};
  return {cls:'ok',txt:`חזרה בעוד ${d} ימים`};
}
function logPractice(name){const p=problemState(name);p.reviewCount++;p.lastPracticed=new Date().toISOString().slice(0,10);save();toast('נרשם תרגול — נקבעה חזרה הבאה');render();}
function blockProblemProgress(block){if(!block.problems.length)return 0;return Math.round(block.problems.filter(p=>problemState(p.name).reviewCount>0).length/block.problems.length*100)}
function masteryProgress(id){const m=state.mastery[id]||{};return Math.round(DATA.masteryDimensions.filter(x=>m[x.id]).length/DATA.masteryDimensions.length*100)}
function totalProgress(){const ps=DATA.blocks.flatMap(b=>b.problems); if(!ps.length)return 0; return Math.round(ps.filter(p=>problemState(p.name).reviewCount>0).length/ps.length*100)}
function dueProblems(){return DATA.blocks.flatMap(b=>b.problems.map(p=>({p,b,d:dueInfo(p.name)}))).filter(x=>x.d.cls==='now').slice(0,8)}
function nav(){const items=[['dashboard','⌂','לוח בקרה'],['curriculum','◫','הסילבוס'],['java','{ }','Java Dojo'],['checkpoints','✓','Checkpoints'],['review','◎','Review Board'],['sources','↗','מקורות']];$('#nav').innerHTML=items.map(([id,ic,l])=>`<button class="nav-item ${current===id?'active':''}" data-nav="${id}"><span class="nav-icon">${ic}</span><span>${l}</span></button>`).join('');const existing=$('.sidebar-progress');if(existing)existing.remove();$('#nav').insertAdjacentHTML('afterend',`<div class="sidebar-progress"><div class="sidebar-progress-row"><span>התקדמות כוללת</span><strong>${totalProgress()}%</strong></div><div class="progress"><span style="width:${totalProgress()}%"></span></div></div>`);document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{current=b.dataset.nav;currentBlock=null;render();});}
function hero(title,text){return `<div class="hero"><h2>${title}</h2><p>${text}</p></div>`}
function dashboard(){
  const due=dueProblems(); const core=DATA.blocks.filter(b=>b.priority==='Core').length;
  const touched=DATA.blocks.find(b=>blockProblemProgress(b)>0||masteryProgress(b.id)>0);
  const next=touched || DATA.blocks[0];
  return `<div class="today-card"><div><div class="today-tag">NEXT STEP</div><h3>${touched?'להמשיך מאיפה שעצרת':'מתחילים ב-Java Dojo'}</h3><p>${touched?`${next.id} · ${next.title}`:'A-1 מוריד את החיכוך של Java לפני שנוגעים באלגוריתמים עצמם.'}</p></div><button class="button" data-block="${next.id}">${touched?'פתח בלוק':'פתח A-1'}</button></div>`+
  hero('מסלול DSA לראיונות Senior',DATA.meta.subtitle)+`
  <div class="grid cols-3">
    <div class="card metric-card"><div class="metric-icon">↗</div><div class="mini-label">PROBLEM COVERAGE</div><div class="metric">${totalProgress()}%</div><div class="progress"><span style="width:${totalProgress()}%"></span></div></div>
    <div class="card metric-card"><div class="metric-icon">◫</div><div class="mini-label">CURRICULUM</div><div class="metric">${DATA.blocks.length}</div><div class="muted">${core} בלוקי Core</div></div>
    <div class="card metric-card"><div class="metric-icon">↻</div><div class="mini-label">DUE NOW</div><div class="metric">${due.length}</div><div class="muted">חזרות שהגיע זמנן</div></div>
  </div>
  <div class="section-title"><h2>איך לומדים כאן</h2><p>עקרונות קבועים לאורך כל המסלול</p></div>
  <div class="grid cols-3">${DATA.meta.philosophy.map(x=>`<div class="card philosophy-card"><span class="check">✓</span><h3>${x}</h3></div>`).join('')}</div>
  <div class="section-title"><h2>חזרות שמחכות</h2><p>Spacing + Retrieval</p></div>
  ${due.length?due.map(x=>problemRow(x.p,x.b)).join(''):'<div class="empty">אין כרגע חזרות שממתינות. אחרי התרגול הראשון המערכת תתחיל לתזמן אותן עבורך.</div>'}
  <div class="section-title"><h2>תחילת המסלול</h2><p>הבלוקים הראשונים לפי הסדר</p></div>
  <div class="grid cols-3">${DATA.blocks.slice(0,6).map(blockCard).join('')}</div>`;
}
function blockCard(b){const pp=blockProblemProgress(b),mp=masteryProgress(b.id);return `<div class="card block-card" data-block="${b.id}"><div class="block-head"><div><div class="block-id">${b.id} • ${b.stage}</div><h3>${b.title}</h3></div><span class="pill ${b.priority.toLowerCase()}">${b.priority}</span></div><p>${b.purpose}</p><div class="chip-row">${b.learn.slice(0,4).map(x=>`<span class="pill">${x}</span>`).join('')}</div><div class="mini-label" style="margin-top:14px">Problems touched ${pp}% • Mastery ${mp}%</div><div class="progress"><span style="width:${Math.max(pp,mp)}%"></span></div></div>`}
function curriculum(){return hero('A-1 → A14 + 4 checkpoints','הסדר עבר review מול מסלולי interview, סילבוסים אקדמיים, Java APIs ומחקר למידה. הוא לא משכפל רשימה קיימת אחת.')+`<div class="filterbar">${['All','Core','Important','Targeted'].map(x=>`<button class="ghost small ${filter===x?'active':''}" data-filter="${x}">${x}</button>`).join('')}</div><div class="grid cols-3 curriculum-grid">${DATA.blocks.filter(b=>filter==='All'||b.priority===filter).map(blockCard).join('')}</div>`}
function problemRow(p,b){const d=dueInfo(p.name),s=problemState(p.name);return `<div class="problem"><div><h4><a href="${p.url}" target="_blank" rel="noopener">${p.name} ↗</a></h4><p>${p.why}</p><div class="problem-meta"><span class="pill">${p.difficulty}</span><span class="pill ${slug(p.role)}">${p.role}</span><span class="due ${d.cls}">${d.txt}</span></div></div><div class="problem-actions"><span class="muted small">חזרות: ${s.reviewCount}</span><button class="button small" data-practice="${esc(p.name)}">תרגלתי היום</button></div></div>`}
function blockDetail(b){const m=state.mastery[b.id]||{};return `<div class="detail-header"><div class="detail-title"><div class="block-id">${b.id} • ${b.stage} • ${b.sessions} sessions</div><h2>${b.title}</h2><p>${b.purpose}</p><span class="pill ${b.priority.toLowerCase()}">${b.priority}</span></div><button class="back" id="backCurriculum">← חזרה לסילבוס</button></div>
<div class="grid cols-2"><div class="card"><h3>מה לומדים</h3><ul class="list">${b.learn.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="card"><h3>Signals לזיהוי</h3><ul class="list">${b.recognition.map(x=>`<li>${x}</li>`).join('')}</ul><h3 style="margin-top:20px">Java Pack</h3><ul class="list ltr">${b.java.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>
<div class="section-title"><h2>Canonical Problems</h2><p>Learn → Practice → Transfer; Hard בדרך כלל Stretch</p></div>${b.problems.length?b.problems.map(p=>problemRow(p,b)).join(''):'<div class="empty">בבלוק הזה התרגול הוא Micro-drills ולא LeetCode.</div>'}
<div class="grid cols-2" style="margin-top:18px"><div class="card"><h3>Exit Criteria</h3><ul class="list">${b.exit.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="card"><h3>Mastery Scorecard</h3><div class="mastery-grid">${DATA.masteryDimensions.map(x=>`<label class="mastery-item"><input type="checkbox" data-mastery="${b.id}" data-dim="${x.id}" ${m[x.id]?'checked':''}>${x.label}</label>`).join('')}</div><div class="progress"><span style="width:${masteryProgress(b.id)}%"></span></div></div></div><div class="reviewer" style="margin-top:18px"><strong>Reviewer verdict:</strong> ${b.reviewer}</div>`}
function javaPage(){return hero('Java Dojo','A-1 הוא bootstrap, אבל החזרות ממשיכות בכל בלוק. כל נקודת חיכוך אישית שאתה מגלה נכנסת לרשימה עד שהיא אוטומטית.')+`<div class="card"><h3>Java Friction List</h3><div class="friction-wrap"><input id="frictionInput" placeholder="למשל: PriorityQueue comparator ל-int[]"><button class="button" id="addFriction">הוסף</button></div><div class="friction-list">${state.friction.length?state.friction.map((x,i)=>`<span class="friction">${esc(x)} <button data-friction-remove="${i}">×</button></span>`).join(''):'<span class="muted">ריק כרגע — מצוין. נוסיף רק דברים שבאמת עוצרים אותך.</span>'}</div></div><div class="section-title"><h2>Micro-drills</h2><p>30–90 שניות, בלי IDE</p></div>${DATA.javaDrills.map((d,i)=>`<div class="dojo-item"><div class="dojo-q">${i+1}. ${d.q}</div><div style="margin-top:10px"><button class="ghost small" data-answer="${i}">הצג תשובה</button><button class="ghost small" data-dojo="${i}">${state.dojo[i]?'✓ עברתי':'סמן שעברתי'}</button></div><div class="answer hidden" id="ans-${i}">${esc(d.a)}</div></div>`).join('')}`}
function checkpoints(){return hero('Checkpoints','המבחנים המעורבבים הם המקום שבו אנחנו בודקים recognition אמיתי. אין כותרת של pattern ואין “אנחנו בפרק Sliding Window”.')+`<div class="timeline">${DATA.checkpoints.map(c=>`<div class="step"><strong>${c.id}</strong><span>אחרי ${c.after}</span></div>`).join('')}</div><div class="grid cols-2" style="margin-top:16px">${DATA.checkpoints.map(c=>`<div class="card checkpoint"><div class="block-id">${c.id} • after ${c.after}</div><h3>${c.title}</h3><div class="chip-row">${c.focus.map(x=>`<span class="pill">${x}</span>`).join('')}</div><ul class="list">${c.rules.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>`}
function reviewPage(){return hero('Review Board','ביצעתי passes נפרדים לפי כובעים: curriculum, interview signals, Java, learning science ו-ROI; בסוף pass אינטגרטיבי הכריע בין ההמלצות.')+`<div class="grid cols-2">${DATA.reviewBoard.map(r=>`<div class="card review-card"><div class="verdict">${r.verdict}</div><h3>${r.role}</h3><p class="muted" style="line-height:1.7">${r.finding}</p></div>`).join('')}</div><div class="note" style="margin-top:18px"><strong>החלטה מרכזית:</strong> זו תוכנית כללית לראיונות DSA. התאמות לחברה יכולות לשנות משקל — לדוגמה, המדריך הרשמי הנוכחי של Meta אומר לא להשקיע ב-DP, אבל מסלול כללי לא יכול להשמיט אותו לחלוטין.</div>`}
function sourcesPage(){return hero('מקורות והצלבות','אין source of truth יחיד. הבחירה נעשתה משילוב של interview roadmaps, סילבוסים אקדמיים, docs רשמיים של Java, guidance רשמי של חברות ומחקר למידה.')+`<div class="grid cols-2">${DATA.sources.map(s=>`<div class="card source"><div><div class="mini-label">${s.type}</div><a href="${s.url}" target="_blank" rel="noopener">${s.title} ↗</a><p>${s.note}</p></div></div>`).join('')}</div>`}
function bind(){document.querySelectorAll('[data-block]').forEach(el=>el.onclick=()=>{current='curriculum';currentBlock=DATA.blocks.find(b=>b.id===el.dataset.block);render();});document.querySelectorAll('[data-filter]').forEach(el=>el.onclick=()=>{filter=el.dataset.filter;render();});document.querySelectorAll('[data-practice]').forEach(el=>el.onclick=()=>logPractice(el.dataset.practice));document.querySelectorAll('[data-mastery]').forEach(el=>el.onchange=()=>{state.mastery[el.dataset.mastery]||={};state.mastery[el.dataset.mastery][el.dataset.dim]=el.checked;save();});document.querySelectorAll('[data-answer]').forEach(el=>el.onclick=()=>$('#ans-'+el.dataset.answer).classList.toggle('hidden'));document.querySelectorAll('[data-dojo]').forEach(el=>el.onclick=()=>{state.dojo[el.dataset.dojo]=!state.dojo[el.dataset.dojo];save();render();});document.querySelectorAll('[data-friction-remove]').forEach(el=>el.onclick=()=>{state.friction.splice(+el.dataset.frictionRemove,1);save();render();});if($('#addFriction'))$('#addFriction').onclick=()=>{const v=$('#frictionInput').value.trim();if(v){state.friction.push(v);save();render();}};if($('#backCurriculum'))$('#backCurriculum').onclick=()=>{currentBlock=null;render();};}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function render(){nav();let html='';let title='לוח בקרה';if(currentBlock){html=blockDetail(currentBlock);title=currentBlock.title}else if(current==='dashboard'){html=dashboard()}else if(current==='curriculum'){html=curriculum();title='הסילבוס'}else if(current==='java'){html=javaPage();title='Java Dojo'}else if(current==='checkpoints'){html=checkpoints();title='Checkpoints'}else if(current==='review'){html=reviewPage();title='Review Board'}else if(current==='sources'){html=sourcesPage();title='מקורות'};$('#pageTitle').textContent=title;$('#content').innerHTML=html;bind();const q=$('#globalSearch').value.trim().toLowerCase();if(q&&!currentBlock){const matches=DATA.blocks.filter(b=>JSON.stringify(b).toLowerCase().includes(q));if(matches.length){$('#content').insertAdjacentHTML('afterbegin',`<div class="section-title"><h2>תוצאות חיפוש</h2><p>${matches.length} blocks</p></div><div class="grid cols-3">${matches.map(blockCard).join('')}</div>`);document.querySelectorAll('[data-block]').forEach(el=>el.onclick=()=>{current='curriculum';currentBlock=DATA.blocks.find(b=>b.id===el.dataset.block);render();});}}
}
$('#globalSearch').addEventListener('input',()=>render());$('#resetBtn').onclick=()=>{if(confirm('לאפס את כל ההתקדמות המקומית באתר?')){storage.removeItem(stateKey);location.reload();}};render();