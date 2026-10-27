/* ===================== 1) SABİTLER VE VERİLER ============================ */

const TMDB_ADRES = "https://api.themoviedb.org/3";

/* Dünya ölçüsü — 100 film 10×10 ızgarayla bu alana yayılır */
const TUZAK = { genislik: 3400, yukseklik: 4600 };

const TURLER = {
  "Aksiyon": 28, "Bilim Kurgu": 878, "Dram": 18,
  "Komedi": 35, "Korku": 27, "Animasyon": 16
};

const TUR_ADLARI = {
  12: "Macera", 14: "Fantastik", 16: "Animasyon", 18: "Dram", 27: "Korku",
  28: "Aksiyon", 35: "Komedi", 36: "Tarih", 37: "Western", 53: "Gerilim",
  80: "Suç", 99: "Belgesel", 878: "Bilim Kurgu", 9648: "Gizem",
  10402: "Müzik", 10749: "Romantik", 10751: "Aile", 10752: "Savaş",
  10770: "TV Filmi"
};

/* 100 filmin dünya üzerindeki konumu (10×10 eşit dağılım, tuğla düzeni) */
const YERLESIM = (() => {
  const sluglar = [
    "kanli-ufuk","neon-kiyi","sessiz-sehir","kahkaha-terapisi","kuyu",
    "yildiz-tozu","kuzey-hatti","sonsuz-devre","beyaz-gurultu","komsum-bir-robot",
    "fisilti-evi","kagit-balina","gece-vardiyasi","celik-firtina","mavi-saat",
    "ormanin-sesi","cam-deniz","kirmizi-hat","golge-avcisi","son-istasyon",
    "dijital-ruya","karanlik-sokak","yildirim-express","buz-ulusu","kayip-mektup",
    "anadolu-atesi","ucan-hali","gizli-bahce","demir-yumruk","mavi-ay",
    "gecenin-sesi","kara-kutu","gumus-ok","firtina-adas","son-nefes",
    "kristal-kule","gokyuzu-siniri","kizil-nehir","sessiz-tanik","kayip-zaman",
    "hayalet-gemi","cam-orman","gece-kusu","kagit-ay","mercan-resifi",
    "son-kale","yildiz-avcisi","kara-delik","beyaz-at","kizil-ordu",
    "cam-kalp","golge-oyunu","yildirim-yolu","kayip-sehir","buz-atesi",
    "son-durak","gizemli-adam","mavi-firtina","kara-bulut","kizil-gokyuzu",
    "cam-tuzak","golge-savascisi","yildiz-gecesi","kayip-hazine","buz-kalesi",
    "son-sarki","gizli-gorev","mavi-ok","kara-kedi","kizil-kitap",
    "cam-adam","golge-avcisi-2","yildiz-tozu-2","kayip-ada","buz-ulusu-2",
    "son-umut","gizemli-kadin","mavi-deniz","kara-kurt","kizil-firtina",
    "cam-kule-2","golge-ordusu","yildiz-savasi","kayip-dunya","buz-yolu",
    "son-kapi","gizli-oda","mavi-gezegen","kara-orman","kizil-at",
    "cam-kopru","golge-sehri","yildiz-askeri","kayip-koy","buz-kiyisi",
    "son-adam","gizli-define","mavi-ufuk","kara-gece","kizil-ok"
  ];
  const genislikler = [340, 240, 260, 200, 180, 280, 300, 230, 250, 220];
  const colPitch = 340;
  const rowPitch = 460;
  const dizi = [];
  for (let i = 0; i < 100; i++) {
    const row = Math.floor(i / 10);
    const col = i % 10;
    dizi.push({
      x: 30 + col * colPitch + (row % 2) * 30,
      y: 80 + row * rowPitch,
      w: 260,
      yedek: sluglar[i]
    });
  }
  return dizi;
})();

/* Çevrimdışı yedek film bilgileri (100 film) */
const YEREL_FILMLER = (() => {
  const adlar = [
    "Kanlı Ufuk","Neon Kıyı","Sessiz Şehir","Kahkaha Terapisi","Kuyu",
    "Yıldız Tozu","Kuzey Hattı","Sonsuz Devre","Beyaz Gürültü","Komşum Bir Robot",
    "Fısıltı Evi","Kâğıt Balina","Gece Vardiyası","Çelik Fırtına","Mavi Saat",
    "Ormanın Sesi","Cam Deniz","Kırmızı Hat","Gölge Avcısı","Son İstasyon",
    "Dijital Rüya","Karanlık Sokak","Yıldırım Express","Buz Ulusu","Kayıp Mektup",
    "Anadolu Ateşi","Uçan Halı","Gizli Bahçe","Demir Yumruk","Mavi Ay",
    "Gecenin Sesi","Kara Kutu","Gümüş Ok","Fırtına Adası","Son Nefes",
    "Kristal Kule","Gökyüzü Sınırı","Kızıl Nehir","Sessiz Tanık","Kayıp Zaman",
    "Hayalet Gemi","Cam Orman","Gece Kuşu","Kâğıt Ay","Mercan Resifi",
    "Son Kale","Yıldız Avcısı","Kara Delik","Beyaz At","Kızıl Ordu",
    "Cam Kalp","Gölge Oyunu","Yıldırım Yolu","Kayıp Şehir","Buz Ateşi",
    "Son Durak","Gizemli Adam","Mavi Fırtına","Kara Bulut","Kızıl Gökyüzü",
    "Cam Tuzak","Gölge Savaşçısı","Yıldız Gecesi","Kayıp Hazine","Buz Kalesi",
    "Son Şarkı","Gizli Görev","Mavi Ok","Kara Kedi","Kızıl Kitap",
    "Cam Adam","Gölge Avcısı 2","Yıldız Tozu 2","Kayıp Ada","Buz Ulusu 2",
    "Son Umut","Gizemli Kadın","Mavi Deniz","Kara Kurt","Kızıl Fırtına",
    "Cam Kule 2","Gölge Ordusu","Yıldız Savaşı","Kayıp Dünya","Buz Yolu",
    "Son Kapı","Gizli Oda","Mavi Gezegen","Kara Orman","Kızıl At",
    "Cam Köprü","Gölge Şehri","Yıldız Askeri","Kayıp Köy","Buz Kıyısı",
    "Son Adam","Gizli Define","Mavi Ufuk","Kara Gece","Kızıl Ok"
  ];
  const turler = ["Aksiyon","Bilim Kurgu","Dram","Komedi","Korku","Animasyon"];
  const yonetmenler = ["Selin Aydın","Deniz Aksoy","Hakan Pak","Cem Bulut","Nazlı Korkmaz","Ece Gürsoy","Tarık Erdem","Burak Yalın","Arzu Nalbant","Pelin Sarı"];
  const sozluk = {};
  YERLESIM.forEach((yer, i) => {
    const ad = adlar[i];
    const tur = turler[i % turler.length];
    sozluk[yer.yedek] = {
      ad, yil: 2020 + (i % 6), tur, sure: 88 + (i % 55),
      puan: 6.5 + ((i * 7) % 20) / 10,
      yonetmen: yonetmenler[i % yonetmenler.length],
      oyuncular: ["Oyuncu A" + (i + 1), "Oyuncu B" + (i + 1), "Oyuncu C" + (i + 1)],
      ozet: ad + " — " + tur + " türünde özgün bir CineSpace yapımı. Yerel arşivden yükleniyor."
    };
  });
  return sozluk;
})();

