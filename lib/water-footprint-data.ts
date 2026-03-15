/**
 * Su Ayak İzi Hesaplama Verileri
 * 
 * Bu dosya, su ayak izi hesaplaması için gerekli tüm sabit değerleri,
 * formülleri ve veri setlerini içerir.
 * 
 * Kaynaklar:
 * - Water Footprint Calculator Methodology (watercalculator.org)
 * - Yarının Suyu - Su Ayak İzi Hesaplama Testi
 * - Water Footprint Network - Personal Calculator
 */

// ============================================================================
// EVSEL SU TÜKETİMİ SABİTLERİ (Litre/Gün)
// ============================================================================

export const HOUSEHOLD_WATER_CONSUMPTION = {
  // Duş (litre/dakika)
  SHOWER_LITERS_PER_MINUTE: 9.5,
  
  // Tuvalet (litre/kullanım)
  TOILET_LITERS_PER_USE: 6,
  
  // Çamaşır yıkama
  WASHING_MACHINE_LITERS_PER_CYCLE: 65, // Ortalama
  
  // Bulaşık yıkama
  MANUAL_DISHWASHING_LITERS_PER_DAY: 20,
  DISHWASHER_LITERS_PER_CYCLE: 20,
  
  // Bahçe sulama (litre/gün)
  GARDEN_WATERING_LITERS_PER_DAY: 100,
  
  // Araç yıkama (litre/yıkama)
  CAR_WASHING_LITERS: 150,
};

// ============================================================================
// GIDA ÜRÜNLERININ SU AYAK İZİ (Litre/kg veya Litre/Birim)
// ============================================================================

export const FOOD_WATER_FOOTPRINT = {
  // Hayvansal Ürünler
  BEEF_LITERS_PER_KG: 15400,
  LAMB_LITERS_PER_KG: 10000,
  PORK_LITERS_PER_KG: 5500,
  CHICKEN_LITERS_PER_KG: 4300,
  FISH_LITERS_PER_KG: 3000,
  
  // Süt Ürünleri
  MILK_LITERS_PER_LITER: 1000,
  CHEESE_LITERS_PER_KG: 5000,
  YOGURT_LITERS_PER_KG: 1000,
  BUTTER_LITERS_PER_KG: 7500,
  
  // Yumurta
  EGG_LITERS_PER_UNIT: 196, // 1 yumurta ~56g
  
  // Tahıllar
  WHEAT_LITERS_PER_KG: 1300,
  RICE_LITERS_PER_KG: 2500,
  CORN_LITERS_PER_KG: 1200,
  OATS_LITERS_PER_KG: 1000,
  
  // Baklagiller
  CHICKPEA_LITERS_PER_KG: 3200,
  LENTIL_LITERS_PER_KG: 4000,
  SOYBEAN_LITERS_PER_KG: 2000,
  
  // Meyveler
  APPLE_LITERS_PER_KG: 700,
  BANANA_LITERS_PER_KG: 860,
  ORANGE_LITERS_PER_KG: 560,
  AVOCADO_LITERS_PER_KG: 1000,
  ALMOND_LITERS_PER_KG: 16800,
  
  // Sebzeler
  TOMATO_LITERS_PER_KG: 320,
  LETTUCE_LITERS_PER_KG: 240,
  POTATO_LITERS_PER_KG: 287,
  CARROT_LITERS_PER_KG: 400,
  
  // İçecekler
  COFFEE_LITERS_PER_CUP: 140, // 1 fincan ~200ml
  TEA_LITERS_PER_CUP: 35, // 1 fincan ~200ml
  BEER_LITERS_PER_LITER: 300,
  WINE_LITERS_PER_LITER: 870,
  JUICE_LITERS_PER_LITER: 700,
  
  // Çikolata ve Şeker
  CHOCOLATE_LITERS_PER_KG: 17000,
  SUGAR_LITERS_PER_KG: 1600,
};

// ============================================================================
// ÜRÜN TÜKETİMİNİN SU AYAK İZİ
// ============================================================================

