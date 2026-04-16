import { create } from 'zustand';

export interface SensorData {
  ph: number;
  turbidity: number;
  waterLevel: number;
  uvIntensity: number;
  ecVoltage: number;
  flowRate: number;
  temperature: number;
}

export interface SystemState {
  isRunning: boolean;
  mode: 'idle' | 'filling' | 'ec' | 'filtering' | 'uv' | 'complete';
  sensorData: SensorData;
  valveStates: {
    inlet: boolean;
    outlet: boolean;
    drain: boolean;
  };
  alerts: Array<{ id: string; type: 'info' | 'warning' | 'error'; message: string; timestamp: number }>;
  startSimulation: () => void;
  stopSimulation: () => void;
  updateSensorData: (data: Partial<SensorData>) => void;
  setMode: (mode: SystemState['mode']) => void;
  addAlert: (type: 'info' | 'warning' | 'error', message: string) => void;
  clearAlerts: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  isRunning: false,
  mode: 'idle',
  sensorData: {
    ph: 6.8,
    turbidity: 45.2,
    waterLevel: 0,
    uvIntensity: 0,
    ecVoltage: 0,
    flowRate: 0,
    temperature: 22.5,
  },
  valveStates: {
    inlet: false,
    outlet: false,
    drain: false,
  },
  alerts: [],
  
  startSimulation: () => set({ isRunning: true, mode: 'filling' }),
  stopSimulation: () => set({ isRunning: false, mode: 'idle' }),
  
  updateSensorData: (data) => set((state) => ({
    sensorData: { ...state.sensorData, ...data }
  })),
  
  setMode: (mode) => set({ mode }),
  
  addAlert: (type, message) => set((state) => ({
    alerts: [...state.alerts, {
      id: Date.now().toString(),
      type,
      message,
      timestamp: Date.now()
    }]
  })),
  
  clearAlerts: () => set({ alerts: [] }),
}));