let ilkYukleme = true;

const DURUM = {
  olcek: 1, x: 0, y: 0,
  filmler: [], filtre: "Tümü", arama: "",
  listeModu: false, liste: new Map(),
  secili: null, cevrimdisi: false,
  kaynaklar: [], kaynakId: null
};

/* ===================== 2) YARDIMCI ========================= */

const $ = (id) => document.getElementById(id);
const sinirla = (s, a, u) => Math.min(u, Math.max(a, s));

function htmlTemizle(m) {
  return String(m == null ? "" : m)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function basHarfler(a) {
  return String(a || "?").trim().split(/\s+/).slice(0, 2)
    .map((p) => p.charAt(0).toLocaleUpperCase("tr")).join("");
}
function bildir(mesaj) {
  const k = $("toast"); if (!k) return;
  k.textContent = mesaj; k.classList.add("is-visible");
  clearTimeout(bildir.zaman);
  bildir.zaman = setTimeout(() => k.classList.remove("is-visible"), 2200);
}
const yedekAfisYolu = (s) => "assets/posters/" + s + ".svg";
const yedekArkaYolu = (s) => "assets/backdrops/" + s + ".svg";

/* ===================== 3) TMDB =============================== */

async function tmdb(yol, prm, signal) {
  const adres = new URL(TMDB_ADRES + yol);
  adres.searchParams.set("language", TMDB_AYARI.dil);
  Object.keys(prm || {}).forEach((k) => adres.searchParams.set(k, prm[k]));
  const yanit = await fetch(adres.toString(), {
    signal: signal || AbortSignal.timeout(12000),
    headers: { Authorization: "Bearer " + TMDB_AYARI.jeton, accept: "application/json" }
  });
  if (!yanit.ok) throw new Error("TMDB: " + yanit.status);
  return yanit.json();
}
const afisAdresi = (y) => y ? TMDB_AYARI.resimAdresi + TMDB_AYARI.afisBoyu + y : "";
const arkaPlanAdresi = (y) => y ? TMDB_AYARI.resimAdresi + TMDB_AYARI.arkaPlanBoyu + y : "";

function filmOlustur(s, yer) {
  return {
    id: "tmdb-" + s.id, tmdbId: s.id,
    ad: s.title || s.name || "İsimsiz",
    yil: (s.release_date || "").slice(0, 4),
    puan: s.vote_average ? s.vote_average.toFixed(1) : "—",
    ozet: s.overview || "",
    turler: (s.genre_ids || []).map((k) => TUR_ADLARI[k]).filter(Boolean),
    afis: afisAdresi(s.poster_path), arka: arkaPlanAdresi(s.backdrop_path),
    sure: 0, yonetmen: "", oyuncular: [], fragman: "",
    kaynak: "tmdb", yer
  };
}
function yerelFilmOlustur(slug, yer) {
  const b = YEREL_FILMLER[slug];
  return {
    id: "yerel-" + slug, tmdbId: null,
    ad: b.ad, yil: String(b.yil), puan: b.puan.toFixed(1),
    ozet: b.ozet, turler: [b.tur],
    afis: yedekAfisYolu(slug), arka: yedekArkaYolu(slug),
    sure: b.sure, yonetmen: b.yonetmen,
    oyuncular: b.oyuncular.map((ad) => ({ ad, rol: "" })),
    fragman: "", kaynak: "yerel", yer
  };
}

let katalogKontrol = null, istekNo = 0;
async function katalogYukle() {
  const no = ++istekNo;
  if (katalogKontrol) katalogKontrol.abort();
  katalogKontrol = new AbortController();
  const kontrol = katalogKontrol;
  const sure = setTimeout(() => kontrol.abort(), 12000);
  const arama = DURUM.arama, filtre = DURUM.filtre;
  $("statusCount").textContent = "yükleniyor";
  $("stage").classList.add("is-loading");
  $("retryCatalog").hidden = true;
  if (!DURUM.filmler.length) {
    DURUM.filmler = YERLESIM.map(y => yerelFilmOlustur(y.yedek, y));
    kartlariYerlestir(); ilkGorunum();
  }
  try {
    let sonuclar;
    if (arama) {
      const c = await tmdb("/search/movie", {query: arama, include_adult: "false", page: "1"}, kontrol.signal);
      sonuclar = c.results || [];
    } else {
      const yol = filtre === "Tümü" && !KESIF.secki && !KESIF.baslangic && !KESIF.bitis && !KESIF.puan ? "/movie/popular" : "/discover/movie";
      const sayfalar = await Promise.all([1,2,3,4,5].map(page => tmdb(yol,
        {...kesifSorgusu(), page: String(page), include_adult: "false", ...(filtre === "Tümü" ? {} :
          {with_genres: String(TURLER[filtre]), sort_by: "popularity.desc", "vote_count.gte": "40"})}, kontrol.signal)));
      sonuclar = sayfalar.flatMap(c => c.results || []);
    }
    if (no !== istekNo) return;
    DURUM.cevrimdisi = false;
    DURUM.filmler = [...new Map(sonuclar.map(f => [f.id,f])).values()].slice(0,100)
      .map((f,i) => filmOlustur(f,YERLESIM[i]));
  } catch (e) {
    if (no !== istekNo) return;
    DURUM.cevrimdisi = true;
    DURUM.filmler = YERLESIM.map(y => yerelFilmOlustur(y.yedek,y));
    $("retryCatalog").hidden = false;
    bildir("Bağlantı kurulamadı. Yerel seçki gösteriliyor.");
  } finally {
    clearTimeout(sure);
    if (no === istekNo) $("stage").classList.remove("is-loading");
  }
  if (no !== istekNo) return;
  kartlariYerlestir(); kartlariFiltrele();
  if (ilkYukleme) { ilkYukleme = false; if (!gorunumuGeriYukle()) ilkGorunum(); }
  else if (arama || DURUM.listeModu) gorunumuYenile(true);
  else ilkGorunum();
}

async function detayBilgisiYukle(film) {
  if (film.kaynak !== "tmdb" || film.detayHazir) return;
  film.detayHata = false;
  try {
    const c = await tmdb("/movie/" + film.tmdbId, { append_to_response: "credits,videos" });
    if (c.runtime) film.sure = c.runtime;
    if (c.genres && c.genres.length) film.turler = c.genres.map((t) => t.name);
    if (c.overview) film.ozet = c.overview;
    if (c.vote_average) film.puan = c.vote_average.toFixed(1);
    if (c.poster_path) film.afis = afisAdresi(c.poster_path);
    if (c.backdrop_path) film.arka = arkaPlanAdresi(c.backdrop_path);
    const ekip = (c.credits && c.credits.crew) || [];
    const y = ekip.find((k) => k.job === "Director") || ekip.find((k) => k.job === "Yönetmen");
    if (y) film.yonetmen = y.name;
    const kadro = (c.credits && c.credits.cast) || [];
    film.oyuncular = kadro.slice(0, 5).map((k) => ({ ad: k.name, rol: k.character || "" }));
    const v = (c.videos && c.videos.results) || [];
    const yt = v.filter((x) => x.site === "YouTube");
    const fr = yt.find((x) => x.type === "Trailer" && x.official) ||
               yt.find((x) => x.type === "Trailer") || yt[0];
    film.fragman = fr ? fr.key : "";
    film.detayHazir = true;
    if (DURUM.secili === film) detayDoldur(film);
  } catch (hata) { film.detayHata = true; if (DURUM.secili === film) detayDoldur(film); }
}

/* ===================== 4) GÖRÜNÜM (SONSUZ) ============================== */

function ustBarYuksekligi() {
  const b = document.querySelector(".topbar");
  return b ? b.getBoundingClientRect().height : 74;
}

function gorunumuUygula(anim) {
  const d = $("world");
  d.classList.toggle("animate", Boolean(anim));
  d.style.transform = "translate(" + DURUM.x + "px," + DURUM.y + "px) scale(" + DURUM.olcek + ")";
  $("zoomLevel").textContent = Math.round(DURUM.olcek * 100) + "%";
  miniHaritaGuncelle();
  gorunumuKaydet();
  if (!gorunumuUygula.kare) gorunumuUygula.kare = requestAnimationFrame(() => {gorunumuUygula.kare = null; gorunenKartlariCiz();});
}

/* SONSUZ SARMALAMA — DURUM.x ∈ (-W*scale, 0], DURUM.y ∈ (-H*scale, 0] */
function gorunumuSinirla() {
  const dG = TUZAK.genislik * DURUM.olcek;
  const dY = TUZAK.yukseklik * DURUM.olcek;
  if (dG > 0) {
    DURUM.x = ((DURUM.x % dG) + dG) % dG;
    if (DURUM.x > 0) DURUM.x -= dG;
  }
  if (dY > 0) {
    DURUM.y = ((DURUM.y % dY) + dY) % dY;
    if (DURUM.y > 0) DURUM.y -= dY;
  }
}

function sigdirmaOrani(filmler) {
  const l = ((filmler && filmler.length) ? filmler : katalogFilmleri()).map((f,i) => DURUM.listeModu ? {...f,yer:YERLESIM[i % 100]} : f);
  if (!l.length) return 1;
  let sol = Infinity, ust = Infinity, sag = -Infinity, alt = -Infinity;
  l.forEach((f) => {
    sol = Math.min(sol, f.yer.x);
    ust = Math.min(ust, f.yer.y);
    sag = Math.max(sag, f.yer.x + f.yer.w);
    alt = Math.max(alt, f.yer.y + f.yer.w * 1.5);
  });
  const g = sag - sol, y = alt - ust;
  const uP = ustBarYuksekligi() + 40, aP = 130, yP = 80;
  return sinirla(Math.min(
    (window.innerWidth - yP * 2) / g,
    (window.innerHeight - uP - aP) / y
  ), 0.04, 1.8);
}

/* 3×3 döşeme için minimum yakınlaştırma: iki kopya viewport'u kaplasın */
function enKucukOlcek() {
  const buf = 1.05;
  const minTile = Math.max(
    (window.innerWidth * buf) / (2 * TUZAK.genislik),
    (window.innerHeight * buf) / (2 * TUZAK.yukseklik)
  );
  const fit = sigdirmaOrani(gorunenFilmler());
  return Math.max(minTile, Math.min(0.10, fit));
}

function sigdir(filmler, anim) {
  const l = ((filmler && filmler.length) ? filmler : katalogFilmleri()).map((f,i) => DURUM.listeModu ? {...f,yer:YERLESIM[i % 100]} : f);
  if (!l.length) return;
  let sol = Infinity, ust = Infinity, sag = -Infinity, alt = -Infinity;
  l.forEach((f) => {
    sol = Math.min(sol, f.yer.x);
    ust = Math.min(ust, f.yer.y);
    sag = Math.max(sag, f.yer.x + f.yer.w);
    alt = Math.max(alt, f.yer.y + f.yer.w * 1.5);
  });
  const o = sigdirmaOrani(l);
  DURUM.olcek = o;
  const cX = (sol + sag) / 2, cY = (ust + alt) / 2;
  DURUM.x = window.innerWidth / 2 - cX * o;
  DURUM.y = window.innerHeight / 2 - cY * o;
  gorunumuSinirla();
  gorunumuUygula(anim);
}

function ilkGorunum() {
  const g = gorunenFilmler();
  const o = sigdirmaOrani(g);
  const dar = window.innerWidth < 760;
  const hedef = dar ? 0.6 : 0.85;
  DURUM.olcek = sinirla(hedef, enKucukOlcek(), 1.2);
  DURUM.x = (window.innerWidth - TUZAK.genislik * DURUM.olcek) / 2;
  DURUM.y = (window.innerHeight - TUZAK.yukseklik * DURUM.olcek) / 2;
  gorunumuSinirla();
  gorunumuUygula(true);
}

function yakinlastir(yeniO, eX, eY) {
  const o = sinirla(yeniO, enKucukOlcek(), 1.8);
  const dX = (eX - DURUM.x) / DURUM.olcek;
  const dY = (eY - DURUM.y) / DURUM.olcek;
  DURUM.olcek = o;
  DURUM.x = eX - dX * o;
  DURUM.y = eY - dY * o;
  gorunumuSinirla();
  gorunumuUygula(false);
}

function miniHaritaCiz() {
  const ic = $("minimapInner");
  ic.querySelectorAll(".minimap-dot").forEach((n) => n.remove());
  gorunenFilmler().forEach((f, i) => {
    const n = document.createElement("div");
    n.className = "minimap-dot";
    n.dataset.sira = String(i);
    const yer = DURUM.listeModu ? YERLESIM[i % 100] : f.yer;
    n.style.left = (yer.x / TUZAK.genislik) * 100 + "%";
    n.style.top = (yer.y / TUZAK.yukseklik) * 100 + "%";
    n.style.width = (f.yer.w / TUZAK.genislik) * 100 + "%";
    n.style.height = ((f.yer.w * 1.5) / TUZAK.yukseklik) * 100 + "%";
    ic.appendChild(n);
  });
}

function miniHaritaGuncelle() {
  const k = $("minimapView");
  const gG = window.innerWidth / DURUM.olcek;
  const gY = window.innerHeight / DURUM.olcek;
  k.style.left = (-DURUM.x / DURUM.olcek / TUZAK.genislik) * 100 + "%";
  k.style.top = (-DURUM.y / DURUM.olcek / TUZAK.yukseklik) * 100 + "%";
  k.style.width = (gG / TUZAK.genislik) * 100 + "%";
  k.style.height = (gY / TUZAK.yukseklik) * 100 + "%";
}

/* ===================== 5) KARTLAR =============================== */

function kartOlustur(film) {
  const kart = document.createElement("article");
  kart.className = "card";
  kart.dataset.filmId = film.id;
  kart.setAttribute("role", "button");
  kart.setAttribute("tabindex", "0");
  kart.setAttribute("aria-label", film.ad + " (" + film.yil + ") detaylarını aç");
  kart.style.setProperty("--w", film.yer.w + "px");

  const tur = film.turler && film.turler.length ? film.turler[0] : "Film";
  const yedek = yedekAfisYolu(film.yer.yedek);
  kart.innerHTML =
    '<div class="card-inner">' +
      '<img class="card-poster" src="' + htmlTemizle(film.afis || yedek) + '"' +
      ' data-yedek="' + htmlTemizle(yedek) + '"' +
      ' onerror="if(!this.dataset.yedekDenendi){this.dataset.yedekDenendi=\'1\';this.src=this.dataset.yedek;}"' +
      ' alt="' + htmlTemizle(film.ad) + ' afişi" loading="lazy">' +
      '<div class="card-info">' +
        '<div class="card-title">' + htmlTemizle(film.ad) + '</div>' +
        '<div class="card-meta"><span>' + htmlTemizle(film.yil || "—") + '</span>' +
        '<span>' + htmlTemizle(tur) + '</span></div>' +
        '<span class="card-rate">★ ' + htmlTemizle(film.puan) + '</span>' +
      '</div>' +
    '</div>';
  kartHizliDugmeler(kart, film);
  return kart;
}

/* 3×3 DÖŞEME — sonsuz sarmalama görsel olarak kesintisiz olsun diye
   100 film 9 kez yerleştirilir (0/W/2W ve 0/H/2H ofsetleriyle). */
const kartHavuzu = new Map();
function katalogFilmleri() {
  return DURUM.listeModu ? Array.from(DURUM.liste.values()) : DURUM.filmler;
}
function gorunenKartlariCiz() {
  if (KESIF.gorunum === "grid") { izgaraCiz(); return; }
  const kap = $("cards"), o = DURUM.olcek, W = TUZAK.genislik, H = TUZAK.yukseklik;
  const sol = -DURUM.x/o - 80, ust = -DURUM.y/o - 80;
  const sag = sol + window.innerWidth/o + 160, alt = ust + window.innerHeight/o + 160;
  const gereken = new Set();
  gorunenFilmler().forEach((f,i) => {
    const yer = DURUM.listeModu ? YERLESIM[i % 100] : f.yer;
    for (let dx = Math.ceil((sol-yer.x-yer.w)/W); dx <= Math.floor((sag-yer.x)/W); dx++) {
      for (let dy = Math.ceil((ust-yer.y-yer.w*1.5)/H); dy <= Math.floor((alt-yer.y)/H); dy++) {
        const key = f.id+":"+dx+":"+dy;
        gereken.add(key);
        let kart = kartHavuzu.get(key);
        if (!kart) { kart = kartOlustur({...f,yer}); kartHavuzu.set(key,kart); kap.appendChild(kart); }
        kart.style.left = (yer.x+dx*W)+"px"; kart.style.top = (yer.y+dy*H)+"px";
        kart.classList.toggle("is-listed", DURUM.liste.has(f.id));
      }
    }
  });
  for (const [key,kart] of kartHavuzu) if (!gereken.has(key)) {kart.remove();kartHavuzu.delete(key);}
}
function kartlariYerlestir() {
  $("cards").innerHTML = ""; kartHavuzu.clear();
  miniHaritaCiz(); gorunenKartlariCiz();
}

function filtreyeUyar(film) {
  if (DURUM.listeModu && !DURUM.liste.has(film.id)) return false;
  if (DURUM.arama && film.kaynak === "yerel") {
    const a = DURUM.arama.toLocaleLowerCase("tr");
    if (film.ad.toLocaleLowerCase("tr").indexOf(a) === -1) return false;
  }
  if (DURUM.filtre !== "Tümü" && film.turler.indexOf(DURUM.filtre) === -1) return false;
  return gelismisFiltreyeUyar(film);
}

function gorunenFilmler() {
  return katalogFilmleri().filter(filtreyeUyar);
}

function kartlariFiltrele() {
  const gorunen = gorunenFilmler();
  gorunenKartlariCiz(); miniHaritaCiz();
  $("statusCount").textContent = gorunen.length + " film";
  $("statusFilter").textContent = DURUM.listeModu ? "Listem" : DURUM.arama ? 'Arama: '+DURUM.arama :
    DURUM.filtre !== "Tümü" ? DURUM.filtre : DURUM.cevrimdisi ? "Yerel seçki" : "TMDB popüler";
  $("empty").hidden = gorunen.length > 0;
  $("worldLabelText").textContent = "SEÇKİ · " + gorunen.length + " FİLM";
  return gorunen;
}

function gorunumuYenile(sigdirA) {
  const g = kartlariFiltrele();
  if (sigdirA && g.length) sigdir(g, true);
}

function listeArayuzunuGuncelle() {
  $("listCount").textContent = String(DURUM.liste.size);
  $("listChip").setAttribute("aria-pressed", DURUM.listeModu ? "true" : "false");
}

function listeyeEkleCikar(film) {
  if (DURUM.liste.has(film.id)) {
    DURUM.liste.delete(film.id);
    bildir('"' + film.ad + '" listeden çıkarıldı');
  } else {
    DURUM.liste.set(film.id, film);
    bildir('"' + film.ad + '" listeme eklendi');
  }
  try { localStorage.setItem("cinespace-list-v1", JSON.stringify(Array.from(DURUM.liste.values()))); } catch { bildir("Liste bu tarayıcıda kalıcı kaydedilemedi."); }
  listeArayuzunuGuncelle();
  kartlariFiltrele();
  if (DURUM.secili === film) detayDugmeleriniGuncelle(film);
  if (DURUM.listeModu) gorunumuYenile(true);
}

/* ===================== 6) DETAY ================================= */

function metaEtiketi(m, s) {
  const li = document.createElement("li");
  li.textContent = m;
  if (s) li.className = s;
  return li;
}

function detayDoldur(film) {
  const yA = yedekAfisYolu(film.yer.yedek);
  const yAr = yedekArkaYolu(film.yer.yedek);
  const arka = $("detailBg");
  arka.onerror = () => { arka.onerror = null; arka.src = yAr; };
  arka.src = film.arka || yAr;
  const afis = $("detailPoster");
  afis.onerror = () => { afis.onerror = null; afis.src = yA; };
  afis.src = film.afis || yA;
  afis.alt = film.ad + " afişi";
  $("detailTitle").textContent = film.ad;
  const meta = $("detailMeta");
  meta.innerHTML = "";
  if (film.yil) meta.appendChild(metaEtiketi(film.yil));
  if (film.sure) meta.appendChild(metaEtiketi(film.sure + " dk"));
  if (film.puan && film.puan !== "—") meta.appendChild(metaEtiketi("★ " + film.puan, "meta-rate"));
  film.turler.slice(0, 2).forEach((t) => meta.appendChild(metaEtiketi(t, "meta-tur")));
  if (!film.sure) meta.appendChild(metaEtiketi(film.detayHazir || film.detayHata ? "Süre bilgisi bulunamadı" : "Süre bilgisi yükleniyor…"));
  $("detailDesc").textContent = film.ozet || "Bu film için Türkçe açıklama bulunamadı.";
  $("detailDirector").textContent = film.yonetmen || "Bilgi yok";
  const kadro = $("detailCast");
  kadro.innerHTML = "";
  if (!film.oyuncular.length) kadro.appendChild(metaEtiketi(film.detayHazir || film.detayHata ? "Oyuncu bilgisi bulunamadı" : "Oyuncu bilgisi yükleniyor…"));
  else film.oyuncular.slice(0, 5).forEach((k) => {
    const li = document.createElement("li");
    li.innerHTML = '<span class="cast-avatar">' + htmlTemizle(basHarfler(k.ad)) + '</span>' +
      '<span>' + htmlTemizle(k.ad) + (k.rol ? ' <span class="cast-role">' + htmlTemizle(k.rol) + '</span>' : '') + '</span>';
    kadro.appendChild(li);
  });
  detayDugmeleriniGuncelle(film);
}

function detayDugmeleriniGuncelle(film) {
  const l = DURUM.liste.has(film.id);
  $("detailList").classList.toggle("is-on", l);
  $("detailListIcon").textContent = l ? "✓" : "＋";
  $("detailListText").textContent = l ? "Listemde" : "Listeme ekle";
}

let oncekiOdak = null;
function detayAc(film) {
  oncekiOdak = document.activeElement;
  $("discoveryBar").inert = true; $("recentPanel").hidden = true; $("recentToggle").setAttribute("aria-expanded","false"); $("onboarding").hidden = true;
  $("stage").inert = true; $("logo").closest("header").inert = true;
  DURUM.secili = film;
  detayDoldur(film);
  $("watch").hidden = true;
  $("playerFrame").innerHTML = "";
  $("detail").hidden = false;
  $("detail").scrollTop = 0;
  $("detailBack").focus({ preventScroll: true });
  detayBilgisiYukle(film);
  detayKesifAc(film);
}
function detayiKapat() { $("discoveryBar").inert = false; $("detail").hidden = true; DURUM.secili = null; $("stage").inert = false; $("logo").closest("header").inert = false; if (oncekiOdak && oncekiOdak.isConnected) oncekiOdak.focus({preventScroll:true}); else $("logo").focus({preventScroll:true}); }

/* ===================== 7) İZLEME ================================ */

function kaynaklariOlustur(film) {
  const k = [], t = film.tmdbId;
  if (t) {
    k.push({ id: "vidstuck", ad: "1 · VidStuck", not: "vidstuck.cc", tur: "iframe", kaynak: "VidStuck", url: "https://vidstuck.cc/embed/movie/" + t });
    k.push({ id: "atlantic", ad: "2 · Atlantic", not: "atlantic.st", tur: "iframe", kaynak: "Atlantic", url: "https://atlantic.st/embed/movie/" + t });
    k.push({ id: "fmov", ad: "3 · FMov", not: "fmov.my", tur: "iframe", kaynak: "FMov", url: "https://fmov.my/embed/movie/" + t });
    k.push({ id: "cinesrc", ad: "4 · CineSrc", not: "cinesrc.st", tur: "iframe", kaynak: "CineSrc", url: "https://cinesrc.st/embed/movie/" + t });
    k.push({ id: "mapple", ad: "5 · Mapple", not: "mapple.fun", tur: "iframe", kaynak: "Mapple", url: "https://mapple.fun/watch/movie/" + t });
  }
  return k;
}

function kaynakSekmeleriniCiz(film) {
  DURUM.kaynaklar = kaynaklariOlustur(film);
  const a = $("sources");
  a.innerHTML = "";
  DURUM.kaynaklar.forEach((k) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "source-btn";
    b.dataset.kaynak = k.id;
    b.innerHTML = '<span class="source-ad">' + htmlTemizle(k.ad) + '</span>' +
      '<span class="source-not">' + htmlTemizle(k.not) + '</span>';
    b.addEventListener("click", () => kaynakSec(k.id));
    a.appendChild(b);
  });
}

