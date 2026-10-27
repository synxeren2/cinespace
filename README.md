# CINESPACE — Film keşif tuvali

HTML, CSS ve sade JavaScript ile 100 filmlik, tekrar eden sonsuz keşif tuvali.

## Çalıştırma

Klasörü çıkartıp index.html dosyasını açın. Önerilen kullanım:

    python -m http.server 8000

Ardından http://localhost:8000 adresini açın.

## Kullanım

- Fareyle sürükleyerek keşfedin; tekerlek veya +/− ile yakınlaştırın.
- ⤢ tüm sonuçları ekrana sığdırır; mini harita belirli bir bölgeye götürür.
- Film kartına tıklayarak detayları açın. Esc bir önceki ekrana döner.
- Arama film adına, üst düğmeler türe göre çalışır. Arama ilk 20 sonucu gösterir; popüler ve tür katalogları en fazla 100 film içerir.
- Listem, farklı aramalarda eklenen tüm filmleri tarayıcının yerel deposunda saklar. Aynı adres ve tarayıcıda korunur; tarayıcı verilerini silmek listeyi de siler.
- Bağlantı kurulamazsa 100 yerel örnek film açılır; “Yeniden dene” ile bağlantı tekrar denenebilir. Yerel filmler kurmaca örneklerdir.

## Bu sürümde

- Daha büyük, eşit aralıklı afişler ve sürekli görünen film başlıkları.
- Görünür bölgeye göre kart oluşturma; sabit 900 kart kaldırıldı.
- 100 yerel film için afiş ve arka plan dosyaları tamamlandı.
- Sonuçsuz arama ile bağlantı hatası ayrıldı; eski istekler yeni aramayı ezemez.
- Kalıcı ve katalogdan bağımsız Listem; eşleşmeyen kartlar gizlenir.
- Yükleme yer tutucuları, bağlantı tekrar denemesi, detay hata metinleri.
- Çoklu dokunmadan sürüklemeye geçiş ve detay klavye odağı düzeltildi.

## Video kaynakları

Orijinal projedeki VidStuck, Atlantic, FMov, CineSrc ve Mapple kaynakları, adresleri, sıraları ve oynatıcı fonksiyonları değiştirilmedi. Yerel örnek filmlerin TMDB kimliği olmadığı için video kaynağı yoktur. Eski demo video ve görsel üretme aracı yayına yüklenmedi; video oynatıcı mevcut kullanımda bunları kullanmaz.

## Ayarlar

Güvenlik için GitHub ve Vercel sürümünde TMDB jetonu boştur. Site yerel 100 filmlik seçkiyle çalışır. TMDB bağlantısı istenirse geçerli jetonu sadece kendi yerel config.js dosyana ekle; bu dosyayı herkese açık depoya veya paylaşılabilir pakete koyma. Canlı sitede TMDB kullanmak için jetonu sunucu tarafında tutan bir proxy gerekir.

Film bilgileri TMDB'den gelir. Bu ürün TMDB API'sini kullanır; ancak TMDB tarafından onaylanmamıştır.


## Yeni keşif özellikleri

1. **Ne izlesem?** Aktif filtrelere uyan rastgele bir filmi vurgular. Tuvalde kamerayı afişe taşır, ızgarada afişe kaydırır.
2. **Gelişmiş filtreler:** Başlangıç/bitiş yılı, minimum puan, izlenenleri gizleme. Uygula ile etkinleşir. Arama sonuçlarında mevcut sonuçlara, katalogda TMDB sorgusuna da uygulanır.
3. **Hazır seçkiler:** Bilim kurgu gecesi, 90’lar sineması ve yüksek puanlılar.
4. **Benzer filmler:** Detay altında TMDB önerileri; bağlantı yoksa mevcut seçkiden aynı türde filmler.
5. **İzlendi:** Detaydan işaretlenir; afişlerde rozet görünür ve tarayıcıda saklanır.
6. **Tuval / Izgara:** Üst araç çubuğundan görünüm değiştirilir.
7. **Hızlı ekleme:** Afiş köşesindeki + düğmesi detay açmadan listeye ekler/çıkarır.
8. **Son bakılanlar:** Son 12 farklı film saklanır; panelden yeniden açılır veya geçmiş temizlenir.
9. **Görünümü hatırlama:** Tuval konumu, yakınlaştırma ve tuval/ızgara tercihi aynı tarayıcıda saklanır. Filtreler ve arama sayfa yenilenince sıfırlanır.
10. **İlk giriş ipuçları:** Kapatınca tekrar otomatik açılmaz; ? düğmesiyle geri çağrılır.

Kayıtlar cihaz/tarayıcı/site adresine özeldir, hesap senkronizasyonu değildir. API kaynaklı içerikler internet ve TMDB erişimi gerektirir. Video kaynakları ve oynatıcı fonksiyonları önceki sürümle birebir aynıdır.
