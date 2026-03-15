import { ScrollView, Text, View, TouchableOpacity, TextInput, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useWaterFootprint } from "@/lib/water-footprint-context";
import { useState } from "react";
import { useColors } from "@/hooks/use-colors";

export default function CalculatorScreen() {
  const router = useRouter();
  const colors = useColors();
  const { state, setHousehold, setFood, setProducts, setEnergy, calculate } = useWaterFootprint();
  
  const [currentStep, setCurrentStep] = useState(1);

  // Evsel Su Tüketimi State
  const [showerMinutes, setShowerMinutes] = useState("10");
  const [toiletUses, setToiletUses] = useState("6");
  const [laundryDays, setLaundryDays] = useState("3");
  const [dishwashingType, setDishwashingType] = useState<'manual' | 'machine'>('machine');
  const [gardenDays, setGardenDays] = useState("0");
  const [carWashing, setCarWashing] = useState("1");

  // Gıda Tüketimi State
  const [beefServings, setBeefServings] = useState("2");
  const [chickenServings, setChickenServings] = useState("3");
  const [fishServings, setFishServings] = useState("1");
  const [dairyServings, setDairyServings] = useState("2");
  const [eggs, setEggs] = useState("2");
  const [coffee, setCoffee] = useState("1");
  const [tea, setTea] = useState("0");
  const [vegetables, setVegetables] = useState("2");
  const [fruits, setFruits] = useState("1");
  const [nuts, setNuts] = useState("1");

  // Ürün Tüketimi State
  const [clothingBudget, setClothingBudget] = useState("200");
  const [electronics, setElectronics] = useState("1");
  const [paper, setPaper] = useState("1");

  // Enerji Tüketimi State
  const [electricity, setElectricity] = useState("10");
  const [gas, setGas] = useState("20");
  const [fuel, setFuel] = useState("50");

  const handleNextStep = () => {
    if (currentStep === 1) {
      setHousehold({
        showerMinutesPerDay: parseFloat(showerMinutes) || 0,
        toiletUsesPerDay: parseFloat(toiletUses) || 0,
        laundryDaysPerWeek: parseFloat(laundryDays) || 0,
        dishwashingType,
        gardenWateringDaysPerWeek: parseFloat(gardenDays) || 0,
        carWashingTimesPerMonth: parseFloat(carWashing) || 0,
      });
    } else if (currentStep === 2) {
      setFood({
        beefServingsPerWeek: parseFloat(beefServings) || 0,
        chickenServingsPerWeek: parseFloat(chickenServings) || 0,
        fishServingsPerWeek: parseFloat(fishServings) || 0,
        dairyServingsPerDay: parseFloat(dairyServings) || 0,
        eggsPerWeek: parseFloat(eggs) || 0,
        coffeePerDay: parseFloat(coffee) || 0,
        teaPerDay: parseFloat(tea) || 0,
        vegetablesPerDay: parseFloat(vegetables) || 0,
        fruitsPerDay: parseFloat(fruits) || 0,
        nutsPerWeek: parseFloat(nuts) || 0,
      });
    } else if (currentStep === 3) {
      setProducts({
        clothingBudgetPerMonth: parseFloat(clothingBudget) || 0,
        electronicsPerYear: parseFloat(electronics) || 0,
        paperConsumptionPerMonth: parseFloat(paper) || 0,
      });
    } else if (currentStep === 4) {
      setEnergy({
        electricityKwhPerDay: parseFloat(electricity) || 0,
        gasPerMonth: parseFloat(gas) || 0,
        fuelLitersPerMonth: parseFloat(fuel) || 0,
      });
      calculate();
      router.push("/(tabs)/results" as any);
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderInputField = (
    label: string,
    value: string,
    onChange: (text: string) => void,
    unit: string = ""
  ) => (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-foreground mb-2">{label}</Text>
      <View className="flex-row items-center border border-border rounded-lg overflow-hidden bg-white dark:bg-surface">
        <TextInput
          className="flex-1 px-4 py-3 text-foreground"
          placeholder="0"
          value={value}
          onChangeText={onChange}
          keyboardType="decimal-pad"
          placeholderTextColor={colors.muted}
        />
        {unit && <Text className="px-4 text-muted">{unit}</Text>}
      </View>
    </View>
  );

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary px-6 pt-6 pb-8">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-base text-white font-semibold mb-4">← Geri</Text>
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-white mb-2">Su Ayak İzi Hesapla</Text>
          <Text className="text-base text-white opacity-90">
            Adım {currentStep} / 4
          </Text>
        </View>

        <View className="flex-1 px-6 py-6 gap-6">
          {/* Adım 1: Evsel Su Tüketimi */}
          {currentStep === 1 && (
            <View>
              <Text className="text-2xl font-bold text-foreground mb-6">Evsel Su Tüketimi</Text>
              
              {renderInputField("Günlük Duş Süresi", showerMinutes, setShowerMinutes, "dakika")}
              {renderInputField("Günlük Tuvalet Kullanımı", toiletUses, setToiletUses, "kez")}
              {renderInputField("Haftada Çamaşır Yıkama", laundryDays, setLaundryDays, "gün")}
              
              <View className="mb-4">
                <Text className="text-sm font-semibold text-foreground mb-2">Bulaşık Yıkama</Text>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => setDishwashingType('manual')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 ${
                      dishwashingType === 'manual'
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-surface'
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        dishwashingType === 'manual' ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      Manuel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setDishwashingType('machine')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 ${
                      dishwashingType === 'machine'
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-surface'
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        dishwashingType === 'machine' ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      Makine
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {renderInputField("Haftada Bahçe Sulama", gardenDays, setGardenDays, "gün")}
              {renderInputField("Ayda Araç Yıkama", carWashing, setCarWashing, "kez")}
            </View>
          )}

          {/* Adım 2: Gıda Tüketimi */}
          {currentStep === 2 && (
            <View>
              <Text className="text-2xl font-bold text-foreground mb-6">Gıda Tüketimi</Text>
              
              {renderInputField("Haftada Kırmızı Et", beefServings, setBeefServings, "porsiyon")}
              {renderInputField("Haftada Tavuk/Balık", chickenServings, setChickenServings, "porsiyon")}
              {renderInputField("Haftada Balık", fishServings, setFishServings, "porsiyon")}
              {renderInputField("Günlük Süt Ürünleri", dairyServings, setDairyServings, "bardak")}
              {renderInputField("Haftada Yumurta", eggs, setEggs, "adet")}
              {renderInputField("Günlük Kahve", coffee, setCoffee, "fincan")}
              {renderInputField("Günlük Çay", tea, setTea, "fincan")}
              {renderInputField("Günlük Sebze", vegetables, setVegetables, "porsiyon")}
              {renderInputField("Günlük Meyve", fruits, setFruits, "porsiyon")}
              {renderInputField("Haftada Kuruyemişler", nuts, setNuts, "porsiyon")}
            </View>
          )}

          {/* Adım 3: Ürün Tüketimi */}
          {currentStep === 3 && (
            <View>
              <Text className="text-2xl font-bold text-foreground mb-6">Ürün Tüketimi</Text>
              
              {renderInputField("Aylık Giyim Alışverişi", clothingBudget, setClothingBudget, "₺")}
              {renderInputField("Yıllık Elektronik Cihaz", electronics, setElectronics, "adet")}
              {renderInputField("Aylık Kağıt Tüketimi", paper, setPaper, "kg")}

              <View className="bg-warning/10 border border-warning rounded-lg p-4 mt-4">
                <Text className="text-sm text-foreground">
                  💡 <Text className="font-semibold">İpucu:</Text> Kaliteli ürünler seçerek daha az sıklıkta değiştirme ihtiyacı duyarsınız.
                </Text>
              </View>
            </View>
          )}

          {/* Adım 4: Enerji Tüketimi */}
          {currentStep === 4 && (
            <View>
              <Text className="text-2xl font-bold text-foreground mb-6">Enerji Tüketimi</Text>
              
              {renderInputField("Günlük Elektrik Tüketimi", electricity, setElectricity, "kWh")}
              {renderInputField("Aylık Doğal Gaz", gas, setGas, "m³")}
              {renderInputField("Aylık Benzin/Dizel", fuel, setFuel, "litre")}

              <View className="bg-success/10 border border-success rounded-lg p-4 mt-4">
                <Text className="text-sm text-foreground">
                  ✓ <Text className="font-semibold">Hazırsınız!</Text> Hesaplamayı tamamlamak için "Hesapla" butonuna tıklayın.
                </Text>
              </View>
            </View>
          )}

          {/* Navigasyon Butonları */}
          <View className="flex-row gap-3 mt-6">
            {currentStep > 1 && (
              <TouchableOpacity
                onPress={handlePreviousStep}
                className="flex-1 border border-primary rounded-lg py-3 px-4 items-center justify-center active:opacity-70"
              >
                <Text className="text-primary font-semibold">Geri</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleNextStep}
              className={`flex-${currentStep === 1 ? '1' : '1'} bg-primary rounded-lg py-3 px-4 items-center justify-center active:opacity-80`}
            >
              <Text className="text-white font-semibold">
                {currentStep === 4 ? "Hesapla" : "İleri"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View className="flex-row gap-2 mt-4">
            {[1, 2, 3, 4].map((step) => (
              <View
                key={step}
                className={`flex-1 h-1 rounded-full ${
                  step <= currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