function kaynakSec(id) {
  const k = DURUM.kaynaklar.find((x) => x.id === id) || DURUM.kaynaklar[0];
  if (!k) return;
  DURUM.kaynakId = k.id;
  $("watchChip").textContent = k.kaynak.toUpperCase();
  $("sources").querySelectorAll(".source-btn").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.kaynak === k.id);
  });
  const c = $("playerFrame");
  const h = $("playerError");
  h.hidden = true;
  c.innerHTML = "";
  if (k.tur === "iframe") {
    const f = document.createElement("iframe");
    f.src = k.url;
    f.title = k.ad.split("·").pop().trim();
    f.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen; web-share");
    f.setAttribute("referrerpolicy", "origin");
    f.setAttribute("allowfullscreen", "");
    c.appendChild(f);
  } else {
    const v = document.createElement("video");
    v.controls = true; v.playsInline = true; v.preload = "metadata"; v.src = k.url;
    v.addEventListener("error", () => { c.innerHTML = ""; h.hidden = false; });
    c.appendChild(v);
  }
  $("watchMeta").textContent = [DURUM.secili ? DURUM.secili.ad : "", "Kaynak: " + k.kaynak].filter(Boolean).join(" · ");
  $("watchNote").innerHTML = "<strong>Kaynak:</strong> " + htmlTemizle(k.ad) + " (" + htmlTemizle(k.not) + ")";
}

