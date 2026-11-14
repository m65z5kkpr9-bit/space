const pageTitle = document.getElementById('page-title');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const navItems = document.querySelectorAll('.nav-item[data-view]');
const submenuItems = document.querySelectorAll('.submenu-item[data-view]');
const mobileTabItems = document.querySelectorAll('.mobile-tabbar .tab[data-view]');
const navGroups = document.querySelectorAll('.nav-group');
const viewPanels = document.querySelectorAll('.view-panel');

const viewTitles = {
  overview: 'Genel Bakış',
  soil: 'Arazi Sağlığı',
  weather: 'Hava Durumu',
  operations: 'Operasyon',
  drone: 'Drone Görevleri',
  plans: 'İlaçlama Planı',
  schedule: 'Çalışma Takvimi',
  reports: 'Raporlar',
  resources: 'Kaynaklar'
};

const bolgeVerileri = {
  lacin: {
    skor: '%82',
    yagisMm: 420,
    nemPct: 24,
    egimPct: 14,
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 14.5 °C | 🌧️ <strong>Yağış:</strong> 420 mm/yıl | 💧 <strong>SMAP Toprak Nemi:</strong> %24 | ⛰️ <strong>SRTM Eğim:</strong> %14',
    baslik: '🌿 Laçin Mikrokliması: Zeytin, Sebze & Örtü Bitkisi',
    aciklama: '<strong>NASA SRTM & POWER Analizi:</strong> Sakarya Vadisi geçiş iklimi kış donlarına karşı koruma sağlar. %14 vadi eğimi nedeniyle bahar sağanaklarında yüzey erozyonunu önlemek için sıra arası baklagil önerilir.'
  },
  konya: {
    skor: '%68',
    yagisMm: 320,
    nemPct: 16,
    egimPct: 2,
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 11.8 °C | 🌧️ <strong>Yağış:</strong> 320 mm/yıl | 💧 <strong>SMAP Toprak Nemi:</strong> %16 (Kritik) | ⛰️ <strong>SRTM Eğim:</strong> %2',
    baslik: '🌾 Konya Kurak Step: Buğday – Nohut/Mercimek Rotasyonu',
    aciklama: '<strong>NASA SMAP & POWER Analizi:</strong> Düşük yağış ve %16 yüzey nemi nedeniyle yüksek su tüketen bitkiler risklidir. Toprağa azot bağlayan ve derin köklü kuraklığa dayanıklı nohut rotasyonu su tasarrufu sağlar.'
  },
  cukurova: {
    skor: '%91',
    yagisMm: 650,
    ndvi: 0.78,
    egimPct: 1,
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 19.2 °C | 🌧️ <strong>Yağış:</strong> 650 mm/yıl | 🛰️ <strong>Sentinel-2 NDVI:</strong> 0.78 | ⛰️ <strong>SRTM Eğim:</strong> %1',
    baslik: '☀️ Çukurova Alüvyon Ovası: Pamuk & İkinci Ürün Mısır',
    aciklama: '<strong>Sentinel-2 NDVI & ECOSTRESS Analizi:</strong> Yüksek biyokütle canlılığı mevcut. Yaz aylarında artan yüzey sıcaklığı (LST) ve buharlaşma kaybını önlemek için damla sulama ve gece sulama takvimi önerilir.'
  },
  rize: {
    skor: '%76',
    yagisMm: 2250,
    nemPct: 44,
    egimPct: 32,
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 14.2 °C | 🌧️ <strong>GPM/IMERG Yağış:</strong> 2250 mm/yıl | 💧 <strong>SMAP Nem:</strong> %44 | ⛰️ <strong>SRTM Eğim:</strong> %32',
    baslik: '🌧️ Doğu Karadeniz Nemli Orman Yamacı: Çay & Kök Tutucu Bitkiler',
    aciklama: '<strong>NASA GPM/IMERG & SRTM Analizi:</strong> Aşırı yağış birikimi ve %32 dik eğim nedeniyle toprak kayması ve mineral yıkanması riski yüksektir. Teraslama ve derin köklü ara örtü bitkileri zorunludur.'
  }
};

