import { ScrollView, Text, View, TouchableOpacity, Switch, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWaterFootprint } from "@/lib/water-footprint-context";

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const { state } = useWaterFootprint();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleClearData = () => {
    Alert.alert(
      "Tüm Verileri Sil",
      "Bu işlem geri alınamaz. Tüm hesaplama geçmişi silinecektir.",
      [
        { text: "İptal", onPress: () => {}, style: "cancel" },
        {
          text: "Sil",
          onPress: async () => {
            await AsyncStorage.removeItem("waterFootprintHistory");
            Alert.alert("Başarılı", "Tüm veriler silindi.");
          },
          style: "destructive",
        },
      ]
    );
  };

  const SettingItem = ({
    title,
    description,
    onPress,
    rightElement,
  }: {
    title: string;
    description?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-surface rounded-lg p-4 border border-border mb-3 flex-row items-center justify-between active:opacity-70"
    >
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{title}</Text>
        {description && (
          <Text className="text-xs text-muted mt-1">{description}</Text>
        )}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white mb-2">Ayarlar</Text>
          <Text className="text-base text-white opacity-90">
            Uygulama ayarlarını yönetin
          </Text>
        </View>

        <View className="flex-1 px-6 py-6">
          {/* Görünüm Ayarları */}
          <Text className="text-sm font-semibold text-muted uppercase mb-3">Görünüm</Text>
          <SettingItem
            title="Koyu Mod"
            description="Arayüzü koyu temaya geçir"
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={isDarkMode ? colors.primary : colors.muted}
              />
            }
          />

          {/* Bildirim Ayarları */}
          <Text className="text-sm font-semibold text-muted uppercase mb-3 mt-6">Bildirimler</Text>
          <SettingItem
            title="Günlük Hatırlatıcı"
            description="Her gün su tasarrufu ipucu al"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={notificationsEnabled ? colors.primary : colors.muted}
              />
            }
          />

          {/* Bilgi */}
          <Text className="text-sm font-semibold text-muted uppercase mb-3 mt-6">Bilgi</Text>
          <SettingItem
            title="Hesaplama Geçmişi"
            description={`Toplam ${state.history.length} hesaplama kaydedildi`}
          />
          <SettingItem
            title="Sürüm"
            description="1.0.0"
          />
          <SettingItem
            title="Hakkında"
            description="Su Ayak İzi Hesaplayıcı hakkında bilgi al"
            onPress={() => {
              Alert.alert(
                "Hakkında",
                "Su Ayak İzi Hesaplayıcı, günlük su tüketimini hesaplamak ve su tasarrufu yapmanıza yardımcı olmak için tasarlanmıştır."
              );
            }}
          />

          {/* Veri Yönetimi */}
          <Text className="text-sm font-semibold text-muted uppercase mb-3 mt-6">Veri Yönetimi</Text>
          <TouchableOpacity
            onPress={handleClearData}
            className="bg-error/10 rounded-lg p-4 border border-error/20 items-center justify-center active:opacity-70"
          >
            <Text className="text-error font-semibold">Tüm Verileri Sil</Text>
            <Text className="text-xs text-error/70 mt-1">Bu işlem geri alınamaz</Text>
          </TouchableOpacity>

          {/* Geri Bildirim */}
          <Text className="text-sm font-semibold text-muted uppercase mb-3 mt-6">Destek</Text>
          <SettingItem
            title="Geri Bildirim Gönder"
            description="Uygulamayı geliştirmemize yardımcı olun"
            onPress={() => {
              Alert.alert(
                "Geri Bildirim",
                "Geri bildiriminiz için teşekkür ederiz."
              );
            }}
          />
          <SettingItem
            title="Gizlilik Politikası"
            description="Verileriniz nasıl korunduğunu öğrenin"
            onPress={() => {
              Alert.alert(
                "Gizlilik Politikası",
                "Bu uygulama, kişisel verilerinizi korumak için tasarlanmıştır. Tüm veriler cihazınızda yerel olarak depolanır."
              );
            }}
          />

          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
