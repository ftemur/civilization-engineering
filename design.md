# Su Ayak İzi Hesaplayıcı - Mobil Uygulama Tasarım Planı

## Tasarım Felsefesi

Bu uygulama, kullanıcıların günlük yaşantılarında su tüketimlerini farkında olmadan hesaplamalarını sağlayan, eğitici ve motive edici bir deneyim sunmalıdır. Tasarım, **iOS HIG (Human Interface Guidelines)** standartlarına uygun olarak, sade, temiz ve kullanıcı dostu bir arayüz hedeflemektedir. Uygulama, **portrait (9:16)** yönelimde ve **tek el kullanımı** için optimize edilmiştir.

## Renk Paleti

Su ayak izi temasına uygun, doğa ve su ile ilişkili renkler seçilmiştir:

| Renk Adı | Açık Mod | Koyu Mod | Kullanım Alanı |
|----------|----------|----------|----------------|
| **Primary (Mavi)** | #0A7EA4 | #0A7EA4 | Başlıklar, vurgular, CTA butonları |
| **Background** | #FFFFFF | #151718 | Ekran arka planı |
| **Surface** | #F5F5F5 | #1E2022 | Kartlar, paneller |
| **Foreground** | #11181C | #ECEDEE | Birincil metin |
| **Muted** | #687076 | #9BA1A6 | İkincil metin, açıklamalar |
| **Border** | #E5E7EB | #334155 | Bölücüler, sınırlar |
| **Success** | #22C55E | #4ADE80 | Başarı mesajları, pozitif geri bildirim |
| **Warning** | #F59E0B | #FBBF24 | Uyarılar, yüksek su tüketimi |
| **Error** | #EF4444 | #F87171 | Hatalar, kritik uyarılar |

## Ekran Listesi

Uygulama aşağıdaki ana ekranlardan oluşmaktadır:

### 1. **Giriş Ekranı (Splash/Onboarding)**
- Uygulama logosu ve adı
- Kısa açıklama: "Günlük su tüketimini hesapla, su tasarrufu yap"
- "Başla" butonu
- Hedef: Kullanıcıyı uygulamanın amacı hakkında bilgilendirmek

### 2. **Ana Sayfa (Home Screen)**
- Günlük su ayak izi özeti (litre cinsinden)
- Geçen ay ile karşılaştırma (artış/azalış yüzdesi)
- Kategori bazlı dağılım (Pasta grafik veya bar grafik)
- "Hesapla" butonu (hızlı erişim)
- "Geçmiş" ve "İpuçları" sekmelerine erişim
- Motivasyon mesajı veya günün su tasarrufu ipucu

### 3. **Hesaplama Ekranı (Calculator Screen)**
Kullanıcıdan adım adım bilgi toplayan çok adımlı form:

#### Adım 1: Evsel Su Tüketimi
- Duş süresi (dakika)
- Tuvalet kullanımı (günde kaç kez)
- Çamaşır yıkama (haftada kaç kez)
- Bulaşık yıkama (manuel/makine)
- Bahçe sulama (var/yok, sıklık)

#### Adım 2: Gıda Tüketimi
- Kırmızı et tüketimi (haftada kaç gün)
- Tavuk/Balık tüketimi (haftada kaç gün)
- Süt ürünleri tüketimi (günde kaç bardak)
- Kahve/Çay tüketimi (günde kaç fincan)
- Sebze/Meyve tüketimi (günde kaç porsiyon)
- Fındık/Badem gibi kuruyemişler (tüketim sıklığı)

#### Adım 3: Ürün Tüketimi
- Aylık giyim alışverişi (liralık bütçe)
- Elektronik cihaz satın alma (yıllık)
- Araba yıkama (ayda kaç kez)
- Benzin/Dizel tüketimi (aylık litre)

#### Adım 4: Özet ve Sonuç
- Hesaplanan toplam su ayak izi
- Kategori bazlı dağılım
- Ortalama ile karşılaştırma
- Tasarrufu önerileri

### 4. **Sonuç Ekranı (Results Screen)**
- Toplam günlük/aylık/yıllık su ayak izi
- Kategori bazlı detaylı dağılım (Pasta grafik)
- Her kategori için açıklama ve tasarrufu ipuçları
- "Kaydet" butonu (geçmişe ekle)
- "Paylaş" butonu (sosyal medya)
- "Tekrar Hesapla" butonu

