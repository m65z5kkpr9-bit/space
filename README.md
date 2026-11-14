#  MECMua Agricultural Management System
**Satellite-Driven Crop Rotation & Agricultural Decision Support System**

🔗 **Live Prototype:** [MECMua Web App on Vercel](https://your-project-link.vercel.app)  
🏆 **Event:** NASA International Space Apps Challenge

---

## 📖 Overview
**MECMua** is a lightweight, farmer-friendly web-based Decision Support System designed to translate complex NASA Earth observation datasets into actionable crop rotation and field management strategies. While satellites provide critical insights into soil moisture, precipitation, and vegetation health, raw scientific data remains inaccessible to everyday farmers facing climate volatility.

MECMua bridges this gap by transforming multi-satellite indicators into an intuitive dashboard with dynamic land efficiency scoring, climate risk simulations, tailored crop rotation recommendations, and automated drone spraying alerts.

---

## 🛰️ NASA & Space Agency Datasets Used
* **NASA POWER:** Regional temperature (`T2M`), precipitation (`PRECTOTCORR`), and relative humidity (`RH2M`) metrics for growing season and frost risk analysis.
* **SMAP (Soil Moisture Active Passive):** Surface soil moisture data for early drought stress detection and water-efficient crop selection.
* **GPM / IMERG:** Global precipitation and extreme rainfall accumulation data to assess surface runoff and flood risks.
* **SRTM (Shuttle Radar Topography Mission):** Elevation and slope modeling to identify terrain-induced erosion risks.
* **Copernicus Sentinel-2 & ECOSTRESS:** Vegetation vitality (`NDVI`) and Land Surface Temperature (`LST`) indicators for field health scoring.

---

## 🌍 Simulated Ecosystems & Vegetation Zones
To demonstrate adaptability across contrasting climates and topographies, MECMua simulates four distinct agricultural zones in Türkiye:
1. **Laçin, Eskişehir (Valley Microclimate):** Olive and vegetable farming; frost protection and cover crop recommendations against `14%` valley slope erosion.
2. **Çumra, Konya Plain (Arid Steppe):** Transitioning from water-intensive crops to drought-resistant, nitrogen-fixing chickpea/lentil rotation under `16%` critical soil moisture.
3. **Çukurova, Adana (Alluvial Plain):** Cotton and second-crop maize management; night-time drip irrigation scheduling to prevent high `LST` evaporation loss.
4. **Ardeşen, Rize (Humid Steep Forest Slope):** Tea and hazelnut terraces; deep-rooted cover crops to prevent soil erosion and mineral leaching under `2250 mm/year` rainfall and `32%` slope.

---

## ✨ Key Features
* **Field Efficiency Score:** Real-time agricultural health percentage derived from satellite and soil parameters.
* **Climate & Risk Scenario Simulator:** Dynamic protection alerts for drought, sudden frost, or heavy rainfall.
* **Smart Crop Rotation Tabs:** Alternative crop comparisons designed to prevent soil fatigue and optimize water efficiency.
* **Autonomous Drone Spraying Alert:** Smart weather-window notification system providing optimal wind and humidity routing for drone operations.

---

## 👥 Team MECMua
* **Muhammed Emrecan Öztürk** – Team Lead & Project Architecture
* **Can Kumandaş** – Frontend Development & Deployment
* **Muhammed Ali Özdemir** – UI/UX Design & Presentation
* **Salih Türker** – NASA Data Extraction & Calibration
* **Mert Kumandaş** – Technical Documentation & Content
**TÜRKÇE**
# 🌱 MECMua Tarım Yönetim Sistemi
**Uydu Destekli Tarımsal Rotasyon ve Karar Destek Sistemi**

🔗 **Canlı Prototip:** [MECMua Web Uygulaması (Vercel)](https://proje-linkiniz.vercel.app)  
🏆 **Etkinlik:** NASA International Space Apps Challenge

---

## 📖 Genel Bakış
**MECMua**, karmaşık NASA Dünya gözlem verilerini çiftçilerin günlük sahada uygulayabileceği anlaşılır ekim rotasyonu ve tarla yönetimi kararlarına dönüştüren, hafif ve mobil uyumlu bir web tabanlı Karar Destek Sistemidir. Uydular toprak nemi, yağış ve bitki sağlığı hakkında kritik veriler sunsa da ham bilimsel verilerin karmaşıklığı, iklim değişkenliğiyle mücadele eden çiftçilerin bu bilgilere doğrudan erişmesini zorlaştırmaktadır.

MECMua; çoklu uydu göstergelerini dinamik arazi verimlilik skoru, iklim riski simülasyonları, bölgeye özel ekim rotasyonu önerileri ve otonom dron ilaçlama uyarıları sunan sade bir kontrol panelinde birleştirerek bu boşluğu kapatır.

---

## 🛰️ Kullanılan NASA ve Uzay Ajansı Veri Setleri
* **NASA POWER:** Büyüme mevsimi ve don riski analizi için bölgesel sıcaklık (`T2M`), yağış miktarı (`PRECTOTCORR`) ve bağıl nem (`RH2M`) ölçümleri.
* **SMAP (Toprak Nemi Aktif Pasif):** Erken kuraklık stresi tespiti ve suya dayanıklı ürün seçimi için yüzey toprak nemi verileri.
* **GPM / IMERG:** Yüzey akışı ve sel/erozyon risklerini değerlendirmek için küresel yağış ve aşırı yağış birikim verileri.
* **SRTM (Mekik Radarı Topografya Görevi):** Arazi kaynaklı erozyon risklerini belirlemek için yükseklik ve eğim modellemesi.
* **Copernicus Sentinel-2 & ECOSTRESS:** Tarla sağlığı skorlaması için bitki örtüsü canlılığı (`NDVI`) ve Kara Yüzey Sıcaklığı (`LST`) göstergeleri.

---

## 🌍 Simüle Edilen Ekosistemler ve Bitki Örtüsü Bölgeleri
Farklı iklim ve topografya koşullarına uyum yeteneğini göstermek amacıyla MECMua, Türkiye'nin birbirine zıt dört tarım havzasını simüle eder:
1. **Laçin, Eskişehir (Vadi Mikrokliması):** Zeytin ve sebze tarımı; `%14` vadi eğimi erozyonuna karşı don koruması ve sıra arası örtü bitkisi önerileri.
2. **Çumra, Konya Ovası (Kurak Step):** `%16` kritik toprak nemi altında yoğun su tüketen ürünler yerine kuraklığa dirençli, toprağa azot bağlayan nohut/mercimek rotasyonu.
3. **Çukurova, Adana (Alüvyon Ovası):** Pamuk ve ikinci ürün mısır yönetimi; yüksek `LST` (yüzey sıcaklığı) kaynaklı buharlaşma kaybını önlemek için gece damla sulama takvimi.
4. **Ardeşen, Rize (Nemli Dik Orman Yamacı):** Çay ve fındık terasları; yıllık `2250 mm` yağış ve `%32` dik eğim altında toprak kaymasını ve mineral yıkanmasını önleyen derin köklü ara bitkiler.

---

## ✨ Temel Özellikler
* **Arazi Verimlilik Skoru:** Uydu ve toprak parametrelerinden hesaplanan anlık tarımsal sağlık yüzdesi.
* **İklim ve Risk Senaryosu Simülatörü:** Kuraklık, ani don veya aşırı yağış durumları için dinamik koruma uyarıları.
* **Akıllı Ekim Rotasyonu Sekmeleri:** Toprak yorgunluğunu önleyen ve su verimliliğini artıran alternatif ürün karşılaştırmaları.
* **Otonom Dron İlaçlama Uyarısı:** Dron operasyonları için en uygun rüzgar ve nem penceresini bildiren akıllı rota uyarı sistemi.

---

## 👥 MECMua Ekibi
* **Muhammed Emrecan Öztürk** – Takım Lideri & Proje Mimarisi
* **Can Kumandaş** – Ön Yüz (Frontend) Geliştirme & Yayına Alma
* **Muhammed Ali Özdemir** – Arayüz (UI/UX) Tasarımı & Sunum
* **Salih Türker** – NASA Veri Çekimi & Kalibrasyon
* **Mert Kumandaş** – Teknik Dokümantasyon & İçerik