function izlemeyiAc(film) {
  DURUM.secili = film;
  $("watchTitle").textContent = film.ad + (film.yil ? " · " + film.yil : "");
  kaynakSekmeleriniCiz(film);
  if (!DURUM.kaynaklar.length) {
    bildir("Bu film için kullanılabilir kaynak bulunamadı");
    $("detail").hidden = false;
    return;
  }
  kaynakSec(DURUM.kaynaklar[0].id);
  $("detail").hidden = true;
  $("watch").hidden = false;
  $("watch").scrollTop = 0;
  $("watchBack").focus({ preventScroll: true });
}

function izlemeyiKapat() {
  $("watch").hidden = true;
  $("playerFrame").innerHTML = "";
  $("playerError").hidden = true;
  if (DURUM.secili) $("detail").hidden = false;
}

/* ===================== 8) OLAYLAR ============================== */

function kartOlaylari() {
  const d = $("world");
  const filmBul = (kart) => katalogFilmleri().find((f) => f.id === kart.dataset.filmId);
  d.addEventListener("click", (o) => {
    if (o.defaultPrevented) return;
    if (o.target.closest(".quick-add")) return;
    const k = o.target.closest && o.target.closest(".card");
    if (!k || !k.dataset.filmId) return;
    const f = filmBul(k);
    if (f) detayAc(f);
  });
  d.addEventListener("keydown", (o) => {
    if (o.key !== "Enter" && o.key !== " ") return;
    if (o.target.closest(".quick-add")) return;
    const k = o.target.closest && o.target.closest(".card");
    if (!k || !k.dataset.filmId) return;
    o.preventDefault();
    const f = filmBul(k);
    if (f) detayAc(f);
  });
}

