// Cloudflare Worker: app + Web Push reminders (single file)
const APP=`<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8"><script>function _e(t){var d=document.createElement('pre');d.style.cssText='white-space:pre-wrap;padding:12px;margin:0;color:#c00;direction:ltr;font-size:13px';d.textContent=t;(document.body||document.documentElement).appendChild(d)}window.addEventListener('error',function(e){_e('ERR: '+e.message+' @'+e.lineno+':'+e.colno)});window.addEventListener('unhandledrejection',function(e){_e('REJ: '+(e.reason&&e.reason.message||e.reason))})</script>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="کارهای من">
<title>کارهای من</title>
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon.png">
<meta name="theme-color" content="#5b5ff0">
<style>
:root{--bg:#f4f5f9;--card:#fff;--tx:#1b1d27;--mu:#7a7f93;--pr:#5b5ff0;--bd:#e5e7ef;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#12131a;--card:#1d1f2a;--tx:#eceef6;--mu:#989db3;--bd:#2d3040;color-scheme:dark}}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;background:var(--bg);color:var(--tx);font-family:-apple-system,"Vazirmatn",Tahoma,sans-serif}
:root{padding-top:env(safe-area-inset-top,0px)}
#app{max-width:520px;margin:0 auto;padding:12px 14px 110px}
h1{font-size:20px;margin:6px 0 10px}
.chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:8px}
.chip{flex:none;padding:6px 12px;border-radius:99px;border:1px solid var(--bd);background:var(--card);font-size:13px;color:var(--tx)}
.chip.on{background:var(--pr);color:#fff;border-color:var(--pr)}
.task{display:flex;align-items:center;gap:10px;background:var(--card);border-radius:14px;padding:12px;margin:8px 0;border-inline-start:5px solid var(--c)}
.task.done .t{text-decoration:line-through;opacity:.5}
.chk{width:26px;height:26px;border-radius:50%;border:2px solid var(--c);background:none;flex:none;color:#fff;font-size:14px}
.task.done .chk{background:var(--c)}
.t{flex:1;font-size:15px}.s{font-size:12px;color:var(--mu);margin-top:2px}
.x{border:0;background:none;color:var(--mu);font-size:18px;padding:4px}
.cal{background:var(--card);border-radius:16px;padding:10px}
.ch{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-weight:700}
.ch button{border:0;background:var(--bg);color:var(--tx);width:34px;height:34px;border-radius:10px;font-size:16px}
.g{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center}
.wd{font-size:11px;color:var(--mu);padding:4px 0}
.dy{aspect-ratio:1;border:0;border-radius:10px;background:none;color:var(--tx);font-size:14px;position:relative}
.dy.today{border:1.5px solid var(--pr)}.dy.sel{background:var(--pr);color:#fff}
.dy i{position:absolute;bottom:4px;left:50%;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:var(--pr)}
.dy.sel i{background:#fff}
.nav{position:fixed;bottom:0;left:0;right:0;display:flex;background:var(--card);border-top:1px solid var(--bd);padding-bottom:env(safe-area-inset-bottom,0px);z-index:5}
.nav button{flex:1;border:0;background:none;padding:12px 0;font-size:12px;color:var(--mu)}
.nav button.on{color:var(--pr);font-weight:700}
.fab{position:fixed;bottom:calc(70px + env(safe-area-inset-bottom,0px));left:18px;width:56px;height:56px;border-radius:50%;border:0;background:var(--pr);color:#fff;font-size:30px;box-shadow:0 6px 18px rgba(0,0,0,.3);z-index:6}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-end;z-index:20}
.sh{background:var(--card);width:100%;max-width:520px;margin:0 auto;border-radius:20px 20px 0 0;padding:16px;max-height:90vh;overflow:auto;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px))}
label{display:block;font-size:12px;color:var(--mu);margin:10px 0 4px}
input,select{width:100%;padding:10px;border-radius:10px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);font:inherit;font-size:16px}
.row{display:flex;gap:8px}.row>*{flex:1}
.pill{padding:8px 4px;border-radius:10px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);font-size:13px}
.pill.on{background:var(--pr);color:#fff;border-color:var(--pr)}
.btn{width:100%;padding:13px;border:0;border-radius:12px;background:var(--pr);color:#fff;font-size:16px;margin-top:14px}
.btn.g2{background:var(--bg);color:var(--tx)}
.empty{text-align:center;color:var(--mu);padding:40px 0}
.al{background:#e5484d;color:#fff;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;padding:30px;animation:fl 1s infinite}
@keyframes fl{50%{background:#b3262b}}
.al b{font-size:26px}.al button{padding:14px 40px;border-radius:14px;border:0;font-size:18px;background:#fff;color:#b3262b}
.hint{font-size:12px;color:var(--mu);background:var(--card);border-radius:12px;padding:10px;margin:8px 0}
</style>
</head>
<body><script>function _e(m){var d=document.createElement('pre');d.style.cssText='background:#fee;color:#900;padding:10px;white-space:pre-wrap;direction:ltr;font-size:12px;margin:0';d.textContent='JS error: '+m;(document.body||document.documentElement).prepend(d)}window.onerror=function(m,s,l,c){_e(m+' line '+l)};window.onunhandledrejection=function(e){_e(String(e.reason))}</script>
<div id="app" style="padding:30px;text-align:center">در حال بارگذاری…</div>
<div id="modal"></div>
<script>
// ---------- helpers ----------
const fa=n=>String(n).replace(/\\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const MN=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const WD=['ش','ی','د','س','چ','پ','ج'];
const WDF=['یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه'];
const fmt=new Intl.DateTimeFormat('en-u-ca-persian-nu-latn',{year:'numeric',month:'numeric',day:'numeric'});
// Safari's built-in Persian calendar does the Gregorian<->Jalali conversion (no hand-rolled algorithm)
function pj(d){const o={};fmt.formatToParts(d).forEach(p=>{if(p.type!=='literal')o[p.type]=parseInt(p.value)});return{y:o.year,m:o.month,d:o.day}}
const key=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const pk=k=>{const[a,b,c]=k.split('-').map(Number);return new Date(a,b-1,c)};
const addD=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const jtext=k=>{const d=pk(k),p=pj(d);return WDF[d.getDay()]+' '+fa(p.d)+' '+MN[p.m-1]+' '+fa(p.y)};
function monthStart(y,m){let d=new Date(y+621,2,21);d=addD(d,Math.round((m-1)*30.4));
 for(let i=0;i<80;i++){const p=pj(d),a=p.y*12+p.m,t=y*12+m;if(a<t)d=addD(d,1);else if(a>t)d=addD(d,-1);else{d=addD(d,-(p.d-1));break}}return d}
// ---------- state ----------
const COLORS=['#5b5ff0','#e5484d','#30a46c','#f5a524','#0ea5e9','#d946ef','#f97316'];
let S={cats:[{id:'c1',name:'کار',color:'#5b5ff0'},{id:'c2',name:'شخصی',color:'#30a46c'},{id:'c3',name:'ورزش',color:'#f97316'},{id:'c4',name:'مطالعه',color:'#d946ef'}],tasks:[]};
try{const r=localStorage.getItem('todo-fa-v1');if(r)S=JSON.parse(r)}catch(e){}
const save=()=>{try{localStorage.setItem('todo-fa-v1',JSON.stringify(S))}catch(e){}syncSoon()};
let tab='today',filt='all',sel=key(new Date()),cur=(()=>{const p=pj(new Date());return{y:p.y,m:p.m}})();
const cat=id=>S.cats.find(c=>c.id===id)||{name:'—',color:'#999'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// does a task occur on date k?
function occurs(t,k){
 if(k<t.date)return false;
 if(t.repeat==='none')return k===t.date;
 if(t.repeat==='daily')return true;
 if(t.repeat==='weekly')return (t.days&&t.days.length?t.days:[pk(t.date).getDay()]).includes(pk(k).getDay());
 if(t.repeat==='monthly')return pj(pk(k)).d===pj(pk(t.date)).d;
 return false}
const isDone=(t,k)=>!!(t.done&&t.done[k]);
// ---------- render ----------
function taskHTML(t,k){const c=cat(t.cat),d=isDone(t,k);
 const rep={none:'',daily:' · هر روز',weekly:' · هفتگی',monthly:' · ماهانه'}[t.repeat];
 return \`<div class="task \${d?'done':''}" style="--c:\${c.color}"><button class="chk" onclick="tog('\${t.id}','\${k}')">\${d?'✓':''}</button>
 <div class="t" onclick="openForm('\${t.id}')">\${esc(t.title)}<div class="s">\${fa(t.time||'')} · \${esc(c.name)}\${rep}\${t.type==='long'?' · ددلاین '+jtext(t.date).split(' ').slice(1).join(' '):''}</div></div>
 <button class="x" onclick="del('\${t.id}')">🗑</button></div>\`}
const fl=t=>filt==='all'||t.cat===filt;
function list(items,empty){return items.length?items.join(''):\`<div class="empty">\${empty}</div>\`}
function render(){
 const today=key(new Date());let h='';
 h+=\`<h1>\${{today:'امروز',cal:'تقویم',long:'برنامه‌ی بلندمدت',done:'انجام‌شده‌ها'}[tab]}</h1>\`;
 h+=\`<div class="chips"><button class="chip \${filt==='all'?'on':''}" onclick="setF('all')">همه</button>\`+S.cats.map(c=>\`<button class="chip \${filt===c.id?'on':''}" style="\${filt===c.id?'':'border-color:'+c.color}" onclick="setF('\${c.id}')">● \${esc(c.name)}</button>\`).join('')+\`<button class="chip" onclick="catForm()">＋ دسته</button></div>\`;
 if(tab==='today'){
  const tt=S.tasks.filter(t=>t.type==='daily'&&fl(t)&&occurs(t,today)).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
  h+=\`<div class="s" style="margin:4px 2px">\${jtext(today)}</div>\`+list(tt.map(t=>taskHTML(t,today)),'برای امروز کاری نداری 🎉');
  const lg=S.tasks.filter(t=>t.type==='long'&&fl(t)&&t.date===today);
  if(lg.length)h+=\`<h1 style="font-size:15px">ددلاین امروز</h1>\`+lg.map(t=>taskHTML(t,today)).join('');
  h+=\`<div class="hint" id="perm"></div>\`;
 }
 if(tab==='cal'){
  const f=monthStart(cur.y,cur.m),off=(f.getDay()+1)%7;let g=WD.map(w=>\`<div class="wd">\${w}</div>\`).join('')+'<div></div>'.repeat(off);
  for(let d=new Date(f);pj(d).m===cur.m;d=addD(d,1)){const k=key(d),has=S.tasks.some(t=>fl(t)&&occurs(t,k));
   g+=\`<button class="dy \${k===today?'today':''} \${k===sel?'sel':''}" onclick="pick('\${k}')">\${fa(pj(d).d)}\${has?'<i></i>':''}</button>\`}
  h+=\`<div class="cal"><div class="ch"><button onclick="mv(1)">›</button><span>\${MN[cur.m-1]} \${fa(cur.y)}</span><button onclick="mv(-1)">‹</button></div><div class="g">\${g}</div></div>\`;
  h+=\`<div class="s" style="margin:12px 2px 0">\${jtext(sel)} (\${sel})</div>\`+list(S.tasks.filter(t=>fl(t)&&occurs(t,sel)).sort((a,b)=>(a.time||'').localeCompare(b.time||'')).map(t=>taskHTML(t,sel)),'کاری در این روز نیست');
 }
 if(tab==='long'){
  const lg=S.tasks.filter(t=>t.type==='long'&&fl(t)&&!isDone(t,t.date)).sort((a,b)=>a.date.localeCompare(b.date));
  h+=list(lg.map(t=>{const n=Math.round((pk(t.date)-pk(today))/864e5);return taskHTML(t,t.date).replace('</div></div>',\`</div><div class="s" style="color:\${n<0?'#e5484d':'var(--pr)'}">\${n<0?fa(-n)+' روز گذشته':n===0?'امروز':fa(n)+' روز مانده'}</div></div>\`)}),'هدف بلندمدتی ثبت نشده');
  const up=S.tasks.filter(t=>t.type==='daily'&&fl(t)&&t.repeat==='none'&&t.date>today);
  if(up.length)h+=\`<h1 style="font-size:15px">کارهای آینده</h1>\`+up.sort((a,b)=>a.date.localeCompare(b.date)).map(t=>taskHTML(t,t.date)).join('');
 }
 if(tab==='done'){
  const dn=[];S.tasks.forEach(t=>{if(fl(t))Object.keys(t.done||{}).forEach(k=>{if(t.done[k])dn.push([k,t])})});
  dn.sort((a,b)=>b[0].localeCompare(a[0]));h+=list(dn.map(([k,t])=>\`<div class="s" style="margin-top:8px">\${jtext(k)}</div>\`+taskHTML(t,k)),'هنوز چیزی انجام نشده');
 }
 document.getElementById('app').innerHTML=h+\`
 <button class="fab" onclick="openForm()">+</button>
 <div class="nav">\${[['today','امروز','☀️'],['cal','تقویم','📅'],['long','بلندمدت','🎯'],['done','انجام‌شده','✅']].map(([k,l,i])=>\`<button class="\${tab===k?'on':''}" onclick="tab='\${k}';render()">\${i}<br>\${l}</button>\`).join('')}</div>\`;
 permUI()}
function permUI(){const e=document.getElementById('perm');if(!e)return;
 const st=('Notification' in window)?Notification.permission:'none';
 e.innerHTML=st==='granted'?'🔔 اعلان فعال است. آلارم فقط وقتی برنامه باز باشد با صدا زنگ می‌خورد.':st==='none'?'اعلان در این مرورگر پشتیبانی نمی‌شود. برنامه را به صفحه‌ی اصلی اضافه کن.':'<button class="btn" style="margin:0" onclick="askPerm()">فعال‌سازی اعلان و آلارم</button>'}
function askPerm(){try{Notification.requestPermission().then(()=>{unlockAudio();permUI()})}catch(e){}unlockAudio()}
const setF=f=>{filt=f;render()};
const pick=k=>{sel=k;render()};
function mv(n){let m=cur.m+n,y=cur.y;if(m>12){m=1;y++}if(m<1){m=12;y--}cur={y,m};render()}
function tog(id,k){const t=S.tasks.find(x=>x.id===id);t.done=t.done||{};t.done[k]=!t.done[k];save();render()}
function del(id){if(confirm('این کار حذف شود؟')){S.tasks=S.tasks.filter(t=>t.id!==id);save();render()}}
// ---------- forms ----------
let F={};
function openForm(id){const t=id?S.tasks.find(x=>x.id===id):null;
 F=t?{...t,days:[...(t.days||[])]}:{id:'t'+Date.now(),title:'',cat:(S.cats[0]||{}).id,type:'daily',date:tab==='cal'?sel:key(new Date()),time:'08:00',repeat:'daily',days:[],done:{}};F.isNew=!t;formUI()}
function formUI(){
 const dn=['ش','ی','د','س','چ','پ','ج'],map=[6,0,1,2,3,4,5];
 document.getElementById('modal').innerHTML=\`<div class="ov" onclick="if(event.target===this)closeM()"><div class="sh">
 <b>\${F.isNew?'کار جدید':'ویرایش کار'}</b>
 <label>عنوان</label><input id="f_t" value="\${esc(F.title)}" placeholder="مثلاً: ورزش صبحگاهی" oninput="F.title=this.value">
 <label>نوع برنامه</label><div class="row"><button class="pill \${F.type==='daily'?'on':''}" onclick="F.type='daily';if(F.repeat==='none')F.repeat='daily';formUI()">روزانه</button><button class="pill \${F.type==='long'?'on':''}" onclick="F.type='long';F.repeat='none';formUI()">بلندمدت</button></div>
 <label>دسته‌بندی</label><div class="chips">\${S.cats.map(c=>\`<button class="chip \${F.cat===c.id?'on':''}" style="\${F.cat===c.id?'background:'+c.color+';border-color:'+c.color:''}" onclick="F.cat='\${c.id}';formUI()">\${esc(c.name)}</button>\`).join('')}</div>
 <div class="row"><div><label>\${F.type==='long'?'ددلاین':'تاریخ شروع'}</label><input type="date" value="\${F.date}" onchange="F.date=this.value;formUI()"></div><div><label>ساعت</label><input type="time" value="\${F.time}" onchange="F.time=this.value"></div></div>
 <div class="s" style="margin-top:4px">\${jtext(F.date)}</div>
 \${F.type==='daily'?\`<label>تکرار</label><div class="row">\${[['none','یک‌بار'],['daily','روزانه'],['weekly','هفتگی'],['monthly','ماهانه']].map(([k,l])=>\`<button class="pill \${F.repeat===k?'on':''}" onclick="F.repeat='\${k}';formUI()">\${l}</button>\`).join('')}</div>
 \${F.repeat==='weekly'?\`<label>روزهای هفته</label><div class="row">\${dn.map((n,i)=>\`<button class="pill \${F.days.includes(map[i])?'on':''}" onclick="tgd(\${map[i]})">\${n}</button>\`).join('')}</div>\`:''}\`:''}
 <button class="btn" onclick="saveT()">ذخیره</button><button class="btn g2" onclick="closeM()">انصراف</button></div></div>\`}
function tgd(d){F.days=F.days.includes(d)?F.days.filter(x=>x!==d):[...F.days,d];formUI()}
function saveT(){if(!F.title.trim()){alert('عنوان را وارد کن');return}
 const{isNew,...t}=F;t.title=t.title.trim();const i=S.tasks.findIndex(x=>x.id===t.id);if(i<0)S.tasks.push(t);else S.tasks[i]=t;save();closeM();render();if(isNew)askPermSoft()}
function askPermSoft(){try{if(Notification.permission==='default')askPerm()}catch(e){}}
const closeM=()=>document.getElementById('modal').innerHTML='';
function catForm(){let col=COLORS[0];window._cc=col;
 const draw=()=>{document.getElementById('modal').innerHTML=\`<div class="ov" onclick="if(event.target===this)closeM()"><div class="sh"><b>دسته‌بندی‌ها</b>
 \${S.cats.map(c=>\`<div class="task" style="--c:\${c.color}"><div class="t">\${esc(c.name)}</div><button class="x" onclick="delCat('\${c.id}')">🗑</button></div>\`).join('')}
 <label>دسته‌ی جدید</label><input id="cn" placeholder="نام دسته"><div class="row" style="margin-top:8px">\${COLORS.map(c=>\`<button class="pill" style="background:\${c};height:34px;\${window._cc===c?'outline:3px solid var(--tx)':''}" onclick="window._cc='\${c}';window._d()"></button>\`).join('')}</div>
 <button class="btn" onclick="addCat()">افزودن</button><button class="btn g2" onclick="closeM();render()">بستن</button></div></div>\`};
 window._d=()=>{const v=(document.getElementById('cn')||{}).value;draw();if(v)document.getElementById('cn').value=v};draw()}
function addCat(){const n=document.getElementById('cn').value.trim();if(!n)return;S.cats.push({id:'c'+Date.now(),name:n,color:window._cc});save();catForm()}
function delCat(id){if(S.tasks.some(t=>t.cat===id)){alert('این دسته کار دارد');return}S.cats=S.cats.filter(c=>c.id!==id);save();catForm()}
// ---------- alarm ----------
let ac=null,osc=null,beepT=null;const fired={};
function unlockAudio(){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume()}catch(e){}}
document.addEventListener('touchstart',unlockAudio,{once:true});document.addEventListener('click',unlockAudio,{once:true});
function ring(){unlockAudio();if(!ac)return;let on=false;beepT=setInterval(()=>{try{const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=880;o.connect(g);g.connect(ac.destination);g.gain.value=.4;o.start();o.stop(ac.currentTime+.35)}catch(e){}if(navigator.vibrate)navigator.vibrate(300)},700)}
function stopRing(id,k,snooze){clearInterval(beepT);beepT=null;document.getElementById('modal').innerHTML='';
 if(snooze){const t=S.tasks.find(x=>x.id===id);setTimeout(()=>showAlarm(t,k),5*60000)}else if(id){const t=S.tasks.find(x=>x.id===id);t.done=t.done||{};t.done[k]=true;save();render()}}
function showAlarm(t,k){if(beepT)return;
 document.getElementById('modal').innerHTML=\`<div class="ov al"><div style="font-size:60px">⏰</div><b>\${esc(t.title)}</b><div>\${fa(t.time)}</div>
 <button onclick="stopRing('\${t.id}','\${k}',false)">انجام شد ✓</button><button style="background:transparent;color:#fff;border:1px solid #fff;font-size:15px" onclick="stopRing('\${t.id}','\${k}',true)">۵ دقیقه بعد</button></div>\`;
 ring();try{if(Notification.permission==='granted')new Notification('⏰ '+t.title,{body:'زمان کار رسید',tag:t.id+k})}catch(e){}}
function tick(){const n=new Date(),k=key(n),hm=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0');
 S.tasks.forEach(t=>{const f=t.id+k+t.time;if(t.time===hm&&!fired[f]&&!isDone(t,k)&&occurs(t,k)){fired[f]=1;showAlarm(t,k)}})}
setInterval(tick,5000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick()});
// ---------- background push (Cloudflare Worker) ----------
const DID=(()=>{let v;try{v=localStorage.getItem('did')}catch(e){}if(!v){v=Math.random().toString(36).slice(2)+Date.now().toString(36);try{localStorage.setItem('did',v)}catch(e){}}return v})();
const standalone=!!navigator.standalone;
const TZ=()=>Intl.DateTimeFormat().resolvedOptions().timeZone;
let syncT=null;
function syncSoon(){clearTimeout(syncT);syncT=setTimeout(syncNow,1500)}
function post(u,b){return fetch(u,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(b)})}
function syncNow(){try{post('/api/sync',{id:DID,tz:TZ(),tasks:S.tasks}).catch(()=>{})}catch(e){}}
const b64u=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-s.length%4)%4);return Uint8Array.from(atob(s),c=>c.charCodeAt(0))};
async function enablePush(){
 try{
  if(!('serviceWorker' in navigator)||!('PushManager' in window)){alert('Push پشتیبانی نمی‌شود. برنامه را از Add to Home Screen نصب کن و از آیکن اجرا کن.');return}
  const reg=await navigator.serviceWorker.register('/sw.js');await navigator.serviceWorker.ready;
  const p=await Notification.requestPermission();if(p!=='granted'){permUI();return}
  const k=await (await fetch('/api/key')).text();
  let sub=await reg.pushManager.getSubscription();
  if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64u(k)});
  await post('/api/subscribe',{id:DID,tz:TZ(),tasks:S.tasks,sub:sub.toJSON()});
  try{localStorage.setItem('push','1')}catch(e){}
  permUI();
 }catch(e){alert('خطا: '+e.message)}
}
async function testPush(){try{const r=await post('/api/test',{id:DID});alert(r.ok?'ارسال شد؛ چند ثانیه صبر کن':'ناموفق: '+await r.text())}catch(e){alert('خطا: '+e.message)}}
function permUI(){const e=document.getElementById('perm');if(!e)return;
 let on=false;try{on=localStorage.getItem('push')==='1'&&Notification.permission==='granted'}catch(x){}
 e.innerHTML=!standalone?'برای یادآوری وقتی برنامه بسته است: Share ← Add to Home Screen، بعد برنامه را از آیکن صفحه‌ی اصلی باز کن.':
  on?'🔔 یادآوری پس‌زمینه فعال است. <button class="chip" onclick="testPush()">ارسال تست</button>':
  '<button class="btn" style="margin:0" onclick="enablePush()">فعال‌سازی یادآوری پس‌زمینه</button>'}
function askPermSoft(){}

render();syncNow();
</script>
</body>
</html>
`;
const SW=`self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('push',e=>{e.waitUntil((async()=>{
 let items=[];
 try{const s=await self.registration.pushManager.getSubscription();
  const r=await fetch('/api/due',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({endpoint:s.endpoint})});items=await r.json()}catch(_){}
 if(!items.length)items=[{title:'یادآوری',body:'زمان یکی از کارهایت رسیده'}];
 for(const it of items)await self.registration.showNotification('⏰ '+it.title,{body:it.body||'زمان کار رسید',tag:it.tag||'t',lang:'fa',dir:'rtl',icon:'/icon.png'});
})())});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('/')))});
`;
const ICON='iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAACVUlEQVR42u3cwXHDMAxFQffJQ/q/pQOngUwyyUgQPrCcVwG4F1skX+fjU/q2lxEIDsEhOASH4BAcgkNwCA7BIcEhOASH4BAcgkNwCA7BITgkOASH4BAcgkNwCA7BITgEhwSH4BAcgkNwCA7BITgEh+AQHBIcgkNwCA7BITgEh+AQHIJDgqNj7+8WHFj8suAgo5cPODJkwAFHLx9wxMiAgww4yPjXgoMMOMiAQ1fJgAMO/3OQAYdyZcBBBhxkwEEGHHDAQYZjgmT0lAEHGXCQAQcZcJABBxxwkNFTBhxkwEEGHGTAQQYccMBBBhxkhMmAgww4yBiAo/8098hohCNirKtkdMGRMlw4Wg+djF04Iqa8UEYkjvpZ75SRiqNy4mtlBOOomftmGdk4CqYPh9+HZAzFcdM2kJH3P0fNZpAxCseFW0JG3reVmo0ho+lX2cd9kJH3yb5sk+DoftjnKR9kZJwEq/dBRtIxwUofZOSdIa3xQUbqAeO7fZCRffr8Vh9wxF9NuMkHGUPurVzug4xRl5ou9EHGwBtv7wZr1d2+sOuQZMDR0cfCW8GRF6nhgKORj4UyTvQTDGTA8bCPtTLOgMdbyIDjAR/LZZwxzz7BAUedDzLOsAfjyIAj73IlHBN8ADEcx2n/IAwcYT5QWITjrz5Q2IXj5LxwCkdTHxDsxfEDEdsPh+AQHIJDcAgOwSE4BIfgMAXBITgEh+AQHIJDcAgOwSE4JDgEh+AQHIJDcAgOwSE4BIcEh+AQHIJDcAgOwSE4BIfgEBymIDgEh+AQHIJDcCiqL+cSLv/nGLP0AAAAAElFTkSuQmCC';
const MANIFEST=JSON.stringify({name:'کارهای من',short_name:'کارهای من',start_url:'/',display:'standalone',background_color:'#12131a',theme_color:'#5b5ff0',lang:'fa',dir:'rtl',icons:[{src:'/icon.png',sizes:'180x180',type:'image/png'}]});
const CONTACT='mailto:admin@example.com'; // can be changed to your own email
const enc=new TextEncoder();
const b64url=buf=>btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const hash=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',enc.encode(s)))].slice(0,12).map(b=>b.toString(16).padStart(2,'0')).join('');

