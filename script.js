const pageTitle = document.getElementById('page-title');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const navItems = document.querySelectorAll('.nav-item[data-view]');
const submenuItems = document.querySelectorAll('.submenu-item[data-view]');
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
  reports: 'Raporlar'
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

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
  });
}

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
        return;
      }

      this.classList.add('active');
      if (pageTitle) pageTitle.textContent = 'Operasyon';
      return;
    }

    setActiveNav(view);
  });
});

submenuItems.forEach(item => {
  item.addEventListener('click', function() {
    setActiveNav(this.dataset.view);
  });
});

showView('overview');
setActiveNav('overview');

/* 1. DRON ALARMI (Sayfa açıldıktan 4 saniye sonra çıksın) */
setTimeout(function() {
  const alarm = document.getElementById('dron-alarmi');
  if (alarm) alarm.classList.remove('gizli');
}, 4000);

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