const bolgeRaporOnerileri = {
  lacin: [
    'Yağış öncesinde sıra arası örtü bitkisini koruyarak çıplak toprağı ve yüzey akışını azaltın.',
    '%14 eğimli parsellerde ekim sıralarını mümkün olduğunca eş yükselti çizgilerine göre planlayın.',
    'Kurak dönemlerde kök bölgesi nemini aynı noktalardan düzenli izleyin; sulama kararını tek ölçüme dayandırmayın.'
  ],
  konya: [
    'Hasat artıklarını yüzeyde tutmayı ve minimum toprak işlemeyi değerlendirerek buharlaşmayı sınırlayın.',
    'Sulama öncesinde kök bölgesi nemini doğrulayın; su kısıtında kritik gelişim dönemlerine öncelik verin.',
    'Nohut veya mercimek rotasyonlarının sezon sonu verim ve su tüketimini kaydedip sonraki ekim planıyla karşılaştırın.'
  ],
  cukurova: [
    'NDVI değeri düşük görülen alanlarda sulamayı artırmadan önce tıkanıklık, tuzluluk ve bitki besleme farklarını kontrol edin.',
    'Sulama miktarını sabit takvim yerine toprak nemi ve bitkinin gelişim evresine göre kademelendirin.',
    'Hasat sonrası bitki artıklarını yöneterek toprağın doğrudan güneş ve buharlaşmaya maruz kalmasını azaltın.'
  ],
  rize: [
    'Şiddetli yağışlardan sonra terasları, drenaj çıkışlarını ve yeni yüzey akış kanallarını yerinde kontrol edin.',
    'Dik alanlarda sürekli bitki örtüsünü koruyun; çıplak şeritleri sezon boyunca izleyin.',
    'Besin yıkanmasını azaltmak için gübreleme zamanını yağış tahminiyle eşleştirin ve dozu yerel uzmanla doğrulayın.'
  ]
};

function showView(view) {
  viewPanels.forEach(panel => {
    const isActive = panel.dataset.view === view;
    panel.classList.toggle('active', isActive);
  });
}

function setActiveNav(view) {
  const activeNav = document.querySelector(`.nav-item[data-view="${view}"]`);
  const activeSubmenu = document.querySelector(`.submenu-item[data-view="${view}"]`);

  navItems.forEach(item => item.classList.toggle('active', item === activeNav));
  submenuItems.forEach(item => item.classList.toggle('active', item === activeSubmenu));
  mobileTabItems.forEach(item => item.classList.toggle('active', item.dataset.view === view));

  navGroups.forEach(group => {
    const hasMatch = group.querySelector(`.submenu-item[data-view="${view}"]`);
    group.classList.toggle('open', Boolean(hasMatch) || group.querySelector('.nav-item').dataset.view === view);
  });

  if (pageTitle && viewTitles[view]) {
    pageTitle.textContent = viewTitles[view];
  }

  if (viewPanels.length) {
    showView(view);
  }
}

function closeMenu() {
  document.body.classList.remove('menu-open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Menüyü aç');
  }
}

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', function() {
    const isOpen = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
  });
}

if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener('click', closeMenu);
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') closeMenu();
});

navItems.forEach(item => {
  item.addEventListener('click', function() {
    const view = this.dataset.view;
    if (view === 'operations') {
      const group = this.closest('.nav-group');
      const isOpen = group.classList.contains('open');
      navGroups.forEach(g => g.classList.toggle('open', g === group ? !isOpen : false));

      const defaultSubItem = group.querySelector('.submenu-item[data-view="drone"]') || group.querySelector('.submenu-item');
      if (defaultSubItem) {
        setActiveNav(defaultSubItem.dataset.view);
        closeMenu();
        return;
      }

      this.classList.add('active');
      if (pageTitle) pageTitle.textContent = 'Operasyon';
      closeMenu();
      return;
    }

    setActiveNav(view);
    closeMenu();
  });
});