// VAPID keys are generated once and kept in KV
async function vapid(env){
 let k=await env.KV.get('vapid',{type:'json'});
 if(!k){const kp=await crypto.subtle.generateKey({name:'ECDSA',namedCurve:'P-256'},true,['sign','verify']);
  k={pub:b64url(await crypto.subtle.exportKey('raw',kp.publicKey)),priv:await crypto.subtle.exportKey('jwk',kp.privateKey)};
  await env.KV.put('vapid',JSON.stringify(k))}
 return k}

// Push with no payload: only the VAPID JWT is needed (no message encryption)
async function sendPush(env,sub){
 const k=await vapid(env);
 const head=b64url(enc.encode(JSON.stringify({typ:'JWT',alg:'ES256'})));
 const body=b64url(enc.encode(JSON.stringify({aud:new URL(sub.endpoint).origin,exp:Math.floor(Date.now()/1000)+43200,sub:CONTACT})));
 const key=await crypto.subtle.importKey('jwk',k.priv,{name:'ECDSA',namedCurve:'P-256'},false,['sign']);
 const sig=await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},key,enc.encode(head+'.'+body));
 return fetch(sub.endpoint,{method:'POST',headers:{Authorization:'vapid t='+head+'.'+body+'.'+b64url(sig)+', k='+k.pub,TTL:'3600',Urgency:'high'}});
}

