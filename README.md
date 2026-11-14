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