export const PRODUCT_WATER_FOOTPRINT = {
  // Tekstil (litre/ürün)
  COTTON_TSHIRT_LITERS: 2700,
  COTTON_JEANS_LITERS: 10000,
  COTTON_SHIRT_LITERS: 2700,
  WOOL_SWEATER_LITERS: 4000,
  SHOES_LITERS: 12000,
  
  // Elektronik (litre/ürün)
  SMARTPHONE_LITERS: 240,
  LAPTOP_LITERS: 240000,
  TELEVISION_LITERS: 100000,
  
  // Diğer Ürünler
  PAPER_LITERS_PER_KG: 300,
  PLASTIC_LITERS_PER_KG: 2000,
};

// ============================================================================
// ENERJİ TÜKETİMİNİN SU AYAK İZİ
// ============================================================================

export const ENERGY_WATER_FOOTPRINT = {
  // Elektrik (litre/kWh)
  ELECTRICITY_LITERS_PER_KWH: 2,
  
  // Doğal Gaz (litre/m³)
  NATURAL_GAS_LITERS_PER_CUBIC_METER: 0.2,
  
  // Benzin/Dizel (litre/litre)
  GASOLINE_LITERS_PER_LITER: 10,
  DIESEL_LITERS_PER_LITER: 10,
};

// ============================================================================
// HESAPLAMA FONKSİYONLARI
// ============================================================================

export interface WaterFootprintCalculation {
  household: number; // Evsel su tüketimi (litre/gün)
  food: number; // Gıda su ayak izi (litre/gün)
  products: number; // Ürün su ayak izi (litre/gün)
  energy: number; // Enerji su ayak izi (litre/gün)
  total: number; // Toplam su ayak izi (litre/gün)
}

export interface WaterFootprintBreakdown {
  household: {
    shower: number;
    toilet: number;
    laundry: number;
    dishes: number;
    garden: number;
    carWashing: number;
  };
  food: {
    meat: number;
    dairy: number;
    grains: number;
    vegetables: number;
    fruits: number;
    beverages: number;
  };
  products: {
    clothing: number;
    electronics: number;
    other: number;
  };
  energy: {
    electricity: number;
    gas: number;
    fuel: number;
  };
}

// ============================================================================
// EVSEL SU TÜKETİMİ HESAPLAMA
// ============================================================================

export function calculateHouseholdWaterFootprint(input: {
  showerMinutesPerDay: number;
  toiletUsesPerDay: number;
  laundryDaysPerWeek: number;
  dishwashingType: 'manual' | 'machine';
  gardenWateringDaysPerWeek: number;
  carWashingTimesPerMonth: number;
}): number {
  let total = 0;
  
  // Duş
  total += input.showerMinutesPerDay * HOUSEHOLD_WATER_CONSUMPTION.SHOWER_LITERS_PER_MINUTE;
  
  // Tuvalet
  total += input.toiletUsesPerDay * HOUSEHOLD_WATER_CONSUMPTION.TOILET_LITERS_PER_USE;
  
  // Çamaşır (haftada kaç gün → günlük ortalama)
  const laundryPerDay = (input.laundryDaysPerWeek * HOUSEHOLD_WATER_CONSUMPTION.WASHING_MACHINE_LITERS_PER_CYCLE) / 7;
  total += laundryPerDay;
  
  // Bulaşık
  if (input.dishwashingType === 'manual') {
    total += HOUSEHOLD_WATER_CONSUMPTION.MANUAL_DISHWASHING_LITERS_PER_DAY;
  } else {
    total += HOUSEHOLD_WATER_CONSUMPTION.DISHWASHER_LITERS_PER_CYCLE;
  }
  
  // Bahçe sulama
  const gardenPerDay = (input.gardenWateringDaysPerWeek * HOUSEHOLD_WATER_CONSUMPTION.GARDEN_WATERING_LITERS_PER_DAY) / 7;
  total += gardenPerDay;
  
  // Araç yıkama (ayda kaç kez → günlük ortalama)
  const carWashPerDay = (input.carWashingTimesPerMonth * HOUSEHOLD_WATER_CONSUMPTION.CAR_WASHING_LITERS) / 30;
  total += carWashPerDay;
  
  return total;
}