function suruklemeyiBagla() {
  const sahne = $("stage");
  const isaretciler = new Map();
  let surukleme = null, kiskac = null, tikYut = false;
  const noktalar = () => Array.from(isaretciler.values());
  const yakala = (id) => { try { sahne.setPointerCapture(id); } catch (e) {} };

  sahne.addEventListener("pointerdown", (o) => {
    if (KESIF.gorunum === "grid" || o.target.closest(".quick-add, .zoom, .minimap, .empty")) return;
    tikYut = false;
    isaretciler.set(o.pointerId, { x: o.clientX, y: o.clientY });
    if (isaretciler.size === 1) {
      surukleme = { baslangicX: o.clientX, baslangicY: o.clientY, tuvalX: DURUM.x, tuvalY: DURUM.y, tasindi: false };
    } else if (isaretciler.size === 2) {
      const [a, b] = noktalar();
      const mX = (a.x + b.x) / 2, mY = (a.y + b.y) / 2;
      kiskac = { mesafe: Math.hypot(a.x - b.x, a.y - b.y), olcek: DURUM.olcek, dunyaX: (mX - DURUM.x) / DURUM.olcek, dunyaY: (mY - DURUM.y) / DURUM.olcek };
      isaretciler.forEach((_, id) => yakala(id));
      sahne.classList.add("is-dragging");
    }
  });

  sahne.addEventListener("pointermove", (o) => {
    if (!isaretciler.has(o.pointerId)) return;
    isaretciler.set(o.pointerId, { x: o.clientX, y: o.clientY });
    if (isaretciler.size === 2 && kiskac) {
      const [a, b] = noktalar();
      const me = Math.hypot(a.x - b.x, a.y - b.y);
      const mX = (a.x + b.x) / 2, mY = (a.y + b.y) / 2;
      const yO = sinirla(kiskac.olcek * (me / kiskac.mesafe), enKucukOlcek(), 1.8);
      DURUM.olcek = yO;
      DURUM.x = mX - kiskac.dunyaX * yO;
      DURUM.y = mY - kiskac.dunyaY * yO;
      gorunumuSinirla();
      gorunumuUygula(false);
      if (surukleme) surukleme.tasindi = true;
      return;
    }
    if (!surukleme) return;
    const fX = o.clientX - surukleme.baslangicX;
    const fY = o.clientY - surukleme.baslangicY;
    if (!surukleme.tasindi) {
      if (Math.abs(fX) < 6 && Math.abs(fY) < 6) return;
      surukleme.tasindi = true;
      yakala(o.pointerId);
      sahne.classList.add("is-dragging");
    }
    DURUM.x = surukleme.tuvalX + fX;
    DURUM.y = surukleme.tuvalY + fY;
    gorunumuSinirla();
    gorunumuUygula(false);
  });

  const birak = (o) => {
    if (!isaretciler.has(o.pointerId)) return;
    isaretciler.delete(o.pointerId);
    if (surukleme && surukleme.tasindi) tikYut = true;
    if (isaretciler.size === 1) {
      const [p] = noktalar(); kiskac = null;
      surukleme = {baslangicX:p.x, baslangicY:p.y, tuvalX:DURUM.x, tuvalY:DURUM.y, tasindi:true};
    }
    if (isaretciler.size === 0) { surukleme = null; kiskac = null; sahne.classList.remove("is-dragging"); }
  };
  sahne.addEventListener("pointerup", birak);
  sahne.addEventListener("pointercancel", birak);

  sahne.addEventListener("click", (o) => {
    if (!tikYut) return;
    tikYut = false;
    if (!o.target.closest || !o.target.closest(".card")) return;
    o.stopPropagation();
    o.preventDefault();
  }, true);

  sahne.addEventListener("wheel", (o) => {
    if (KESIF.gorunum === "grid") return;
    o.preventDefault();
    yakinlastir(DURUM.olcek * Math.exp(-o.deltaY * 0.0016), o.clientX, o.clientY);
  }, { passive: false });
}