submenuItems.forEach(item => {
  item.addEventListener('click', function() {
    setActiveNav(this.dataset.view);
    closeMenu();
  });
});

mobileTabItems.forEach(item => {
  item.addEventListener('click', function() {
    setActiveNav(this.dataset.view);
    closeMenu();
  });
});

const bolgeSecici = document.getElementById('bolge-secici');
if (bolgeSecici) {
  bolgeSecici.addEventListener('change', function (e) {
    const secilen = bolgeVerileri[e.target.value];
    if (!secilen) return;

    const skorMetni = document.getElementById('skor-metni');
    const nasaVeriOzeti = document.getElementById('nasa-veri-ozeti');
    const rotasyonIcerik = document.getElementById('rotasyon-icerik');

    if (skorMetni) skorMetni.innerText = secilen.skor;
    if (nasaVeriOzeti) nasaVeriOzeti.innerHTML = secilen.telemetri;
    if (rotasyonIcerik) rotasyonIcerik.innerHTML = `<h4>${secilen.baslik}</h4><p>${secilen.aciklama}</p>`;
  });
}

showView('overview');
setActiveNav('overview');

/* 1. DRON ALARMI (Sayfa açıldıktan 4 saniye sonra çıksın) */
setTimeout(function() {
  const alarm = document.getElementById('dron-alarmi');
  if (alarm) alarm.classList.remove('gizli');
}, 8000);

const alarmKapat = document.getElementById('alarm-kapat');
if (alarmKapat) {
  alarmKapat.addEventListener('click', function() {
    const alarm = document.getElementById('dron-alarmi');
    if (alarm) alarm.classList.add('gizli');
  });
}

/* 2. ARAZİ SKORUNU GÜNCELLEME (Yalancı yükleme efekti) */
const guncelleBtn = document.getElementById('guncelle-btn');
if (guncelleBtn) {
  guncelleBtn.addEventListener('click', function() {
    const skorMetni = document.getElementById('skor-metni');
    if (!skorMetni) return;

    skorMetni.innerText = 'Hesaplanıyor...';

    setTimeout(function() {
      skorMetni.innerText = '%85';
    }, 1500);
  });
}

const droneSvg = document.getElementById('drone-svg');
const ilaclamaButonu = document.getElementById('ilaclamayi-baslat');

if (droneSvg && ilaclamaButonu) {
  ilaclamaButonu.addEventListener('click', function() {
    const aktif = droneSvg.classList.toggle('drone-aktif');
    ilaclamaButonu.textContent = aktif ? 'İlaçlamayı Durdur' : 'İlaçlamayı Başlat';
  });
}

/* 3. İKLİM VE RİSK SENARYOSU SEÇİCİ */
const senaryoSecici = document.getElementById('senaryo-secici');
if (senaryoSecici) {
  senaryoSecici.addEventListener('change', function(e) {
    const secim = e.target.value;
    const uyariKutusu = document.getElementById('uyari-kutusu');

    if (!uyariKutusu) return;

    if (secim === 'normal') {
      uyariKutusu.className = 'uyari-normal';
      uyariKutusu.innerHTML = 'Şu anki toprak nemi ve sıcaklık ideal seviyede.';
    } else if (secim === 'yagis') {
      uyariKutusu.className = 'uyari-tehlike';
      uyariKutusu.innerHTML = '⚠️ EROZYON RİSKİ: SMAP uydu verilerine göre aşırı yağış bekleniyor. Eğilimli bölgelerde örtü bitkisi (cover crop) kökleri tutabilir.';
    } else if (secim === 'don') {
      uyariKutusu.className = 'uyari-dikkat';
      uyariKutusu.innerHTML = '❄️ DON TEHLİKESİ: Gece yüzey sıcaklığı sıfırın altına düşecek. Hassas mahsuller için sulama yapmayın.';
    }
  });
}

