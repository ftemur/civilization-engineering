import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useWaterFootprint } from "@/lib/water-footprint-context";
import { useEffect, useMemo } from "react";
import { AVERAGE_WATER_FOOTPRINT } from "@/lib/water-footprint-data";
import { useColors } from "@/hooks/use-colors";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { state, loadHistory } = useWaterFootprint();

  useEffect(() => {
    loadHistory();
  }, []);

  // Son hesaplama verisini al
  const latestCalculation = useMemo(() => {
    return state.history.length > 0 ? state.history[0] : null;
  }, [state.history]);

  // Önceki ay hesaplamasını al
  const previousMonthCalculation = useMemo(() => {
    if (state.history.length < 2) return null;
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    return state.history.find((calc) => {
      const calcDate = new Date(calc.date);
      return calcDate < oneMonthAgo;
    }) || null;
  }, [state.history]);

  // Yüzde değişimi hesapla
  const percentageChange = useMemo(() => {
    if (!latestCalculation || !previousMonthCalculation) return null;
    const diff = latestCalculation.result.total - previousMonthCalculation.result.total;
    const percentage = ((diff / previousMonthCalculation.result.total) * 100).toFixed(1);
    return {
      value: percentage,
      isIncrease: diff > 0,
    };
  }, [latestCalculation, previousMonthCalculation]);

  // Kategori yüzdeleri hesapla
  const categoryPercentages = useMemo(() => {
    if (!latestCalculation) return null;
    const total = latestCalculation.result.total;
    return {
      household: ((latestCalculation.result.household / total) * 100).toFixed(1),
      food: ((latestCalculation.result.food / total) * 100).toFixed(1),
      products: ((latestCalculation.result.products / total) * 100).toFixed(1),
      energy: ((latestCalculation.result.energy / total) * 100).toFixed(1),
    };
  }, [latestCalculation]);

  // Ortalamaya göre karşılaştırma
  const comparisonWithAverage = useMemo(() => {
    if (!latestCalculation) return null;
    const userDaily = latestCalculation.result.total;
    const avgDaily = AVERAGE_WATER_FOOTPRINT.DAILY_LITERS;
    const diff = userDaily - avgDaily;
    const percentage = ((diff / avgDaily) * 100).toFixed(1);
    return {
      value: percentage,
      isAboveAverage: diff > 0,
    };
  }, [latestCalculation]);

  const handleCalculate = () => {
    router.push("/(tabs)/calculator" as any);
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white mb-2">Su Ayak İzi</Text>
          <Text className="text-base text-white opacity-90">
            Günlük su tüketimini hesapla, su tasarrufu yap
          </Text>
        </View>

        <View className="flex-1 px-6 py-6 gap-6">
          {/* Ana Özet Kartı */}
          {latestCalculation ? (
            <View className="bg-surface rounded-2xl p-6 border border-border">
              <Text className="text-sm text-muted font-semibold mb-2">Günlük Su Ayak İzi</Text>
              <View className="flex-row items-baseline gap-2 mb-4">
                <Text className="text-4xl font-bold text-foreground">
                  {Math.round(latestCalculation.result.total).toLocaleString('tr-TR')}
                </Text>
                <Text className="text-base text-muted">litre/gün</Text>
              </View>

              {/* Karşılaştırma */}
              {percentageChange && (
                <View className="flex-row items-center gap-2 mb-4">
                  <Text className="text-sm text-muted">Geçen ay:</Text>
                  <Text
                    className={`text-sm font-semibold ${
                      percentageChange.isIncrease ? "text-error" : "text-success"
                    }`}
                  >
                    {percentageChange.isIncrease ? "↑" : "↓"} {Math.abs(parseFloat(percentageChange.value))}%
                  </Text>
                </View>
              )}

              {/* Ortalama ile karşılaştırma */}
              {comparisonWithAverage && (
                <View className="pt-4 border-t border-border">
                  <Text className="text-xs text-muted mb-2">Türkiye Ortalaması ile Karşılaştırma</Text>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm text-foreground">
                      {comparisonWithAverage.isAboveAverage ? "Ortalamanın" : "Ortalamanın"}
                    </Text>
                    <Text
                      className={`text-sm font-semibold ${
                        comparisonWithAverage.isAboveAverage ? "text-error" : "text-success"
                      }`}
                    >
                      {Math.abs(parseFloat(comparisonWithAverage.value))}% {comparisonWithAverage.isAboveAverage ? "üzerinde" : "altında"}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View className="bg-surface rounded-2xl p-6 border border-border items-center justify-center py-12">
              <Text className="text-base text-muted mb-4">Henüz hesaplama yapılmadı</Text>
              <Text className="text-sm text-muted text-center">
                Su ayak izinizi hesaplamak için aşağıdaki butona tıklayın
              </Text>
            </View>
          )}

          {/* Kategori Dağılımı */}
          {latestCalculation && categoryPercentages && (
            <View className="bg-surface rounded-2xl p-6 border border-border">
              <Text className="text-base font-semibold text-foreground mb-4">Kategori Dağılımı</Text>
              
              {/* Evsel */}
              <View className="mb-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-foreground">Evsel Kullanım</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {categoryPercentages.household}%
                  </Text>
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
                  <Text className="text-sm text-foreground">Gıda Tüketimi</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {categoryPercentages.food}%
                  </Text>
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
                  <Text className="text-sm text-foreground">Ürün Tüketimi</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {categoryPercentages.products}%
                  </Text>
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
                  <Text className="text-sm text-foreground">Enerji Tüketimi</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {categoryPercentages.energy}%
                  </Text>
                </View>
                <View className="h-2 bg-border rounded-full overflow-hidden">
                  <View
                    className="h-full bg-error rounded-full"
                    style={{ width: `${parseFloat(categoryPercentages.energy)}%` } as any}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Motivasyon Mesajı */}
          <View className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-primary/20">
            <Text className="text-sm font-semibold text-primary mb-2">💡 Günün İpucu</Text>
            <Text className="text-sm text-foreground leading-relaxed">
              Duş süresini 1 dakika kısaltmak, günde 9.5 litre su tasarrufu sağlar. Bu, yılda 3,468 litre demektir!
            </Text>
          </View>

          {/* Hesapla Butonu */}
          <TouchableOpacity
            onPress={handleCalculate}
            className="bg-primary rounded-xl py-4 px-6 items-center justify-center active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">
              {latestCalculation ? "Tekrar Hesapla" : "Şimdi Hesapla"}
            </Text>
          </TouchableOpacity>

          {/* Boşluk */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