// ============================================================================
// GIDA SU AYAK İZİ HESAPLAMA
// ============================================================================

export function calculateFoodWaterFootprint(input: {
  beefServingsPerWeek: number;
  chickenServingsPerWeek: number;
  fishServingsPerWeek: number;
  dairyServingsPerDay: number;
  eggsPerWeek: number;
  coffeePerDay: number;
  teaPerDay: number;
  vegetablesPerDay: number; // porsiyon
  fruitsPerDay: number; // porsiyon
  nutsPerWeek: number; // porsiyon
}): number {
  let total = 0;
  
  // Kırmızı et (100g porsiyon = 1540 litre)
  const beefPerDay = (input.beefServingsPerWeek * 100) / 7;
  total += (beefPerDay / 1000) * FOOD_WATER_FOOTPRINT.BEEF_LITERS_PER_KG;
  
  // Tavuk (100g porsiyon = 430 litre)
  const chickenPerDay = (input.chickenServingsPerWeek * 100) / 7;
  total += (chickenPerDay / 1000) * FOOD_WATER_FOOTPRINT.CHICKEN_LITERS_PER_KG;
  
  // Balık (100g porsiyon = 300 litre)
  const fishPerDay = (input.fishServingsPerWeek * 100) / 7;
  total += (fishPerDay / 1000) * FOOD_WATER_FOOTPRINT.FISH_LITERS_PER_KG;
  
  // Süt ürünleri (200ml = 200 litre)
  total += input.dairyServingsPerDay * FOOD_WATER_FOOTPRINT.MILK_LITERS_PER_LITER * 0.2;
  
  // Yumurta (1 yumurta = 196 litre)
  const eggsPerDay = input.eggsPerWeek / 7;
  total += eggsPerDay * FOOD_WATER_FOOTPRINT.EGG_LITERS_PER_UNIT;
  
  // Kahve (1 fincan = 140 litre)
  total += input.coffeePerDay * FOOD_WATER_FOOTPRINT.COFFEE_LITERS_PER_CUP;
  
  // Çay (1 fincan = 35 litre)
  total += input.teaPerDay * FOOD_WATER_FOOTPRINT.TEA_LITERS_PER_CUP;
  
  // Sebzeler (100g porsiyon = 32 litre)
  total += input.vegetablesPerDay * 100 / 1000 * FOOD_WATER_FOOTPRINT.TOMATO_LITERS_PER_KG;
  
  // Meyveler (100g porsiyon = 86 litre)
  total += input.fruitsPerDay * 100 / 1000 * FOOD_WATER_FOOTPRINT.BANANA_LITERS_PER_KG;
  
  // Kuruyemişler (30g porsiyon = 504 litre)
  const nutsPerDay = (input.nutsPerWeek * 30) / 7;
  total += (nutsPerDay / 1000) * FOOD_WATER_FOOTPRINT.ALMOND_LITERS_PER_KG;
  
  return total;
}

// ============================================================================
// ÜRÜN SU AYAK İZİ HESAPLAMA
// ============================================================================

export function calculateProductWaterFootprint(input: {
  clothingBudgetPerMonth: number; // TL
  electronicsPerYear: number; // kaç cihaz
  paperConsumptionPerMonth: number; // kg
}): number {
  let total = 0;
  
  // Giyim (ortalama 100 TL = 1 ürün, ortalama 5000 litre)
  const clothingItemsPerMonth = input.clothingBudgetPerMonth / 100;
  const clothingPerDay = (clothingItemsPerMonth * 5000) / 30;
  total += clothingPerDay;
  
  // Elektronik (ortalama 1 cihaz/yıl = 240000 litre)
  const electronicsPerDay = (input.electronicsPerYear * 240000) / 365;
  total += electronicsPerDay;
  
  // Kağıt (kg/ay → kg/gün)
  const paperPerDay = input.paperConsumptionPerMonth / 30;
  total += (paperPerDay * PRODUCT_WATER_FOOTPRINT.PAPER_LITERS_PER_KG);
  
  return total;
}