### 5. **Geçmiş Ekranı (History Screen)**
- Önceki hesaplamaların listesi (tarih, toplam su ayak izi)
- Trend grafik (son 30 günün ortalaması)
- Ay bazlı karşılaştırma
- Hesaplama detaylarını görüntüleme
- Hesaplamayı silme seçeneği

### 6. **İpuçları ve Tavsiyeleri Ekranı (Tips Screen)**
- Su tasarrufu ipuçları (kategorilere göre)
- Evsel tasarruf önerileri
- Gıda seçiminde tasarruf
- Ürün tüketiminde bilinçli seçim
- Başarı hikayeleri (örnek tasarruflar)

### 7. **Ayarlar Ekranı (Settings Screen)**
- Tema seçimi (Açık/Koyu/Sistem)
- Bildirim ayarları
- Veri silme seçeneği
- Hakkında bilgisi
- Geri bildirim gönderme

## Kullanıcı Akışları

### Akış 1: Yeni Kullanıcı Deneyimi
```
Giriş Ekranı → Onboarding Mesajı → Hesaplama Ekranı (Adım 1) → 
Adım 2 → Adım 3 → Adım 4 (Özet) → Sonuç Ekranı → Ana Sayfa
```

### Akış 2: Hesaplama Yapma
```
Ana Sayfa → "Hesapla" Butonu → Hesaplama Ekranı (Adım 1) → 
Adım 2 → Adım 3 → Adım 4 → Sonuç Ekranı → "Kaydet" → Ana Sayfa
```

### Akış 3: Geçmiş İnceleme
```
Ana Sayfa → Geçmiş Sekmesi → Hesaplama Seçimi → Detay Görüntüleme → 
Tasarrufu İpuçları → Geri Dön
```

### Akış 4: İpuçları Okuma
```
Ana Sayfa → İpuçları Sekmesi → Kategori Seçimi → İpuçları Oku → 
Uygula Butonu → Ana Sayfa
```

## Arayüz Bileşenleri

### Başlık (Header)
- Başlık metni (merkez hizalı)
- Geri butonu (sol taraf, varsa)
- Ayarlar/Menü ikonu (sağ taraf, varsa)
- Yükseklik: 56px (iOS standartı)

### Kart Bileşeni (Card)
- Köşe yarıçapı: 12px
- Padding: 16px
- Gölge: Hafif (iOS stil)
- Arka plan: Surface rengi
- Sınır: Border rengi (1px)

### Buton Bileşenleri