/* 4. ROTASYON SEKMELERİNİ DEĞİŞTİRME */
function rotasyonGoster(senaryo) {
  const icerik = document.getElementById('rotasyon-icerik');
  if (!icerik) return;

  if (senaryo === 'mevcut') {
    icerik.innerHTML = `
      <h4>🌾 Mevcut: Buğday Monokültürü</h4>
      <p><strong>Analiz:</strong> Yıllardır aynı ürün ekildiği için toprak yorgun. Su tüketimi orta seviyede.</p>
    `;
  } else if (senaryo === 'kuraklik') {
    icerik.innerHTML = `
      <h4>🏜️ Kuraklık Dirençli: Nohut veya Mercimek</h4>
      <p><strong>Analiz:</strong> Yağışların azaldığı senaryoda su tasarrufu sağlar. Kök yapısı topraktaki mevcut nemi daha iyi kullanır.</p>
    `;
  } else if (senaryo === 'azot') {
    icerik.innerHTML = `
      <h4>🌱 Toprak İyileştirici: Yonca (Alfalfa)</h4>
      <p><strong>Analiz:</strong> Havadan aldığı azotu toprağa bağlar. Bir sonraki sezon ekilecek ana ürünün verimini %20 artırır.</p>
    `;
  }
}

const raporIndirButonu = document.getElementById('rapor-indir');
if (raporIndirButonu) {
  raporIndirButonu.addEventListener('click', function() {
    const bolgeKodu = bolgeSecici.value;
    const bolge = bolgeVerileri[bolgeKodu];
    const bolgeler = Object.keys(bolgeVerileri);
    const bolgeAdi = bolgeSecici.selectedOptions[0].textContent.trim();
    const skorDegeri = kod => Number.parseInt(bolgeVerileri[kod].skor.replace('%', ''), 10);
    const skor = skorDegeri(bolgeKodu);
    const skorOrtalamasi = bolgeler.reduce((toplam, kod) => toplam + skorDegeri(kod), 0) / bolgeler.length;
    const yagisOrtalamasi = bolgeler.reduce((toplam, kod) => toplam + bolgeVerileri[kod].yagisMm, 0) / bolgeler.length;
    const skorSirasi = [...bolgeler].sort((a, b) => skorDegeri(b) - skorDegeri(a)).indexOf(bolgeKodu) + 1;
    const formatSayi = value => new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 }).format(value);
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
    const skorDurumu = skor >= 85 ? 'Çok iyi' : skor >= 75 ? 'İyi' : skor >= 60 ? 'İzlenmeli' : 'Riskli';
    const egimDurumu = bolge.egimPct >= 25 ? 'yüksek' : bolge.egimPct >= 12 ? 'orta' : 'düşük';
    const yagisFarki = ((bolge.yagisMm - yagisOrtalamasi) / yagisOrtalamasi) * 100;
    const skorFarki = skor - skorOrtalamasi;
    const gostergeAdi = bolge.nemPct !== undefined ? 'Toprak nemi' : 'Bitki canlılığı (NDVI)';
    const gostergeDegeri = bolge.nemPct !== undefined ? `%${bolge.nemPct}` : formatSayi(bolge.ndvi);
    const gostergeNotu = bolge.nemPct !== undefined ? 'SMAP göstergesi' : 'Sentinel-2 göstergesi';
    const puanGrafikSatirlari = bolgeler.map(kod => {
      const option = Array.from(bolgeSecici.options).find(item => item.value === kod);
      const bolgeSkoru = skorDegeri(kod);
      return `<div class="chart-row ${kod === bolgeKodu ? 'selected' : ''}">
        <div class="chart-label"><span>${escapeHtml(option.textContent.trim())}</span><strong>%${bolgeSkoru}</strong></div>
        <div class="bar-track"><div class="bar score-bar" style="width:${bolgeSkoru}%"></div></div>
      </div>`;
    }).join('');
    const yagisGrafikSatirlari = [...bolgeler].sort((a, b) => bolgeVerileri[b].yagisMm - bolgeVerileri[a].yagisMm).map(kod => {
      const option = Array.from(bolgeSecici.options).find(item => item.value === kod);
      const yagis = bolgeVerileri[kod].yagisMm;
      const barWidth = (yagis / Math.max(...bolgeler.map(item => bolgeVerileri[item].yagisMm))) * 100;
      return `<div class="chart-row ${kod === bolgeKodu ? 'selected' : ''}">
        <div class="chart-label"><span>${escapeHtml(option.textContent.trim())}</span><strong>${formatSayi(yagis)} mm</strong></div>
        <div class="bar-track"><div class="bar rain-bar" style="width:${barWidth}%"></div></div>
      </div>`;
    }).join('');
    const oneriler = bolgeRaporOnerileri[bolgeKodu].map(oneri => `<li>${escapeHtml(oneri)}</li>`).join('');
    const senaryoOnerileri = {
      normal: 'Sulama kararından önce kök bölgesi nemini doğrulayın ve parsel gözlemlerini düzenli kaydedin.',
      yagis: 'Aşırı yağış sonrasında eğimli alanlarda erozyon izlerini ve drenaj çıkışlarını kontrol edin; toprak tavı uygun değilken arazi trafiğini sınırlayın.',
      don: 'Yerel tahmini ve ürünün don hassasiyetini birlikte değerlendirin; müdahaleyi ürün türüne ve gelişim dönemine göre uzmanla doğrulayın.'
    };
    const seciliSenaryo = senaryoSecici.selectedOptions[0].textContent.trim();
    const riskMetni = document.getElementById('uyari-kutusu').innerText.trim();
    const rotasyonMetni = document.getElementById('rotasyon-icerik').innerText.trim();
    const gecmisDegerlendirme = bolge.aciklama.replace(/<\/?strong>/g, '');
    const now = new Date();
    const raporTarihi = now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    const html = `<!doctype html>
      <html lang="tr">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${escapeHtml(bolgeAdi)} - MECMua Arazi Raporu</title>
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; background: #edf2ef; color: #20302a; font: 14px/1.5 Arial, sans-serif; }
            .toolbar { position: sticky; top: 0; z-index: 1; display: flex; justify-content: center; padding: 14px; background: #14251e; }
            .print-button { border: 0; border-radius: 9px; padding: 12px 20px; background: #39a96b; color: white; font-size: 15px; font-weight: 700; cursor: pointer; }
            .report { max-width: 980px; margin: 24px auto; padding: 32px; background: white; box-shadow: 0 12px 40px #173a2b1c; }
            .hero { display: flex; justify-content: space-between; gap: 24px; padding: 28px; border-radius: 16px; background: linear-gradient(120deg, #12382c, #24784c); color: white; }
            .eyebrow { margin: 0 0 7px; color: #b7e5c7; font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
            h1 { margin: 0; font-size: 29px; line-height: 1.15; }
            .hero-location { margin: 10px 0 0; color: #e5f5e9; }
            .hero-date { margin: 0; color: #d7eee0; text-align: right; white-space: nowrap; }
            .score-badge { min-width: 132px; padding: 15px; border: 1px solid #ffffff50; border-radius: 14px; text-align: center; }
            .score-badge strong { display: block; font-size: 34px; line-height: 1.1; }
            .score-badge span { display: block; margin-top: 5px; font-size: 12px; }
            .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 18px 0; }
            .metric { padding: 15px; border: 1px solid #e1e9e3; border-radius: 12px; background: #f8faf8; }
            .metric-label { display: block; color: #64746a; font-size: 11px; font-weight: 700; text-transform: uppercase; }
            .metric-value { display: block; margin: 5px 0 2px; color: #1d7145; font-size: 24px; font-weight: 800; }
            .metric-note { color: #718077; font-size: 11px; }
            .section { margin-top: 20px; }
            h2 { margin: 0 0 10px; color: #183c2b; font-size: 17px; }
            .section-intro { margin: 0; color: #526258; }
            .charts { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; }
            .chart-card { padding: 17px; border: 1px solid #e1e9e3; border-radius: 12px; break-inside: avoid; }
            .chart-card h3 { margin: 0 0 12px; font-size: 14px; }
            .chart-row { margin: 10px 0; }
            .chart-label { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 4px; color: #57665d; font-size: 11px; }
            .chart-label span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .chart-label strong { color: #263b2f; white-space: nowrap; }
            .selected .chart-label, .selected .chart-label strong { color: #17703f; font-weight: 800; }
            .bar-track { height: 8px; overflow: hidden; border-radius: 99px; background: #eaf0eb; }
            .bar { height: 100%; border-radius: inherit; }
            .score-bar { background: linear-gradient(90deg, #72c88d, #23844d); }
            .rain-bar { background: linear-gradient(90deg, #84b9d1, #357ea0); }
            .insight { padding: 16px; border-left: 4px solid #39a96b; border-radius: 8px; background: #f2f8f3; color: #45554a; }
            .insight p { margin: 5px 0 0; }
            .risk { border-color: ${senaryoSecici.value === 'yagis' ? '#d88a37' : senaryoSecici.value === 'don' ? '#5a94b4' : '#39a96b'}; background: ${senaryoSecici.value === 'yagis' ? '#fff7ed' : senaryoSecici.value === 'don' ? '#eef7fb' : '#f2f8f3'}; }
            .recommendations { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
            .recommendation-card { padding: 17px; border: 1px solid #e1e9e3; border-radius: 12px; break-inside: avoid; }
            .recommendation-card h3 { margin: 0 0 9px; color: #206b42; font-size: 14px; }
            ul { margin: 0; padding-left: 19px; color: #4b5a50; }
            li { margin: 7px 0; }
            .footnote { margin-top: 18px; padding-top: 12px; border-top: 1px solid #e1e9e3; color: #758078; font-size: 10px; }
            @page { size: A4; margin: 12mm; }
            @media (max-width: 700px) {
              .report { margin: 0; padding: 16px; }
              .hero { padding: 20px; }
              .metrics { grid-template-columns: repeat(2, 1fr); }
              .charts, .recommendations { grid-template-columns: 1fr; }
            }
            @media print {
              body { background: white; font-size: 11px; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
              .toolbar { display: none; }
              .report { max-width: none; margin: 0; padding: 0; box-shadow: none; }
              .hero { padding: 20px; }
              .section, .metric, .chart-card, .recommendation-card, .insight { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="toolbar"><button class="print-button" type="button" onclick="window.print()">PDF olarak kaydet / yazdır</button></div>
          <main class="report">
            <header class="hero">
              <div>
                <p class="eyebrow">MECMua • Tarım Yönetim Sistemi</p>
                <h1>Bölge Durum Raporu</h1>
                <p class="hero-location">${escapeHtml(bolgeAdi)}</p>
                <p class="hero-date">Rapor tarihi<br><strong>${escapeHtml(raporTarihi)}</strong></p>
              </div>
              <div class="score-badge"><strong>%${skor}</strong><span>${escapeHtml(skorDurumu)} arazi skoru</span></div>
            </header>
            <section class="metrics" aria-label="Bölge göstergeleri">
              <div class="metric"><span class="metric-label">Yıllık yağış</span><strong class="metric-value">${formatSayi(bolge.yagisMm)}</strong><span class="metric-note">mm / yıl</span></div>
              <div class="metric"><span class="metric-label">${escapeHtml(gostergeAdi)}</span><strong class="metric-value">${escapeHtml(gostergeDegeri)}</strong><span class="metric-note">${escapeHtml(gostergeNotu)}</span></div>
              <div class="metric"><span class="metric-label">Arazi eğimi</span><strong class="metric-value">%${formatSayi(bolge.egimPct)}</strong><span class="metric-note">${escapeHtml(egimDurumu)} erozyon hassasiyeti</span></div>
              <div class="metric"><span class="metric-label">Pilot skoru sırası</span><strong class="metric-value">${skorSirasi} / ${bolgeler.length}</strong><span class="metric-note">Tanımlı pilot bölgeler arasında</span></div>
            </section>
            <section class="section">
              <h2>Öne çıkan istatistikler</h2>
              <p class="section-intro">Arazi skoru, dört pilot bölgenin ${formatSayi(skorOrtalamasi)} puan ortalamasının ${Math.abs(skorFarki).toLocaleString('tr-TR', { maximumFractionDigits: 1 })} puan ${skorFarki >= 0 ? 'üzerinde' : 'altında'}. Yıllık yağış ise pilot bölge ortalamasından %${Math.abs(yagisFarki).toLocaleString('tr-TR', { maximumFractionDigits: 1 })} ${yagisFarki >= 0 ? 'yüksek' : 'düşük'} (${formatSayi(yagisOrtalamasi)} mm/yıl).</p>
              <div class="charts">
                <div class="chart-card"><h3>Pilot bölgelerde arazi skoru</h3>${puanGrafikSatirlari}</div>
                <div class="chart-card"><h3>Pilot bölgelerde yıllık yağış</h3>${yagisGrafikSatirlari}</div>
              </div>
            </section>
            <section class="section recommendations">
              <div class="insight">
                <h2>Bölgesel değerlendirme</h2>
                <strong>${escapeHtml(bolge.baslik.replace(/<[^>]*>/g, ''))}</strong>
                <p>${escapeHtml(gecmisDegerlendirme)}</p>
              </div>
              <div class="insight risk">
                <h2>Seçili senaryo: ${escapeHtml(seciliSenaryo)}</h2>
                <p>${escapeHtml(riskMetni)}</p>
                <p><strong>Önerilen takip:</strong> ${escapeHtml(senaryoOnerileri[senaryoSecici.value])}</p>
              </div>
            </section>
            <section class="section recommendations">
              <div class="recommendation-card">
                <h3>Bu bölge için ek saha önerileri</h3>
                <ul>${oneriler}</ul>
              </div>
              <div class="recommendation-card">
                <h3>Uygulamadaki rotasyon notu</h3>
                <p>${escapeHtml(rotasyonMetni)}</p>
                <p><strong>Eğim göstergesi:</strong> %${formatSayi(bolge.egimPct)} — ${escapeHtml(egimDurumu)} erozyon hassasiyeti.</p>
              </div>
            </section>
            <footer class="footnote">
              Karşılaştırmalar yalnızca uygulamada tanımlı dört pilot bölgenin verileriyle hesaplanmıştır; Türkiye geneli ortalaması değildir.
              Rapor, uygulamadaki örnek/sabit göstergelerden otomatik oluşturulmuştur. Ek öneriler genel karar desteğidir; saha koşulları ve yerel uzman görüşüyle doğrulanmalıdır.
            </footer>
          </main>
        </body>
      </html>`;
    const reportWindow = window.open('', '_blank');

    if (!reportWindow) {
      window.alert('PDF raporu açılamadı. Tarayıcıda açılır pencerelere izin verip yeniden deneyin.');
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(html);
    reportWindow.document.close();
    reportWindow.focus();
    window.setTimeout(() => reportWindow.print(), 500);
  });
}

