/* Keşif özellikleri: oynatıcıdan bağımsız arayüz ve yerel tercihler. */
const depodan = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch {return fallback;} };
function depoya(key, value) {try {localStorage.setItem(key,JSON.stringify(value));} catch { /* Gizli modda oturum boyunca çalışır. */ }}
const kayitliIzlenen = depodan('cinespace-watched',[]);
const KESIF = {gorunum:'canvas',secki:'',baslangic:0,bitis:0,puan:0,gizle:false,
  izlenen:new Set(Array.isArray(kayitliIzlenen)?kayitliIzlenen:[]),son:[],vurgulu:null};
const eskiSon = depodan('cinespace-recent',[]);
KESIF.son = Array.isArray(eskiSon) ? eskiSon.filter(f=>f && typeof f.id==='string' && f.yer && Array.isArray(f.turler)).slice(0,12):[];
let gorunumHazir=false;
function kesifSorgusu() {
  const q={sort_by:KESIF.secki==='top'?'vote_average.desc':'popularity.desc','vote_count.gte':'100'};
  if(KESIF.baslangic) q['primary_release_date.gte']=KESIF.baslangic+'-01-01';
  if(KESIF.bitis) q['primary_release_date.lte']=KESIF.bitis+'-12-31';
  if(KESIF.puan) q['vote_average.gte']=String(KESIF.puan);
  return q;
}
function gelismisFiltreyeUyar(f) {
  const yil=Number(f.yil),puan=Number(f.puan);
  return (!KESIF.baslangic || yil>=KESIF.baslangic) && (!KESIF.bitis || (yil>0 && yil<=KESIF.bitis)) &&
    (!KESIF.puan || puan>=KESIF.puan) && (!KESIF.gizle || !KESIF.izlenen.has(f.id));
}
function gelismisSifirla() {
  Object.assign(KESIF,{secki:'',baslangic:0,bitis:0,puan:0,gizle:false});
  $('yearFrom').value='';$('yearTo').value='';$('minRating').value='0';$('hideWatched').checked=false;$('collection').value='';$('filterMessage').textContent='';
}
function kartHizliDugmeler(kart,f) {
  // The article contains two sibling buttons, avoiding nested interactive roles.
  kart.removeAttribute('role');kart.removeAttribute('tabindex');
  const ac=document.createElement('button');ac.type='button';ac.className='card-open';ac.setAttribute('aria-label',f.ad+' detaylarını aç');
  ac.addEventListener('click',e=>{e.stopPropagation();detayAc(f);});kart.appendChild(ac);
  const ekle=document.createElement('button');ekle.type='button';ekle.className='quick-add';
  ekle.addEventListener('click',e=>{e.stopPropagation();listeyeEkleCikar(f);kartRozetleriniGuncelle();});kart.appendChild(ekle);
  const iz=document.createElement('span');iz.className='watched-badge';iz.textContent='✓ İzlendi';kart.appendChild(iz);
  kartRozet(kart,f.id);
}
function kartRozet(kart,id) {
  const ekle=kart.querySelector('.quick-add'),varMi=DURUM.liste.has(id);
  if(ekle){ekle.textContent=varMi?'✓':'+';ekle.setAttribute('aria-label',varMi?'Listemden çıkar':'Listeme ekle');ekle.setAttribute('aria-pressed',String(varMi));}
  const iz=kart.querySelector('.watched-badge');if(iz)iz.hidden=!KESIF.izlenen.has(id);
  kart.classList.toggle('is-picked',KESIF.vurgulu===id);
}
function kartRozetleriniGuncelle(){document.querySelectorAll('.card').forEach(k=>kartRozet(k,k.dataset.filmId));}
function izgaraCiz(){
  const kap=$('gridCards'),scroll=kap.scrollTop;kap.replaceChildren();
  gorunenFilmler().forEach(f=>kap.appendChild(kartOlustur(f)));kap.scrollTop=scroll;
}
function gorunumSec(mod){
  KESIF.gorunum=mod;document.body.classList.toggle('grid-mode',mod==='grid');
  $('gridCards').hidden=mod!=='grid';$('world').hidden=mod==='grid';
  $('canvasView').setAttribute('aria-pressed',String(mod==='canvas'));$('gridView').setAttribute('aria-pressed',String(mod==='grid'));
  kartHavuzu.clear();$('cards').replaceChildren();gorunenKartlariCiz();gorunumuKaydet();
}
function gorunumuKaydet(){
  if(!gorunumHazir)return;
  clearTimeout(gorunumuKaydet.timer);gorunumuKaydet.timer=setTimeout(()=>depoya('cinespace-view',{x:DURUM.x,y:DURUM.y,olcek:DURUM.olcek,mod:KESIF.gorunum}),180);
}
function gorunumuGeriYukle(){
  const v=depodan('cinespace-view',null);gorunumHazir=true;
  if(!v || !Number.isFinite(v.x)||!Number.isFinite(v.y)||!Number.isFinite(v.olcek))return false;
  DURUM.x=v.x;DURUM.y=v.y;DURUM.olcek=sinirla(v.olcek,enKucukOlcek(),1.8);
  gorunumuSinirla();gorunumSec(v.mod==='grid'?'grid':'canvas');gorunumuUygula(false);return true;
}
function rastgeleSec(){
  const filmler=gorunenFilmler();if(!filmler.length){bildir('Bu filtrelerde film yok. Filtreleri genişlet.');return;}
  const f=filmler[Math.floor(Math.random()*filmler.length)];KESIF.vurgulu=f.id;
  if(KESIF.gorunum==='grid'){
    kartRozetleriniGuncelle();const kart=[...$('gridCards').children].find(k=>k.dataset.filmId===f.id);kart?.scrollIntoView({behavior:'smooth',block:'center'});
  }else{
    const i=filmler.indexOf(f),yer=DURUM.listeModu?YERLESIM[i%100]:f.yer;
    const o=.95,cx=yer.x+yer.w/2,cy=yer.y+yer.w*.75;
    DURUM.olcek=o;DURUM.x=window.innerWidth/2-cx*o;DURUM.y=(window.innerHeight+170)/2-cy*o;
    gorunumuSinirla();gorunenKartlariCiz();gorunumuUygula(true);
    // Populate destination cards before the animated camera moves.
    kartRozetleriniGuncelle();
  }
  bildir('Bu gece: '+f.ad);
}
function kucukFilmDugmesi(f){
  const b=document.createElement('button');b.type='button';b.className='mini-film';
  const img=document.createElement('img');img.src=f.afis||yedekAfisYolu(f.yer.yedek);img.alt='';img.loading='lazy';img.onerror=()=>{img.onerror=null;img.src=yedekAfisYolu(f.yer.yedek);};
  const t=document.createElement('span');t.textContent=f.ad;const m=document.createElement('small');m.textContent=[f.yil,'★ '+f.puan].join(' · ');t.appendChild(m);b.append(img,t);b.addEventListener('click',()=>detayAc(f));return b;
}
function sonBakilanlariCiz(){
  const kap=$('recentFilms');kap.replaceChildren();
  if(!KESIF.son.length){kap.textContent='Henüz bir film açmadın. Keşfe bir afişle başla.';return;}
  KESIF.son.forEach(f=>kap.appendChild(kucukFilmDugmesi(f)));
}
let benzerIstek=0;
async function detayKesifAc(f){
  KESIF.son=[f,...KESIF.son.filter(x=>x.id!==f.id)].slice(0,12);depoya('cinespace-recent',KESIF.son);sonBakilanlariCiz();izlendiDugmesi();
  const no=++benzerIstek,kap=$('similarFilms');kap.replaceChildren();$('similarStatus').textContent='Yükleniyor…';
  let benzer=[],yerel=false;
  if(f.tmdbId){try{const c=await tmdb('/movie/'+f.tmdbId+'/similar',{});benzer=(c.results||[]).filter(x=>x.id!==f.tmdbId).slice(0,6).map((x,i)=>filmOlustur(x,YERLESIM[i]));}catch{yerel=true;}}
  if(!benzer.length){yerel=true;benzer=DURUM.filmler.filter(x=>x.id!==f.id&&x.turler.some(t=>f.turler.includes(t))).slice(0,6);}
  if(no!==benzerIstek||DURUM.secili?.id!==f.id)return;
  $('similarStatus').textContent=benzer.length?(yerel?'Mevcut seçkiden aynı türde':'TMDB önerileri'):'Benzer film bulunamadı.';
  benzer.forEach(x=>kap.appendChild(kucukFilmDugmesi(x)));
}
function izlendiDugmesi(){const varMi=KESIF.izlenen.has(DURUM.secili?.id);$('markWatched').textContent=varMi?'✓ İzlendi · işareti kaldır':'✓ İzlendi olarak işaretle';$('markWatched').setAttribute('aria-pressed',String(varMi));}
function kesfiBaslat(){
  const olc = () => {
    const ust = document.querySelector('.topbar').getBoundingClientRect().height;
    if (ust) {
      $('discoveryBar').style.top=ust+'px';
      document.documentElement.style.setProperty('--kesif-alt',(ust+$('discoveryBar').getBoundingClientRect().height+12)+'px');
    }
  };
  if (typeof ResizeObserver !== 'undefined') {const ro=new ResizeObserver(olc);ro.observe(document.querySelector('.topbar'));ro.observe($('discoveryBar'));}
  window.addEventListener('resize',olc);olc();
  $('canvasView').addEventListener('click',()=>gorunumSec('canvas'));$('gridView').addEventListener('click',()=>gorunumSec('grid'));
  $('randomFilm').addEventListener('click',rastgeleSec);
  $('advancedToggle').addEventListener('click',()=>{const p=$('advancedFilters');p.hidden=!p.hidden;$('advancedToggle').setAttribute('aria-expanded',String(!p.hidden));});
  $('advancedFilters').addEventListener('submit',e=>{
    e.preventDefault();const a=Number($('yearFrom').value),b=Number($('yearTo').value);
    if((a && (a<1888||a>2100))||(b&&(b<1888||b>2100))||(a&&b&&a>b)){$('filterMessage').textContent='Geçerli bir yıl aralığı seç.';return;}
    Object.assign(KESIF,{baslangic:a,bitis:b,puan:Number($('minRating').value),gizle:$('hideWatched').checked,secki:''});$('collection').value='';$('filterMessage').textContent='';
    if(DURUM.listeModu)gorunumuYenile(true);else katalogYukle();
  });
  $('clearAdvanced').addEventListener('click',()=>{gelismisSifirla();if(DURUM.listeModu)gorunumuYenile(true);else katalogYukle();});
  $('collection').addEventListener('change',e=>{
    const v=e.target.value;gelismisSifirla();KESIF.secki=v;$('collection').value=v;
    DURUM.arama='';$('search').value='';$('searchClear').hidden=true;DURUM.listeModu=false;DURUM.filtre=v==='scifi'?'Bilim Kurgu':'Tümü';
    if(v==='nineties'){KESIF.baslangic=1990;KESIF.bitis=1999;}if(v==='top')KESIF.puan=8;
    $('yearFrom').value=KESIF.baslangic||'';$('yearTo').value=KESIF.bitis||'';$('minRating').value=String(KESIF.puan);
    $('filters').querySelectorAll('.filter').forEach(b=>b.classList.toggle('is-active',b.dataset.tur===DURUM.filtre));listeArayuzunuGuncelle();katalogYukle();
  });
  $('markWatched').addEventListener('click',()=>{const f=DURUM.secili;if(!f)return;KESIF.izlenen.has(f.id)?KESIF.izlenen.delete(f.id):KESIF.izlenen.add(f.id);depoya('cinespace-watched',[...KESIF.izlenen]);izlendiDugmesi();kartlariFiltrele();kartRozetleriniGuncelle();});
  $('detailList').addEventListener('click',kartRozetleriniGuncelle);
  $('recentToggle').addEventListener('click',()=>{const p=$('recentPanel');p.hidden=!p.hidden;$('recentToggle').setAttribute('aria-expanded',String(!p.hidden));sonBakilanlariCiz();});
  $('closeRecent').addEventListener('click',()=>{$('recentPanel').hidden=true;$('recentToggle').setAttribute('aria-expanded','false');$('recentToggle').focus();});
  $('clearRecent').addEventListener('click',()=>{KESIF.son=[];depoya('cinespace-recent',[]);sonBakilanlariCiz();});
  $('helpToggle').addEventListener('click',()=>{$('onboarding').hidden=!$('onboarding').hidden;});
  $('dismissOnboarding').addEventListener('click',()=>{$('onboarding').hidden=true;depoya('cinespace-intro',true);});
  $('onboarding').hidden=depodan('cinespace-intro',false)===true;
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('onboarding').hidden=true;$('recentPanel').hidden=true;$('recentToggle').setAttribute('aria-expanded','false');}},true);
  window.addEventListener('pagehide',()=>{if(gorunumHazir)depoya('cinespace-view',{x:DURUM.x,y:DURUM.y,olcek:DURUM.olcek,mod:KESIF.gorunum});});
}
kesfiBaslat();baslat();
