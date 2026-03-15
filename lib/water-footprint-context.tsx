import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  calculateHouseholdWaterFootprint,
  calculateFoodWaterFootprint,
  calculateProductWaterFootprint,
  calculateEnergyWaterFootprint,
  calculateTotalWaterFootprint,
  WaterFootprintCalculation,
} from './water-footprint-data';

// ============================================================================
// TYPES
// ============================================================================

export interface HouseholdInput {
  showerMinutesPerDay: number;
  toiletUsesPerDay: number;
  laundryDaysPerWeek: number;
  dishwashingType: 'manual' | 'machine';
  gardenWateringDaysPerWeek: number;
  carWashingTimesPerMonth: number;
}

export interface FoodInput {
  beefServingsPerWeek: number;
  chickenServingsPerWeek: number;
  fishServingsPerWeek: number;
  dairyServingsPerDay: number;
  eggsPerWeek: number;
  coffeePerDay: number;
  teaPerDay: number;
  vegetablesPerDay: number;
  fruitsPerDay: number;
  nutsPerWeek: number;
}

export interface ProductInput {
  clothingBudgetPerMonth: number;
  electronicsPerYear: number;
  paperConsumptionPerMonth: number;
}

export interface EnergyInput {
  electricityKwhPerDay: number;
  gasPerMonth: number;
  fuelLitersPerMonth: number;
}

export interface CalculationRecord {
  id: string;
  date: string; // ISO date string
  household: HouseholdInput;
  food: FoodInput;
  products: ProductInput;
  energy: EnergyInput;
  result: WaterFootprintCalculation;
}

export interface WaterFootprintState {
  currentCalculation: {
    household: HouseholdInput | null;
    food: FoodInput | null;
    products: ProductInput | null;
    energy: EnergyInput | null;
    result: WaterFootprintCalculation | null;
  };
  history: CalculationRecord[];
  isLoading: boolean;
  error: string | null;
}

type WaterFootprintAction =
  | { type: 'SET_HOUSEHOLD'; payload: HouseholdInput }
  | { type: 'SET_FOOD'; payload: FoodInput }
  | { type: 'SET_PRODUCTS'; payload: ProductInput }
  | { type: 'SET_ENERGY'; payload: EnergyInput }
  | { type: 'CALCULATE'; payload: WaterFootprintCalculation }
  | { type: 'SAVE_CALCULATION'; payload: CalculationRecord }
  | { type: 'LOAD_HISTORY'; payload: CalculationRecord[] }
  | { type: 'DELETE_CALCULATION'; payload: string }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: WaterFootprintState = {
  currentCalculation: {
    household: null,
    food: null,
    products: null,
    energy: null,
    result: null,
  },
  history: [],
  isLoading: false,
  error: null,
};

// ============================================================================
// REDUCER
// ============================================================================

