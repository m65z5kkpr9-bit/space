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
  overview: 'Overview',
  soil: 'Soil Health',
  weather: 'Weather',
  operations: 'Operations',
  drone: 'Drone Missions',
  plans: 'Spraying Plan',
  schedule: 'Work Schedule',
  reports: 'Reports',
  resources: 'Resources'
};

const bolgeVerileri = {
  lacin: {
    skor: '82%',
    yagisMm: 420,
    nemPct: 24,
    egimPct: 14,
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 14.5 °C | 🌧️ <strong>Precipitation:</strong> 420 mm/year | 💧 <strong>SMAP soil moisture:</strong> 24% | ⛰️ <strong>SRTM slope:</strong> 14%',
    baslik: '🌿 Laçin Valley Microclimate: Olives, Vegetables & Cover Crops',
    aciklama: '<strong>NASA SRTM & POWER analysis:</strong> The Sakarya Valley transition climate helps protect against winter frost. With a 14% valley slope, cover crops between rows are recommended to reduce surface erosion during spring showers.'
  },
  konya: {
    skor: '68%',
    yagisMm: 320,
    nemPct: 16,
    egimPct: 2,
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 11.8 °C | 🌧️ <strong>Precipitation:</strong> 320 mm/year | 💧 <strong>SMAP soil moisture:</strong> 16% (Critical) | ⛰️ <strong>SRTM slope:</strong> 2%',
    baslik: '🌾 Konya Arid Steppe: Wheat–Chickpea/Lentil Rotation',
    aciklama: '<strong>NASA SMAP & POWER analysis:</strong> Low rainfall and 16% surface moisture make water-intensive crops risky. A drought-tolerant chickpea rotation can conserve water while adding nitrogen to the soil.'
  },
  cukurova: {
    skor: '91%',
    yagisMm: 650,
    ndvi: 0.78,
    egimPct: 1,
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 19.2 °C | 🌧️ <strong>Precipitation:</strong> 650 mm/year | 🛰️ <strong>Sentinel-2 NDVI:</strong> 0.78 | ⛰️ <strong>SRTM slope:</strong> 1%',
    baslik: '☀️ Çukurova Alluvial Plain: Cotton & Second-Crop Maize',
    aciklama: '<strong>Sentinel-2 NDVI & ECOSTRESS analysis:</strong> Vegetation vitality is high. Drip irrigation and a nighttime irrigation schedule are recommended to limit summer surface-temperature (LST) and evaporation losses.'
  },
  rize: {
    skor: '76%',
    yagisMm: 2250,
    nemPct: 44,
    egimPct: 32,
    telemetri: '🌡️ <strong>NASA POWER (T2M):</strong> 14.2 °C | 🌧️ <strong>GPM/IMERG precipitation:</strong> 2,250 mm/year | 💧 <strong>SMAP soil moisture:</strong> 44% | ⛰️ <strong>SRTM slope:</strong> 32%',
    baslik: '🌧️ Eastern Black Sea Humid Forest Slope: Tea & Deep-Rooted Cover Crops',
    aciklama: '<strong>NASA GPM/IMERG & SRTM analysis:</strong> Heavy rainfall and a steep 32% slope create a high risk of landslides and mineral leaching. Terracing and deep-rooted cover crops are essential.'
  }
};

