# Dijital Değerler Rotası 🎯

Değer odaklı interaktif oryantiring deneyimi. Öğrencilerin okul bahçesinde QR kodları okutarak değer görevlerini tamamladığı, rozet kazandığı bir web uygulaması.

## 🎯 Özellikler

### 📱 QR Kod Sistemi
- Her kontrol noktası için benzersiz QR kod
- Manuel kod girişi desteği
- Demo modu (fuar sunumları için)
- QR kod yazdırma ve yönetim paneli

### 🎮 Oyunlaştırma
- Senaryo bazlı değer görevleri
- Puan sistemi (0-100)
- 7 farklı dijital rozet
- Kişisel değer profili analizi

### 💎 Değerler
1. **Dürüstlük** - Doğru olanı söylemek ve yapmak
2. **Empati** - Başkalarının duygularını anlamak
3. **İşbirliği** - Birlikte başarıyı yakalamak
4. **Sorumluluk** - Görevleri sahiplenmek
5. **Saygı** - Farklılıklara değer vermek

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
npm start
```

## 🛠️ Teknoloji Stack

- **Framework**: Next.js 14 (App Router)
- **QR Kod**: qrcode.react
- **Stil**: Tailwind CSS
- **Animasyon**: Framer Motion
- **Grafikler**: Recharts
- **State**: Zustand (LocalStorage persist)
- **Deployment**: Vercel

## 📋 Kullanım Adımları

### Öğretmen/Organizatör İçin

1. **QR Kodları Hazırlayın**
   - `/admin` sayfasına gidin
   - Tüm QR kodları indirin veya yazdırın
   - Lamine edin (hava koşullarına dayanıklı)

2. **Kontrol Noktalarını Yerleştirin**
   - Her QR kodu okul bahçesinde uygun bir yere asın
   - Öğrencilerin kolayca bulabileceği yerler seçin

3. **Demo Modunu Ayarlayın**
   - Fuar/sunum için: Demo modu AÇIK
   - Gerçek kullanım için: Demo modu KAPALI

### Öğrenci İçin

1. **Uygulamayı Açın**
   - Tarayıcıdan siteye girin
   - Ana sayfadan "Yolculuğa Başla" butonuna tıklayın

2. **Kontrol Noktasına Gidin**
   - Okul bahçesinde kontrol noktalarını bulun
   - QR kodu okutun veya kodu manuel girin

3. **Görevi Tamamlayın**
   - Senaryo sorusunu okuyun
   - En uygun cevabı seçin
   - Puanınızı ve geri bildiriminizi görün

4. **Rozetleri Kazanın**
   - Görevleri tamamlayarak rozet kazanın
   - Rozetler sayfasından ilerlemenizi takip edin

## 🎨 Özelleştirme

### Yeni Kontrol Noktası Ekleme

`/public/models/checkpoints.json` dosyasını düzenleyin:

```json
{
  "id": 6,
  "name": "Yeni Değer Noktası",
  "value": "yeni_deger",
  "qrCode": "CHECKPOINT_6_NEWVALUE",
  "description": "Açıklama",
  "icon": "🎯",
  "color": "#6366f1",
  "scenario": {
    "title": "Senaryo Başlığı",
    "question": "Soru metni",
    "options": [
      { "text": "Seçenek 1", "points": 100, "feedback": "Geri bildirim" }
    ]
  }
}
```

### Yeni Rozet Ekleme

1. `/public/models/badges.json` dosyasını düzenleyin
2. `/src/utils/badgeChecker.ts` içinde kazanma koşulunu tanımlayın

## 📊 QR Kod Formatı

Her kontrol noktası için QR kod formatı:
```
CHECKPOINT_[ID]_[VALUE]
```

Örnekler:
- `CHECKPOINT_1_HONESTY`
- `CHECKPOINT_2_EMPATHY`
- `CHECKPOINT_3_TEAMWORK`

## 🎯 Demo Modu

Demo modu aktifken:
- Tüm kontrol noktaları otomatik açılır
- QR kod okutmaya gerek yoktur
- Fuar sunumları için idealdir

Demo modunu açmak için:
- Kontrol Noktaları sayfasında "Demo Modu" butonuna tıklayın

## 📱 PWA Desteği

Uygulama Progressive Web App olarak çalışır:
- Çevrimdışı erişim
- Ana ekrana eklenebilir
- Mobil uygulama deneyimi

## 🔒 Veri Güvenliği

- Tüm veriler LocalStorage'da saklanır
- Backend gerektirmez
- Kişisel veri toplanmaz
- HTTPS üzerinden çalışır (Vercel otomatik)

## 📈 Analitik

Kullanıcı profili şunları içerir:
- Toplam puan
- Tamamlanan görev sayısı
- Değer bazlı puan dağılımı
- En güçlü değer
- Kazanılan rozetler

## 🎓 Eğitim Amaçlı Kullanım

Bu uygulama şunlar için uygundur:
- İlkokul ve ortaokul öğrencileri
- Değer eğitimi programları
- Okul etkinlikleri ve fuarlar
- Rehberlik servisleri
- Oryantiring yarışmaları

## 🤝 Katkıda Bulunma

Bu proje eğitim amaçlıdır. Önerilerinizi issue olarak paylaşabilirsiniz.

## 📄 Lisans

MIT License - Eğitim amaçlı kullanım için serbesttir.

## 📞 Destek

Sorularınız için GitHub Issues kullanabilirsiniz.

---

**Önemli**: QR kodları yazdırdıktan sonra lamine etmeyi unutmayın!
