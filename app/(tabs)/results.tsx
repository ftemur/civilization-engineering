import { ScrollView, Text, View, TouchableOpacity, Share } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useWaterFootprint } from "@/lib/water-footprint-context";
import { useColors } from "@/hooks/use-colors";
import { AVERAGE_WATER_FOOTPRINT } from "@/lib/water-footprint-data";

export default function ResultsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { state, saveCalculation, clearCurrent } = useWaterFootprint();

  const result = state.currentCalculation.result;

  if (!result) {
    return (
      <ScreenContainer className="p-6">
        <Text className="text-center text-foreground">Hesaplama verisi bulunamadı</Text>
      </ScreenContainer>
    );
  }

  // Kategori yüzdeleri
  const categoryPercentages = {
    household: ((result.household / result.total) * 100).toFixed(1),
    food: ((result.food / result.total) * 100).toFixed(1),
    products: ((result.products / result.total) * 100).toFixed(1),
    energy: ((result.energy / result.total) * 100).toFixed(1),
  };

  // Ortalama ile karşılaştırma
  const comparisonWithAverage = {
    value: (((result.total - AVERAGE_WATER_FOOTPRINT.DAILY_LITERS) / AVERAGE_WATER_FOOTPRINT.DAILY_LITERS) * 100).toFixed(1),
    isAboveAverage: result.total > AVERAGE_WATER_FOOTPRINT.DAILY_LITERS,
  };

  // Aylık ve yıllık hesaplamalar
  const monthlyTotal = result.total * 30;
  const yearlyTotal = result.total * 365;

  const handleSave = async () => {
    await saveCalculation();
    clearCurrent();
    router.push("/(tabs)" as any);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Su Ayak İzim: ${Math.round(result.total).toLocaleString('tr-TR')} litre/gün\n\nEvsel: ${Math.round(result.household).toLocaleString('tr-TR')} L\nGıda: ${Math.round(result.food).toLocaleString('tr-TR')} L\nÜrünler: ${Math.round(result.products).toLocaleString('tr-TR')} L\nEnerji: ${Math.round(result.energy).toLocaleString('tr-TR')} L\n\n#SuAyakİzi #SuTasarrufu`,
        title: "Su Ayak İzim",
      });
    } catch (error) {
      console.error("Paylaşım hatası:", error);
    }
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white mb-2">Sonuçlarınız</Text>
          <Text className="text-base text-white opacity-90">
            Su ayak iziniz hesaplandı
          </Text>
        </View>

        <View className="flex-1 px-6 py-6 gap-6">
          {/* Ana Sonuç Kartı */}
          <View className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
            <Text className="text-sm text-muted font-semibold mb-2">Günlük Su Ayak İzi</Text>
            <View className="flex-row items-baseline gap-2 mb-6">
              <Text className="text-5xl font-bold text-primary">
                {Math.round(result.total).toLocaleString('tr-TR')}
              </Text>
              <Text className="text-lg text-muted">litre/gün</Text>
            </View>

            {/* Aylık ve Yıllık */}
            <View className="flex-row gap-4">
              <View className="flex-1 bg-white dark:bg-surface rounded-lg p-3 border border-border">
                <Text className="text-xs text-muted mb-1">Aylık</Text>
                <Text className="text-lg font-semibold text-foreground">
                  {Math.round(monthlyTotal).toLocaleString('tr-TR')}
                </Text>
                <Text className="text-xs text-muted">litre</Text>
              </View>
              <View className="flex-1 bg-white dark:bg-surface rounded-lg p-3 border border-border">
                <Text className="text-xs text-muted mb-1">Yıllık</Text>
                <Text className="text-lg font-semibold text-foreground">
                  {Math.round(yearlyTotal).toLocaleString('tr-TR')}
                </Text>
                <Text className="text-xs text-muted">litre</Text>
              </View>
            </View>
          </View>

          {/* Ortalama ile Karşılaştırma */}
          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-base font-semibold text-foreground mb-4">Türkiye Ortalaması ile Karşılaştırma</Text>
            
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm text-foreground">Sizin Su Ayak İziniz</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {Math.round(result.total).toLocaleString('tr-TR')} L
                </Text>
              </View>
              <View className="h-3 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: "100%" } as any}
                />
              </View>
            </View>

            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm text-muted">Türkiye Ortalaması</Text>
                <Text className="text-sm font-semibold text-muted">
                  {AVERAGE_WATER_FOOTPRINT.DAILY_LITERS.toLocaleString('tr-TR')} L
                </Text>
              </View>
              <View className="h-3 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-muted rounded-full"
                  style={{ width: "100%" } as any}
                />
              </View>
            </View>

            <View className={`p-3 rounded-lg ${comparisonWithAverage.isAboveAverage ? 'bg-error/10' : 'bg-success/10'}`}>
              <Text className={`text-sm font-semibold ${comparisonWithAverage.isAboveAverage ? 'text-error' : 'text-success'}`}>
                {comparisonWithAverage.isAboveAverage ? '↑' : '↓'} Ortalamanın {Math.abs(parseFloat(comparisonWithAverage.value))}% {comparisonWithAverage.isAboveAverage ? 'üzerinde' : 'altında'}
              </Text>
            </View>
          </View>

          {/* Kategori Dağılımı */}
          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-base font-semibold text-foreground mb-4">Kategori Dağılımı</Text>

            {/* Evsel */}
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-sm font-semibold text-foreground">Evsel Kullanım</Text>
                  <Text className="text-xs text-muted">
                    {Math.round(result.household).toLocaleString('tr-TR')} L
                  </Text>
                </View>
                <Text className="text-sm font-semibold text-primary">{categoryPercentages.household}%</Text>
              </View>
              <View className="h-2 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${parseFloat(categoryPercentages.household)}%` } as any}
                />
              </View>
            </View>

            {/* Gıda */}
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-sm font-semibold text-foreground">Gıda Tüketimi</Text>
                  <Text className="text-xs text-muted">
                    {Math.round(result.food).toLocaleString('tr-TR')} L
                  </Text>
                </View>
                <Text className="text-sm font-semibold text-warning">{categoryPercentages.food}%</Text>
              </View>
              <View className="h-2 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-warning rounded-full"
                  style={{ width: `${parseFloat(categoryPercentages.food)}%` } as any}
                />
              </View>
            </View>

            {/* Ürünler */}
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-sm font-semibold text-foreground">Ürün Tüketimi</Text>
                  <Text className="text-xs text-muted">
                    {Math.round(result.products).toLocaleString('tr-TR')} L
                  </Text>
                </View>
                <Text className="text-sm font-semibold text-success">{categoryPercentages.products}%</Text>
              </View>
              <View className="h-2 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-success rounded-full"
                  style={{ width: `${parseFloat(categoryPercentages.products)}%` } as any}
                />
              </View>
            </View>

            {/* Enerji */}
            <View>
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-sm font-semibold text-foreground">Enerji Tüketimi</Text>
                  <Text className="text-xs text-muted">
                    {Math.round(result.energy).toLocaleString('tr-TR')} L
                  </Text>
                </View>
                <Text className="text-sm font-semibold text-error">{categoryPercentages.energy}%</Text>
              </View>
              <View className="h-2 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-error rounded-full"
                  style={{ width: `${parseFloat(categoryPercentages.energy)}%` } as any}
                />
              </View>
            </View>
          </View>

          {/* Tasarrufu Önerileri */}
          <View className="bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-base font-semibold text-foreground mb-4">💡 Su Tasarrufu Önerileri</Text>
            
            <View className="gap-3">
              <View className="flex-row gap-3">
                <Text className="text-primary font-bold">1.</Text>
                <Text className="flex-1 text-sm text-foreground">
                  Duş süresini 1 dakika kısaltmak, günde 9.5 litre tasarrufu sağlar.
                </Text>
              </View>
              <View className="flex-row gap-3">
                <Text className="text-primary font-bold">2.</Text>
                <Text className="flex-1 text-sm text-foreground">
                  Kırmızı et tüketimini azaltmak, en büyük su tasarrufu fırsatıdır.
                </Text>
              </View>
              <View className="flex-row gap-3">
                <Text className="text-primary font-bold">3.</Text>
                <Text className="flex-1 text-sm text-foreground">
                  Çamaşır makinesini tam dolu çalıştırmak, çalışma başına 20 litre tasarrufu sağlar.
                </Text>
              </View>
            </View>
          </View>

          {/* Butonlar */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleShare}
              className="flex-1 border border-primary rounded-lg py-3 px-4 items-center justify-center active:opacity-70"
            >
              <Text className="text-primary font-semibold">Paylaş</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-primary rounded-lg py-3 px-4 items-center justify-center active:opacity-80"
            >
              <Text className="text-white font-semibold">Kaydet ve Devam Et</Text>
            </TouchableOpacity>
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
