import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useWaterFootprint } from "@/lib/water-footprint-context";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

export default function HistoryScreen() {
  const colors = useColors();
  const { state, deleteCalculation } = useWaterFootprint();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteCalculation(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderHistoryItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => setSelectedId(selectedId === item.id ? null : item.id)}
      className="bg-surface rounded-lg p-4 mb-3 border border-border active:opacity-70"
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-sm text-muted mb-1">{formatDate(item.date)}</Text>
          <Text className="text-2xl font-bold text-foreground">
            {Math.round(item.result.total).toLocaleString('tr-TR')} L
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          className="p-2 active:opacity-70"
        >
          <Text className="text-error font-semibold">✕</Text>
        </TouchableOpacity>
      </View>

      {selectedId === item.id && (
        <View className="pt-3 border-t border-border mt-3 gap-2">
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Evsel:</Text>
            <Text className="text-xs font-semibold text-foreground">
              {Math.round(item.result.household).toLocaleString('tr-TR')} L
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Gıda:</Text>
            <Text className="text-xs font-semibold text-foreground">
              {Math.round(item.result.food).toLocaleString('tr-TR')} L
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Ürünler:</Text>
            <Text className="text-xs font-semibold text-foreground">
              {Math.round(item.result.products).toLocaleString('tr-TR')} L
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Enerji:</Text>
            <Text className="text-xs font-semibold text-foreground">
              {Math.round(item.result.energy).toLocaleString('tr-TR')} L
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white mb-2">Geçmiş</Text>
          <Text className="text-base text-white opacity-90">
            Önceki hesaplamalarınız
          </Text>
        </View>

        <View className="flex-1 px-6 py-6">
          {state.history.length === 0 ? (
            <View className="flex-1 items-center justify-center py-12">
              <Text className="text-lg text-muted mb-2">📊 Henüz hesaplama yapılmadı</Text>
              <Text className="text-sm text-muted text-center">
                Su ayak izinizi hesaplamaya başlamak için ana sayfaya dönün
              </Text>
            </View>
          ) : (
            <View>
              <Text className="text-sm text-muted font-semibold mb-4">
                Toplam {state.history.length} hesaplama
              </Text>
              <FlatList
                data={state.history}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