#### Birincil Buton (Primary Button)
- Arka plan: Primary rengi (#0A7EA4)
- Metin rengi: Beyaz
- Yükseklik: 48px
- Köşe yarıçapı: 12px
- Padding: 16px
- Basılı durumda: Ölçek 0.97 + hafif haptic feedback

#### İkincil Buton (Secondary Button)
- Arka plan: Surface rengi
- Metin rengi: Primary rengi
- Sınır: 1px Primary rengi
- Yükseklik: 48px
- Köşe yarıçapı: 12px

#### Metin Butonu (Text Button)
- Arka plan: Şeffaf
- Metin rengi: Primary rengi
- Basılı durumda: Arka plan hafif gri

### Form Elemanları

#### Metin Girdisi (Text Input)
- Yükseklik: 44px
- Padding: 12px 16px
- Sınır: 1px Border rengi
- Köşe yarıçapı: 8px
- Yer tutucu metni: Muted rengi

#### Seçim Kutusu (Picker/Dropdown)
- Yükseklik: 44px
- Padding: 12px 16px
- Sınır: 1px Border rengi
- Köşe yarıçapı: 8px

#### Kaydırıcı (Slider)
- Yükseklik: 44px
- Renk: Primary
- Başparmak boyutu: 28px

### Grafik Bileşenleri

#### Pasta Grafik (Pie Chart)
- Çap: Ekran genişliğinin %80'i
- Renkler: Kategori başına farklı renk
- Etiketler: Yüzde ve kategori adı
- Açıklama: Grafik altında

#### Bar Grafik (Bar Chart)
- Yükseklik: 200px
- Genişlik: Ekran genişliğinin %90'ı
- Renkler: Kategori başına farklı renk
- Y ekseni: Su miktarı (litre)
- X ekseni: Zaman (gün/hafta/ay)

#### Trend Grafik (Trend Line Chart)
- Yükseklik: 200px
- Genişlik: Ekran genişliğinin %90'ı
- Renk: Primary
- Noktalar: Veri noktaları
- Çizgi: Trend gösterimi

## Tipografi

| Eleman | Font Boyutu | Font Ağırlığı | Satır Yüksekliği |
|--------|-------------|---------------|-----------------|
| Başlık 1 | 32px | Bold (700) | 40px |
| Başlık 2 | 24px | Bold (700) | 32px |
| Başlık 3 | 20px | Semibold (600) | 28px |
| Gövde Metni | 16px | Regular (400) | 24px |
| Açıklama | 14px | Regular (400) | 20px |
| Küçük Metin | 12px | Regular (400) | 16px |
| Buton Metni | 16px | Semibold (600) | 20px |

## Boşluk (Spacing)

Uygulama, 4px'lik bir ızgara sistemi kullanmaktadır:

| Amaç | Değer | Kullanım |
|------|-------|---------|
| Çok Küçük | 4px | İkon ile metin arası |
| Küçük | 8px | Form elemanları arası |
| Orta | 16px | Kart padding, bölüm arası |
| Büyük | 24px | Ekran padding, ana bölümler |
| Çok Büyük | 32px | Ekran başı/sonu |

## İnteraksiyon Tasarımı

### Buton Geri Bildirimi
- Basılı durumda: Ölçek 0.97 + hafif haptic feedback
- Sürükleme: Opacity 0.7
- Devre dışı: Opacity 0.5

### Geçişler
- Ekran geçişi: 300ms (slide from right)
- Modal açılış: 250ms (fade in)
- Buton animasyonu: 80ms (scale)

### Haptic Feedback
- Buton basma: Light impact
- Başarı: Success notification
- Hata: Error notification

## Erişilebilirlik

- Minimum dokunma hedefi: 44x44px
- Renk kontrastı: WCAG AA standartı (4.5:1)
- Yazı boyutu: Minimum 14px
- VoiceOver desteği: Tüm etkileşimli elemanlar
- Dinamik Yazı boyutu desteği: iOS ayarlarına uyum

## Mobil Optimizasyonlar

### iPhone Notch/Safe Area Yönetimi
- Üst padding: Safe area + 8px
- Alt padding: Tab bar + safe area
- Yan padding: Safe area + 16px

### Tek El Kullanımı
- Kritik butonlar: Ekranın alt %40'ında
- Başlıklar: Ekranın üst %20'sinde
- Kaydırma: Dikey (vertical scroll)

### Performans
- Grafikleri lazy load
- Liste virtualizasyonu (FlatList)
- Görüntü optimizasyonu
- Veri önbelleği (AsyncStorage)

## Durum Göstergeleri

### Yükleme Durumu
- Spinner animasyonu (Primary rengi)
- "Hesaplanıyor..." metni

### Boş Durum
- İkon gösterimi
- "Henüz hesaplama yapılmadı" mesajı
- "Başla" butonu

### Hata Durumu
- Error rengi ile ikon
- Hata mesajı
- "Tekrar Dene" butonu

## Bildirim Tasarımı

### Başarı Bildirimi
- Arka plan: Success rengi
- İkon: Checkmark
- Mesaj: "Hesaplama kaydedildi"
- Süre: 3 saniye

### Uyarı Bildirimi
- Arka plan: Warning rengi
- İkon: Uyarı işareti
- Mesaj: Uyarı içeriği
- Süre: 5 saniye

### Hata Bildirimi
- Arka plan: Error rengi
- İkon: Hata işareti
- Mesaj: Hata açıklaması
- Süre: 5 saniye

## Ekran Yönelimleri

Uygulama yalnızca **portrait (dikey)** yönelimde çalışmaktadır. Landscape (yatay) yönelim desteklenmemektedir.

## Ek Notlar

- Uygulama, iOS HIG standartlarına uygun olarak tasarlanmıştır
- Tüm etkileşimler, tek el kullanımı için optimize edilmiştir
- Karanlık mod desteği tam olarak uygulanmıştır
- Erişilebilirlik, tasarımın temel bir parçasıdır
- Animasyonlar, performansı etkilemeyecek şekilde kullanılmıştır
