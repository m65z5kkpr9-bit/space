/* 1. DRON ALARMI (Sayfa açıldıktan 4 saniye sonra çıksın) */
setTimeout(function() {
  document.getElementById("dron-alarmi").classList.remove("gizli");
}, 4000);

document.getElementById("alarm-kapat").addEventListener("click", function() {
  document.getElementById("dron-alarmi").classList.add("gizli");
});


/* 2. ARAZİ SKORUNU GÜNCELLEME (Yalancı yükleme efekti) */
document.getElementById("guncelle-btn").addEventListener("click", function() {
  let skorMetni = document.getElementById("skor-metni");
  skorMetni.innerText = "Hesaplanıyor...";
  
  setTimeout(function() {
    skorMetni.innerText = "%85"; // Gerçekçi görünmesi için skoru hafifçe artırdık
  }, 1500);
});


/* 3. İKLİM VE RİSK SENARYOSU SEÇİCİ */
document.getElementById("senaryo-secici").addEventListener("change", function(e) {
  let secim = e.target.value;
  let uyariKutusu = document.getElementById("uyari-kutusu");

  if (secim === "normal") {
    uyariKutusu.className = "uyari-normal";
    uyariKutusu.innerHTML = "Şu anki toprak nemi ve sıcaklık ideal seviyede.";
  } 
  else if (secim === "yagis") {
    uyariKutusu.className = "uyari-tehlike";
    uyariKutusu.innerHTML = "⚠️ EROZYON RİSKİ: SMAP uydu verilerine göre aşırı yağış bekleniyor. Eğilimli bölgelerde örtü bitkisi (cover crop) kökleri tutabilir.";
  } 
  else if (secim === "don") {
    uyariKutusu.className = "uyari-dikkat";
    uyariKutusu.innerHTML = "❄️ DON TEHLİKESİ: Gece yüzey sıcaklığı sıfırın altına düşecek. Hassas mahsuller için sulama yapmayın.";
  }
});


/* 4. ROTASYON SEKMELERİNİ DEĞİŞTİRME */
function rotasyonGoster(senaryo) {
  let icerik = document.getElementById("rotasyon-icerik");
  
  if (senaryo === 'mevcut') {
    icerik.innerHTML = `
      <h4>🌾 Mevcut: Buğday Monokültürü</h4>
      <p><strong>Analiz:</strong> Yıllardır aynı ürün ekildiği için toprak yorgun. Su tüketimi orta seviyede.</p>
    `;
  } 
  else if (senaryo === 'kuraklik') {
    icerik.innerHTML = `
      <h4>🏜️ Kuraklık Dirençli: Nohut veya Mercimek</h4>
      <p><strong>Analiz:</strong> Yağışların azaldığı senaryoda su tasarrufu sağlar. Kök yapısı topraktaki mevcut nemi daha iyi kullanır.</p>
    `;
  } 
  else if (senaryo === 'azot') {
    icerik.innerHTML = `
      <h4>🌱 Toprak İyileştirici: Yonca (Alfalfa)</h4>
      <p><strong>Analiz:</strong> Havadan aldığı azotu toprağa bağlar. Bir sonraki sezon ekilecek ana ürünün verimini %20 artırır.</p>
    `;
  }
}