function miniHaritaOlaylari() {
  $("minimapInner").addEventListener("click", (o) => {
    const k = $("minimapInner").getBoundingClientRect();
    const dX = ((o.clientX - k.left) / k.width) * TUZAK.genislik;
    const dY = ((o.clientY - k.top) / k.height) * TUZAK.yukseklik;
    DURUM.x = window.innerWidth / 2 - dX * DURUM.olcek;
    DURUM.y = window.innerHeight / 2 - dY * DURUM.olcek;
    gorunumuSinirla();
    gorunumuUygula(true);
  });
}

function filtreOlaylari() {
  let z = null;
  $("search").addEventListener("input", (o) => {
    const v = o.target.value.trim();
    DURUM.arama = v;
    $("searchClear").hidden = v.length === 0;
    if (v && DURUM.listeModu) { DURUM.listeModu = false; listeArayuzunuGuncelle(); }
    clearTimeout(z);
    z = setTimeout(() => katalogYukle(), 420);
  });
  $("searchClear").addEventListener("click", () => {
    $("search").value = ""; DURUM.arama = ""; $("searchClear").hidden = true;
    katalogYukle();
    $("search").focus();
  });
  $("filters").addEventListener("click", (o) => {
    const b = o.target.closest(".filter");
    if (!b) return;
    DURUM.filtre = b.dataset.tur;
    $("filters").querySelectorAll(".filter").forEach((f) => f.classList.toggle("is-active", f === b));
    if (DURUM.listeModu) { DURUM.listeModu = false; listeArayuzunuGuncelle(); }
    katalogYukle();
  });
  $("listChip").addEventListener("click", () => {
    if (!DURUM.listeModu && DURUM.liste.size === 0) {
      bildir("Listeniz boş. Bir filmi açıp “Listeme ekle” düğmesini kullanın.");
      return;
    }
    DURUM.listeModu = !DURUM.listeModu;
    if (DURUM.listeModu) { DURUM.arama = ""; DURUM.filtre = "Tümü"; $("search").value = ""; $("searchClear").hidden = true;
      $("filters").querySelectorAll(".filter").forEach(f => f.classList.toggle("is-active", f.dataset.tur === "Tümü")); }
    kartlariYerlestir();
    listeArayuzunuGuncelle();
    gorunumuYenile(true);
  });
  $("emptyReset").addEventListener("click", filtreleriSifirla);
}

