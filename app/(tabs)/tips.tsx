import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const TIPS_DATA = [
  {
    category: "Evsel Kullanım",
    icon: "🚿",
    tips: [
      {
        title: "Duş süresini kısaltın",
        description: "Her dakika 9.5 litre su tasarrufu yapabilirsiniz. Günde 1 dakika kısaltmak, yılda 3,468 litre tasarrufu sağlar.",
        savings: "9.5 L/dakika",
      },
      {
        title: "Tuvalet sifonu kontrol edin",
        description: "Eski tuvaletler 6 litre su kullanırken, modern tuvaletler 3 litre kullanır.",
        savings: "3 L/kullanım",
      },
      {
        title: "Çamaşır makinesini tam dolu çalıştırın",
        description: "Boş çalıştırmak yerine tam dolu çalıştırmak, çalışma başına 20 litre tasarrufu sağlar.",
        savings: "20 L/çalışma",
      },
      {
        title: "Bulaşık makinesini kullanın",
        description: "Manuel yıkamadan daha az su tüketir. Günde 5 litre tasarrufu sağlayabilir.",
        savings: "5 L/gün",
      },
    ],
  },
  {
    category: "Gıda Tüketimi",
    icon: "🍽️",
    tips: [
      {
        title: "Kırmızı et tüketimini azaltın",
        description: "Kırmızı et, en yüksek su ayak izine sahip gıdadır. 100g = 1,540 litre su.",
        savings: "11,100 L/100g",
      },
      {
        title: "Vejetaryen gün oluşturun",
        description: "Haftada bir gün et tüketmemek, yılda 112,000 litre su tasarrufu sağlar.",
        savings: "1,540 L/gün",
      },
      {
        title: "Yerel ve mevsimsel ürünler seçin",
        description: "Uzak mesafelerden taşınan ürünler daha fazla su tüketir.",
        savings: "500 L/gün",
      },
      {
        title: "Kahve tüketimini azaltın",
        description: "1 fincan kahve = 140 litre su. Kahve yerine çay seçin.",
        savings: "105 L/fincan",
      },
    ],
  },
  {
    category: "Ürün Tüketimi",
    icon: "👕",
    tips: [
      {
        title: "Giyim alışverişini azaltın",
        description: "1 pamuk tişört = 2,700 litre su. Daha az sık alışveriş yapın.",
        savings: "2,700 L/tişört",
      },
      {
        title: "Kaliteli ürünler seçin",
        description: "Uzun ömürlü ürünler daha az sıklıkta değiştirilir.",
        savings: "2,500 L/gün",
      },
      {
        title: "Elektronik cihaz satın almayı azaltın",
        description: "1 akıllı telefon = 240 litre su. Cihazlarınızı uzun süre kullanın.",
        savings: "240 L/telefon",
      },
    ],
  },
  {
    category: "Enerji Tüketimi",
    icon: "⚡",
    tips: [
      {
        title: "Elektrik tüketimini azaltın",
        description: "1 kWh elektrik = 2 litre su. Enerji tasarrufu, su tasarrufu demektir.",
        savings: "2 L/kWh",
      },
      {
        title: "LED ampul kullanın",
        description: "LED ampuller, geleneksel ampullerden yüzde 80 daha az enerji tüketir.",
        savings: "80% tasarruf",
      },
      {
        title: "Benzin tüketimini azaltın",
        description: "1 litre benzin = 10 litre su. Toplu taşıma kullanın.",
        savings: "10 L/litre",
      },
    ],
  },
];

export default function TipsScreen() {
  const colors = useColors();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white mb-2">Su Tasarrufu İpuçları</Text>
          <Text className="text-base text-white opacity-90">
            Günlük hayatınızda su tasarrufu yapın
          </Text>
        </View>

        <View className="flex-1 px-6 py-6 gap-4">
          {TIPS_DATA.map((category) => (
            <View key={category.category}>
              <TouchableOpacity
                onPress={() =>
                  setExpandedCategory(
                    expandedCategory === category.category ? null : category.category
                  )
                }
                className="bg-surface rounded-lg p-4 border border-border active:opacity-70 flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <Text className="text-2xl">{category.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">
                      {category.category}
                    </Text>
                    <Text className="text-xs text-muted">
                      {category.tips.length} ipucu
                    </Text>
                  </View>
                </View>
                <Text className="text-primary font-bold text-lg">
                  {expandedCategory === category.category ? "−" : "+"}
                </Text>
              </TouchableOpacity>

              {expandedCategory === category.category && (
                <View className="mt-2 gap-2 ml-4">
                  {category.tips.map((tip, index) => (
                    <View
                      key={index}
                      className="bg-white dark:bg-surface rounded-lg p-4 border border-border/50"
                    >
                      <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-sm font-semibold text-foreground flex-1">
                          {tip.title}
                        </Text>
                        <View className="bg-primary/10 rounded px-2 py-1 ml-2">
                          <Text className="text-xs font-semibold text-primary">
                            {tip.savings}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-xs text-muted leading-relaxed">
                        {tip.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Motivasyon Kartı */}
          <View className="bg-success/10 rounded-lg p-4 border border-success/20 mt-4">
            <Text className="text-sm font-semibold text-success mb-2">🌍 Yapabileceğiniz Fark</Text>
            <Text className="text-xs text-foreground leading-relaxed">
              Günde 100 litre su tasarrufu yaparsanız, yılda 36,500 litre su tasarrufu yaparsınız.
            </Text>
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