const bolgeRaporOnerileri = {
  lacin: [
    'Maintain inter-row cover crops before rainfall to reduce bare soil and surface runoff.',
    'On 14% slopes, align planting rows along contour lines wherever practical.',
    'During dry periods, monitor root-zone moisture at consistent locations; avoid basing irrigation decisions on a single reading.'
  ],
  konya: [
    'Consider retaining crop residues and minimizing tillage to limit evaporation.',
    'Check root-zone moisture before irrigation; under water constraints, prioritize critical growth stages.',
    'Record end-of-season yield and water use for chickpea or lentil rotations and compare them when planning the next crop.'
  ],
  cukurova: [
    'In low-NDVI areas, check for clogged emitters, salinity, and nutrient differences before increasing irrigation.',
    'Schedule irrigation in stages based on soil moisture and crop growth rather than a fixed calendar.',
    'Manage post-harvest residues to reduce direct sun exposure and soil evaporation.'
  ],
  rize: [
    'After heavy rainfall, inspect terraces, drainage outlets, and any new runoff channels in the field.',
    'Maintain continuous vegetation on steep ground and monitor bare strips throughout the season.',
    'Time fertilizer applications around the rainfall forecast to limit nutrient leaching, and confirm rates with a local specialist.'
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
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
}

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', function() {
    const isOpen = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
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
      if (pageTitle) pageTitle.textContent = 'Operations';
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

/* 1. Show the drone alert after the page loads. */
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

/* 2. Update the field score with a simulated loading effect. */
const guncelleBtn = document.getElementById('guncelle-btn');
if (guncelleBtn) {
  guncelleBtn.addEventListener('click', function() {
    const skorMetni = document.getElementById('skor-metni');
    if (!skorMetni) return;

    skorMetni.innerText = 'Calculating...';

    setTimeout(function() {
      skorMetni.innerText = '85%';
    }, 1500);
  });
}

const droneSvg = document.getElementById('drone-svg');
const ilaclamaButonu = document.getElementById('ilaclamayi-baslat');

if (droneSvg && ilaclamaButonu) {
  ilaclamaButonu.addEventListener('click', function() {
    const aktif = droneSvg.classList.toggle('drone-aktif');
    ilaclamaButonu.textContent = aktif ? 'Stop Spraying' : 'Start Spraying';
  });
}

/* 3. Climate and risk scenario selector. */
const senaryoSecici = document.getElementById('senaryo-secici');
if (senaryoSecici) {
  senaryoSecici.addEventListener('change', function(e) {
    const secim = e.target.value;
    const uyariKutusu = document.getElementById('uyari-kutusu');

    if (!uyariKutusu) return;

    if (secim === 'normal') {
      uyariKutusu.className = 'uyari-normal';
      uyariKutusu.innerHTML = 'Current soil moisture and temperature are within the ideal range.';
    } else if (secim === 'rain') {
      uyariKutusu.className = 'uyari-tehlike';
      uyariKutusu.innerHTML = '⚠️ EROSION RISK: SMAP satellite data indicates heavy rainfall. Cover crops can help stabilize sloped areas.';
    } else if (secim === 'frost') {
      uyariKutusu.className = 'uyari-dikkat';
      uyariKutusu.innerHTML = '❄️ FROST WARNING: Surface temperatures are expected to fall below freezing overnight. Avoid irrigating frost-sensitive crops.';
    }
  });
}

/* 4. Crop rotation tabs. */
function rotasyonGoster(senaryo) {
  const icerik = document.getElementById('rotasyon-icerik');
  if (!icerik) return;

  if (senaryo === 'current') {
    icerik.innerHTML = `
      <h4>🌾 Current: Wheat Monoculture</h4>
      <p><strong>Analysis:</strong> Repeatedly growing the same crop can deplete the soil. Water use is moderate.</p>
    `;
  } else if (senaryo === 'drought') {
    icerik.innerHTML = `
      <h4>🏜️ Drought-Resistant: Chickpea or Lentil</h4>
      <p><strong>Analysis:</strong> Conserves water when rainfall is limited. Its root system makes better use of available soil moisture.</p>
    `;
  } else if (senaryo === 'soil-building') {
    icerik.innerHTML = `
      <h4>🌱 Soil-Building: Alfalfa</h4>
      <p><strong>Analysis:</strong> Fixes atmospheric nitrogen in the soil and can improve yields for the main crop planted next season.</p>
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
    const formatSayi = value => new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value);
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
    const skorDurumu = skor >= 85 ? 'Excellent' : skor >= 75 ? 'Good' : skor >= 60 ? 'Needs monitoring' : 'At risk';
    const egimDurumu = bolge.egimPct >= 25 ? 'high' : bolge.egimPct >= 12 ? 'moderate' : 'low';
    const yagisFarki = ((bolge.yagisMm - yagisOrtalamasi) / yagisOrtalamasi) * 100;
    const skorFarki = skor - skorOrtalamasi;
    const gostergeAdi = bolge.nemPct !== undefined ? 'Soil moisture' : 'Vegetation health (NDVI)';
    const gostergeDegeri = bolge.nemPct !== undefined ? `${bolge.nemPct}%` : formatSayi(bolge.ndvi);
    const gostergeNotu = bolge.nemPct !== undefined ? 'SMAP indicator' : 'Sentinel-2 indicator';
    const puanGrafikSatirlari = bolgeler.map(kod => {
      const option = Array.from(bolgeSecici.options).find(item => item.value === kod);
      const bolgeSkoru = skorDegeri(kod);
      return `<div class="chart-row ${kod === bolgeKodu ? 'selected' : ''}">
        <div class="chart-label"><span>${escapeHtml(option.textContent.trim())}</span><strong>${bolgeSkoru}%</strong></div>
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
      normal: 'Check root-zone moisture before making irrigation decisions and keep regular field observations.',
      rain: 'After heavy rainfall, inspect sloped areas for erosion and check drainage outlets; limit field traffic when the soil is too wet.',
      frost: 'Consider the local forecast and crop frost sensitivity together; confirm any intervention with a specialist based on crop type and growth stage.'
    };
    const seciliSenaryo = senaryoSecici.selectedOptions[0].textContent.trim();
    const riskMetni = document.getElementById('uyari-kutusu').innerText.trim();
    const rotasyonMetni = document.getElementById('rotasyon-icerik').innerText.trim();
    const gecmisDegerlendirme = bolge.aciklama.replace(/<\/?strong>/g, '');
    const now = new Date();
    const raporTarihi = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    const html = `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${escapeHtml(bolgeAdi)} - MECMua Field Report</title>
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
          <div class="toolbar"><button class="print-button" type="button" onclick="window.print()">Save as PDF / Print</button></div>
          <main class="report">
            <header class="hero">
              <div>
                <p class="eyebrow">MECMua • Agricultural Management System</p>
                <h1>Field Status Report</h1>
                <p class="hero-location">${escapeHtml(bolgeAdi)}</p>
                <p class="hero-date">Report date<br><strong>${escapeHtml(raporTarihi)}</strong></p>
              </div>
              <div class="score-badge"><strong>${skor}%</strong><span>${escapeHtml(skorDurumu)} field score</span></div>
            </header>
            <section class="metrics" aria-label="Regional indicators">
              <div class="metric"><span class="metric-label">Annual precipitation</span><strong class="metric-value">${formatSayi(bolge.yagisMm)}</strong><span class="metric-note">mm / year</span></div>
              <div class="metric"><span class="metric-label">${escapeHtml(gostergeAdi)}</span><strong class="metric-value">${escapeHtml(gostergeDegeri)}</strong><span class="metric-note">${escapeHtml(gostergeNotu)}</span></div>
              <div class="metric"><span class="metric-label">Field slope</span><strong class="metric-value">${formatSayi(bolge.egimPct)}%</strong><span class="metric-note">${escapeHtml(egimDurumu)} erosion sensitivity</span></div>
              <div class="metric"><span class="metric-label">Pilot score rank</span><strong class="metric-value">${skorSirasi} / ${bolgeler.length}</strong><span class="metric-note">Among the configured pilot regions</span></div>
            </section>
            <section class="section">
              <h2>Key statistics</h2>
              <p class="section-intro">The field score is ${Math.abs(skorFarki).toLocaleString('en-US', { maximumFractionDigits: 1 })} points ${skorFarki >= 0 ? 'above' : 'below'} the four-region pilot average of ${formatSayi(skorOrtalamasi)}. Annual precipitation is ${Math.abs(yagisFarki).toLocaleString('en-US', { maximumFractionDigits: 1 })}% ${yagisFarki >= 0 ? 'higher' : 'lower'} than the pilot average (${formatSayi(yagisOrtalamasi)} mm/year).</p>
              <div class="charts">
                <div class="chart-card"><h3>Field scores across pilot regions</h3>${puanGrafikSatirlari}</div>
                <div class="chart-card"><h3>Annual precipitation across pilot regions</h3>${yagisGrafikSatirlari}</div>
              </div>
            </section>
            <section class="section recommendations">
              <div class="insight">
                <h2>Regional assessment</h2>
                <strong>${escapeHtml(bolge.baslik.replace(/<[^>]*>/g, ''))}</strong>
                <p>${escapeHtml(gecmisDegerlendirme)}</p>
              </div>
              <div class="insight risk">
                <h2>Selected scenario: ${escapeHtml(seciliSenaryo)}</h2>
                <p>${escapeHtml(riskMetni)}</p>
                <p><strong>Recommended follow-up:</strong> ${escapeHtml(senaryoOnerileri[senaryoSecici.value])}</p>
              </div>
            </section>
            <section class="section recommendations">
              <div class="recommendation-card">
                <h3>Additional field recommendations</h3>
                <ul>${oneriler}</ul>
              </div>
              <div class="recommendation-card">
                <h3>Crop rotation notes</h3>
                <p>${escapeHtml(rotasyonMetni)}</p>
                <p><strong>Slope indicator:</strong> ${formatSayi(bolge.egimPct)}% — ${escapeHtml(egimDurumu)} erosion sensitivity.</p>
              </div>
            </section>
            <footer class="footnote">
              Comparisons use only the four pilot regions configured in this application; they are not national averages.
              This report is generated from sample/static application indicators. Additional recommendations are general decision support and should be verified against field conditions and local expert advice.
            </footer>
          </main>
        </body>
      </html>`;
    const reportWindow = window.open('', '_blank');

    if (!reportWindow) {
      window.alert('The PDF report could not be opened. Allow pop-ups in your browser and try again.');
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(html);
    reportWindow.document.close();
    reportWindow.focus();
    window.setTimeout(() => reportWindow.print(), 500);
  });
}