function filtreleriSifirla() {
  DURUM.arama = ""; DURUM.filtre = "Tümü"; DURUM.listeModu = false;
  $("search").value = ""; $("searchClear").hidden = true;
  $("filters").querySelectorAll(".filter").forEach(f => f.classList.toggle("is-active", f.dataset.tur === "Tümü"));
  gelismisSifirla(); listeArayuzunuGuncelle(); katalogYukle();
}

function zoomOlaylari() {
  $("zoomIn").addEventListener("click", () => yakinlastir(DURUM.olcek * 1.25, window.innerWidth / 2, window.innerHeight / 2));
  $("zoomOut").addEventListener("click", () => yakinlastir(DURUM.olcek / 1.25, window.innerWidth / 2, window.innerHeight / 2));
  $("zoomFit").addEventListener("click", () => sigdir(gorunenFilmler(), true));
}

function ekranOlaylari() {
  $("detailBack").addEventListener("click", detayiKapat);
  $("watchBack").addEventListener("click", izlemeyiKapat);
  $("detailWatch").addEventListener("click", () => { if (DURUM.secili) izlemeyiAc(DURUM.secili); });
  $("detailList").addEventListener("click", () => { if (DURUM.secili) listeyeEkleCikar(DURUM.secili); });
  $("logo").addEventListener("click", () => {
    detayiKapat();
    izlemeyiKapat();
    $("watch").hidden = true;
    filtreleriSifirla();
  });
}