// ----- schedule logic (same rules as the app) -----
const pf=new Intl.DateTimeFormat('en-u-ca-persian-nu-latn',{timeZone:'UTC',day:'numeric'});
const noon=k=>new Date(k+'T12:00:00Z');
const pday=k=>parseInt(pf.format(noon(k)));
function occurs(t,k){
 if(k<t.date)return false;
 if(t.repeat==='none')return k===t.date;
 if(t.repeat==='daily')return true;
 if(t.repeat==='weekly')return (t.days&&t.days.length?t.days:[noon(t.date).getUTCDay()]).includes(noon(k).getUTCDay());
 if(t.repeat==='monthly')return pday(k)===pday(t.date);
 return false}
function local(now,tz){
 let p;try{p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(x=>[x.type,x.value]))}
 catch(e){return local(now,'Asia/Tehran')}
 return{date:p.year+'-'+p.month+'-'+p.day,min:+p.hour*60+ +p.minute}}

async function saveDevice(env,b){
 const old=(await env.KV.get('d:'+b.id,{type:'json'}))||{};
 const d={...old,tasks:b.tasks||[],tz:b.tz||old.tz};
 if(b.sub)d.sub=b.sub;
 await env.KV.put('d:'+b.id,JSON.stringify(d));
 const idx=(await env.KV.get('index',{type:'json'}))||[];
 if(!idx.includes(b.id)){idx.push(b.id);await env.KV.put('index',JSON.stringify(idx))}
}
async function notify(env,d,items){
 await env.KV.put('due:'+await hash(d.sub.endpoint),JSON.stringify(items),{expirationTtl:300});
 return sendPush(env,d.sub)}

