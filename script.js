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
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 14.5 °C | 🌧️ <strong>Yağış:</strong> 420 mm/yıl | 💧 <strong>SMAP Toprak Nemi:</strong> %24 | ⛰️ <strong>SRTM Eğim:</strong> %14',
    baslik: '🌿 Laçin Mikrokliması: Zeytin, Sebze & Örtü Bitkisi',
    aciklama: '<strong>NASA SRTM & POWER Analizi:</strong> Sakarya Vadisi geçiş iklimi kış donlarına karşı koruma sağlar. %14 vadi eğimi nedeniyle bahar sağanaklarında yüzey erozyonunu önlemek için sıra arası baklagil önerilir.'
  },
  konya: {
    skor: '%68',
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 11.8 °C | 🌧️ <strong>Yağış:</strong> 320 mm/yıl | 💧 <strong>SMAP Toprak Nemi:</strong> %16 (Kritik) | ⛰️ <strong>SRTM Eğim:</strong> %2',
    baslik: '🌾 Konya Kurak Step: Buğday – Nohut/Mercimek Rotasyonu',
    aciklama: '<strong>NASA SMAP & POWER Analizi:</strong> Düşük yağış ve %16 yüzey nemi nedeniyle yüksek su tüketen bitkiler risklidir. Toprağa azot bağlayan ve derin köklü kuraklığa dayanıklı nohut rotasyonu su tasarrufu sağlar.'
  },
  cukurova: {
    skor: '%91',
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 19.2 °C | 🌧️ <strong>Yağış:</strong> 650 mm/yıl | 🛰️ <strong>Sentinel-2 NDVI:</strong> 0.78 | ⛰️ <strong>SRTM Eğim:</strong> %1',
    baslik: '☀️ Çukurova Alüvyon Ovası: Pamuk & İkinci Ürün Mısır',
    aciklama: '<strong>Sentinel-2 NDVI & ECOSTRESS Analizi:</strong> Yüksek biyokütle canlılığı mevcut. Yaz aylarında artan yüzey sıcaklığı (LST) ve buharlaşma kaybını önlemek için damla sulama ve gece sulama takvimi önerilir.'
  },
  rize: {
    skor: '%76',
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 14.2 °C | 🌧️ <strong>GPM/IMERG Yağış:</strong> 2250 mm/yıl | 💧 <strong>SMAP Nem:</strong> %44 | ⛰️ <strong>SRTM Eğim:</strong> %32',
    baslik: '🌧️ Doğu Karadeniz Nemli Orman Yamacı: Çay & Kök Tutucu Bitkiler',
    aciklama: '<strong>NASA GPM/IMERG & SRTM Analizi:</strong> Aşırı yağış birikimi ve %32 dik eğim nedeniyle toprak kayması ve mineral yıkanması riski yüksektir. Teraslama ve derin köklü ara örtü bitkileri zorunludur.'
  }
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