function waterFootprintReducer(
  state: WaterFootprintState,
  action: WaterFootprintAction
): WaterFootprintState {
  switch (action.type) {
    case 'SET_HOUSEHOLD':
      return {
        ...state,
        currentCalculation: {
          ...state.currentCalculation,
          household: action.payload,
        },
      };
    case 'SET_FOOD':
      return {
        ...state,
        currentCalculation: {
          ...state.currentCalculation,
          food: action.payload,
        },
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        currentCalculation: {
          ...state.currentCalculation,
          products: action.payload,
        },
      };
    case 'SET_ENERGY':
      return {
        ...state,
        currentCalculation: {
          ...state.currentCalculation,
          energy: action.payload,
        },
      };
    case 'CALCULATE':
      return {
        ...state,
        currentCalculation: {
          ...state.currentCalculation,
          result: action.payload,
        },
      };
    case 'SAVE_CALCULATION':
      return {
        ...state,
        history: [action.payload, ...state.history],
        currentCalculation: {
          household: null,
          food: null,
          products: null,
          energy: null,
          result: null,
        },
      };
    case 'LOAD_HISTORY':
      return {
        ...state,
        history: action.payload,
      };
    case 'DELETE_CALCULATION':
      return {
        ...state,
        history: state.history.filter((record) => record.id !== action.payload),
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        currentCalculation: {
          household: null,
          food: null,
          products: null,
          energy: null,
          result: null,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

interface WaterFootprintContextType {
  state: WaterFootprintState;
  setHousehold: (input: HouseholdInput) => void;
  setFood: (input: FoodInput) => void;
  setProducts: (input: ProductInput) => void;
  setEnergy: (input: EnergyInput) => void;
  calculate: () => void;
  saveCalculation: () => Promise<void>;
  loadHistory: () => Promise<void>;
  deleteCalculation: (id: string) => Promise<void>;
  clearCurrent: () => void;
}

const WaterFootprintContext = createContext<WaterFootprintContextType | undefined>(
  undefined
);

// ============================================================================
// PROVIDER
// ============================================================================

export function WaterFootprintProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(waterFootprintReducer, initialState);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  // Save history to AsyncStorage whenever it changes
  useEffect(() => {
    saveHistoryToStorage();
  }, [state.history]);

  const setHousehold = (input: HouseholdInput) => {
    dispatch({ type: 'SET_HOUSEHOLD', payload: input });
  };

  const setFood = (input: FoodInput) => {
    dispatch({ type: 'SET_FOOD', payload: input });
  };

  const setProducts = (input: ProductInput) => {
    dispatch({ type: 'SET_PRODUCTS', payload: input });
  };

  const setEnergy = (input: EnergyInput) => {
    dispatch({ type: 'SET_ENERGY', payload: input });
  };

  const calculate = () => {
    if (
      !state.currentCalculation.household ||
      !state.currentCalculation.food ||
      !state.currentCalculation.products ||
      !state.currentCalculation.energy
    ) {
      dispatch({ type: 'SET_ERROR', payload: 'Lütfen tüm alanları doldurunuz' });
      return;
    }

    const household = calculateHouseholdWaterFootprint(
      state.currentCalculation.household
    );
    const food = calculateFoodWaterFootprint(state.currentCalculation.food);
    const products = calculateProductWaterFootprint(
      state.currentCalculation.products
    );
    const energy = calculateEnergyWaterFootprint(state.currentCalculation.energy);

    const result = calculateTotalWaterFootprint(household, food, products, energy);
    dispatch({ type: 'CALCULATE', payload: result });
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const saveCalculation = async () => {
    if (!state.currentCalculation.result) {
      dispatch({ type: 'SET_ERROR', payload: 'Henüz hesaplama yapılmadı' });
      return;
    }

    const record: CalculationRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      household: state.currentCalculation.household!,
      food: state.currentCalculation.food!,
      products: state.currentCalculation.products!,
      energy: state.currentCalculation.energy!,
      result: state.currentCalculation.result,
    };

    dispatch({ type: 'SAVE_CALCULATION', payload: record });
  };

  const loadHistory = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await AsyncStorage.getItem('waterFootprintHistory');
      if (data) {
        const history = JSON.parse(data) as CalculationRecord[];
        dispatch({ type: 'LOAD_HISTORY', payload: history });
      }
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Geçmiş veriler yüklenemedi',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveHistoryToStorage = async () => {
    try {
      await AsyncStorage.setItem(
        'waterFootprintHistory',
        JSON.stringify(state.history)
      );
    } catch (error) {
      console.error('Geçmiş veriler kaydedilemedi:', error);
    }
  };

  const deleteCalculation = async (id: string) => {
    dispatch({ type: 'DELETE_CALCULATION', payload: id });
  };

  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  const value: WaterFootprintContextType = {
    state,
    setHousehold,
    setFood,
    setProducts,
    setEnergy,
    calculate,
    saveCalculation,
    loadHistory,
    deleteCalculation,
    clearCurrent,
  };

  return (
    <WaterFootprintContext.Provider value={value}>
      {children}
    </WaterFootprintContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useWaterFootprint() {
  const context = useContext(WaterFootprintContext);
  if (context === undefined) {
    throw new Error(
      'useWaterFootprint must be used within a WaterFootprintProvider'
    );
  }
  return context;
}