const H=(t,c)=>new Response(t,{headers:{'content-type':c,'cache-control':'no-cache'}});
export default {
 async fetch(req,env){
  const u=new URL(req.url),p=u.pathname;
  if(p==='/')return H(APP,'text/html;charset=utf-8');
  if(p==='/ping'){let kv;try{await env.KV.put('ping','1');kv='KV ok: '+await env.KV.get('ping')}catch(e){kv='KV error: '+e.message}return H('<meta charset=utf-8><h1>Worker OK</h1><p>'+kv+'</p>','text/html;charset=utf-8')}
  if(p==='/manifest.json')return H(MANIFEST,'application/manifest+json');
  if(p==='/sw.js')return H(SW,'application/javascript');
  if(p==='/icon.png')return new Response(Uint8Array.from(atob(ICON),c=>c.charCodeAt(0)),{headers:{'content-type':'image/png'}});
  if(p==='/ping')return H('ok','text/plain');  if(p==='/api/key')return H((await vapid(env)).pub,'text/plain');
  if(req.method!=='POST')return new Response('not found',{status:404});
  const b=await req.json().catch(()=>({}));
  if(p==='/api/sync'||p==='/api/subscribe'){if(!b.id)return new Response('bad',{status:400});await saveDevice(env,b);return new Response('ok')}
  if(p==='/api/due'){const k='due:'+await hash(b.endpoint||'');const v=await env.KV.get(k)||'[]';await env.KV.delete(k);return H(v,'application/json')}
  if(p==='/api/test'){const d=await env.KV.get('d:'+b.id,{type:'json'});if(!d||!d.sub)return new Response('اشتراک پیدا نشد',{status:404});
   const r=await notify(env,d,[{title:'تست یادآوری',body:'اگر این را می‌بینی همه‌چیز درست است',tag:'test'}]);
   return r.ok?new Response('ok'):new Response('push '+r.status+' '+await r.text(),{status:502})}
  return new Response('not found',{status:404});
 },
 // runs every minute (Cron Trigger)
 async scheduled(ev,env){
  const idx=(await env.KV.get('index',{type:'json'}))||[],now=new Date();
  for(const id of idx){
   const d=await env.KV.get('d:'+id,{type:'json'});if(!d||!d.sub)continue;
   const L=local(now,d.tz||'Asia/Tehran'),due=[];d.fired=d.fired||{};
   for(const t of d.tasks||[]){
    if(!t.time||!occurs(t,L.date)||(t.done&&t.done[L.date]))continue;
    const[h,m]=t.time.split(':').map(Number),diff=L.min-(h*60+m),f=t.id+'|'+L.date+'|'+t.time;
    if(diff<0||diff>2||d.fired[f])continue;   // 2-minute grace window if a cron tick is late
    d.fired[f]=1;due.push({title:t.title,body:'ساعت '+t.time,tag:f})}
   if(!due.length)continue;
   for(const f of Object.keys(d.fired))if(!f.includes('|'+L.date+'|'))delete d.fired[f];
   const r=await notify(env,d,due);
   if(r.status===404||r.status===410)delete d.sub;  // subscription expired
   await env.KV.put('d:'+id,JSON.stringify(d));
  }
 }
};