function klavyeOlaylari() {
  document.addEventListener("keydown", (o) => {
    const panel = !$("watch").hidden ? $("watch") : !$("detail").hidden ? $("detail") : null;
    if (panel && o.key === "Tab") {
      const odaklar = [...panel.querySelectorAll('button:not([disabled]),a[href],iframe,video,[tabindex="0"]')].filter(n => !n.hidden);
      const ilk = odaklar[0], son = odaklar[odaklar.length-1];
      if (o.shiftKey && (document.activeElement === ilk || !panel.contains(document.activeElement))) {o.preventDefault(); son?.focus();}
      else if (!o.shiftKey && (document.activeElement === son || !panel.contains(document.activeElement))) {o.preventDefault(); ilk?.focus();}
    }
    const y = o.target && o.target.tagName === "INPUT";
    if (o.key === "Escape") {
      if (!$("watch").hidden) { izlemeyiKapat(); return; }
      if (!$("detail").hidden) { detayiKapat(); return; }
      filtreleriSifirla(); return;
    }
    if (KESIF.gorunum === "grid" || o.target.closest("select,button,textarea") || y || !$("detail").hidden || !$("watch").hidden) return;
    const a = 90;
    if (o.key === "ArrowLeft") { DURUM.x += a; gorunumuSinirla(); gorunumuUygula(false); }
    if (o.key === "ArrowRight") { DURUM.x -= a; gorunumuSinirla(); gorunumuUygula(false); }
    if (o.key === "ArrowUp") { DURUM.y += a; gorunumuSinirla(); gorunumuUygula(false); }
    if (o.key === "ArrowDown") { DURUM.y -= a; gorunumuSinirla(); gorunumuUygula(false); }
    if (o.key === "+" || o.key === "=") yakinlastir(DURUM.olcek * 1.2, window.innerWidth / 2, window.innerHeight / 2);
    if (o.key === "-" || o.key === "_") yakinlastir(DURUM.olcek / 1.2, window.innerWidth / 2, window.innerHeight / 2);
  });
}

function baslat() {
  const d = $("world");
  d.style.width = TUZAK.genislik + "px";
  d.style.height = TUZAK.yukseklik + "px";
  d.style.willChange = "transform";

  kartOlaylari();
  suruklemeyiBagla();
  miniHaritaOlaylari();
  filtreOlaylari();
  zoomOlaylari();
  ekranOlaylari();
  klavyeOlaylari();

  window.addEventListener("resize", () => {
    gorunumuSinirla();
    gorunumuUygula(false);
  });

  try {
    const kayit = JSON.parse(localStorage.getItem("cinespace-list-v1") || "[]");
    if (Array.isArray(kayit)) kayit.filter(f => f && typeof f.id === "string" && typeof f.ad === "string" && f.yer && Array.isArray(f.turler)).forEach(f => DURUM.liste.set(f.id,f));
  } catch { /* Bozuk veya engellenmiş yerel depolama uygulamayı durdurmaz. */ }
  $("retryCatalog").addEventListener("click", katalogYukle);
  listeArayuzunuGuncelle();
  katalogYukle();
}