// ============================================================================
// ENERJİ SU AYAK İZİ HESAPLAMA
// ============================================================================

export function calculateEnergyWaterFootprint(input: {
  electricityKwhPerDay: number;
  gasPerMonth: number; // m³
  fuelLitersPerMonth: number;
}): number {
  let total = 0;
  
  // Elektrik
  total += input.electricityKwhPerDay * ENERGY_WATER_FOOTPRINT.ELECTRICITY_LITERS_PER_KWH;
  
  // Doğal gaz (aylık → günlük)
  const gasPerDay = input.gasPerMonth / 30;
  total += gasPerDay * ENERGY_WATER_FOOTPRINT.NATURAL_GAS_LITERS_PER_CUBIC_METER;
  
  // Benzin/Dizel (aylık → günlük)
  const fuelPerDay = input.fuelLitersPerMonth / 30;
  total += fuelPerDay * ENERGY_WATER_FOOTPRINT.GASOLINE_LITERS_PER_LITER;
  
  return total;
}

// ============================================================================
// TOPLAM SU AYAK İZİ HESAPLAMA
// ============================================================================

export function calculateTotalWaterFootprint(
  household: number,
  food: number,
  products: number,
  energy: number
): WaterFootprintCalculation {
  const total = household + food + products + energy;
  
  return {
    household,
    food,
    products,
    energy,
    total,
  };
}

// ============================================================================
// ORTALAMA DEĞERLER VE KARŞILAŞTIRMA
// ============================================================================

export const AVERAGE_WATER_FOOTPRINT = {
  DAILY_LITERS: 3400, // Türkiye ortalaması
  MONTHLY_LITERS: 102000,
  YEARLY_LITERS: 1240000,
  
  // Kategori ortalamaları
  HOUSEHOLD_DAILY: 224,
  FOOD_DAILY: 2400,
  PRODUCTS_DAILY: 400,
  ENERGY_DAILY: 376,
};

// ============================================================================
// SU TASARRUFU ÖNERİLERİ
// ============================================================================

export const WATER_SAVING_TIPS = {
  household: [
    {
      title: "Duş süresini kısaltın",
      description: "Her dakika 9.5 litre su tasarrufu yapabilirsiniz",
      savings: 9.5, // litre/dakika
    },
    {
      title: "Tuvalet sifonu kontrol edin",
      description: "Modern tuvaletler daha az su kullanır",
      savings: 3, // litre/kullanım
    },
    {
      title: "Çamaşır makinesini tam dolu çalıştırın",
      description: "Boş çalıştırmak yerine tam dolu çalıştırmak daha ekonomik",
      savings: 20, // litre/çalışma
    },
    {
      title: "Bulaşık makinesini kullanın",
      description: "Manuel yıkamadan daha az su tüketir",
      savings: 5, // litre/gün
    },
  ],
  food: [
    {
      title: "Kırmızı et tüketimini azaltın",
      description: "Tavuk veya balığa geçiş yaparak su tasarrufu yapabilirsiniz",
      savings: 11100, // litre/100g
    },
    {
      title: "Vejetaryen gün oluşturun",
      description: "Haftada bir gün et tüketmemek önemli tasarruf sağlar",
      savings: 1540, // litre/gün
    },
    {
      title: "Yerel ve mevsimsel ürünler seçin",
      description: "Uzak mesafelerden taşınan ürünler daha fazla su tüketir",
      savings: 500, // litre/gün
    },
    {
      title: "Kahve tüketimini azaltın",
      description: "Kahve yerine çay seçmek su tasarrufu sağlar",
      savings: 105, // litre/fincan
    },
  ],
  products: [
    {
      title: "Giyim alışverişini azaltın",
      description: "Daha az sık alışveriş yapmak su tasarrufu sağlar",
      savings: 5000, // litre/ürün
    },
    {
      title: "Kaliteli ürünler seçin",
      description: "Uzun ömürlü ürünler daha az sıklıkta değiştirilir",
      savings: 2500, // litre/gün
    },
  ],
};
