"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Zap, Filter, Sun, ThermometerSun, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import GaugeCard from "@/components/GaugeCard";
import PHChart from "@/components/charts/PHChart";
import TurbidityChart from "@/components/charts/TurbidityChart";
import { useSystemStore } from "@/store/systemStore";

export default function Dashboard() {
  const { sensorData, isRunning, mode } = useSystemStore();
  const [phHistory, setPhHistory] = useState<Array<{ time: string; value: number }>>([]);
  const [turbidityHistory, setTurbidityHistory] = useState<Array<{ time: string; value: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      setPhHistory(prev => [...prev.slice(-19), { time: now, value: sensorData.ph }]);
      setTurbidityHistory(prev => [...prev.slice(-19), { time: now, value: sensorData.turbidity }]);
    }, 2000);

    return () => clearInterval(interval);
  }, [sensorData]);

  const getModeText = () => {
    const modes = {
      idle: 'Beklemede',
      filling: 'Dolum',
      ec: 'Elektrokoagülasyon',
      filtering: 'Filtrasyon',
      uv: 'UV Dezenfeksiyon',
      complete: 'Tamamlandı'
    };
    return modes[mode];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-white">Canlı İzleme Paneli</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
              <span className="text-slate-400">{isRunning ? 'Aktif' : 'Pasif'}</span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Mod: {getModeText()}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <GaugeCard
            title="pH Seviyesi"
            value={sensorData.ph}
            unit="pH"
            icon={Activity}
            color="text-purple-400"
            min={0}
            max={14}
            optimal={{ min: 6.5, max: 8.5 }}
          />
          <GaugeCard
            title="Bulanıklık"
            value={sensorData.turbidity}
            unit="NTU"
            icon={Droplets}
            color="text-cyan-400"
            min={0}
            max={100}
            optimal={{ min: 0, max: 3 }}
          />
          <GaugeCard
            title="Su Seviyesi"
            value={sensorData.waterLevel}
            unit="%"
            icon={Droplets}
            color="text-blue-400"
            min={0}
            max={100}
          />
          <GaugeCard
            title="UV Yoğunluğu"
            value={sensorData.uvIntensity}
            unit="mW/cm²"
            icon={Sun}
            color="text-yellow-400"
            min={0}
            max={10}
          />
          <GaugeCard
            title="EC Voltajı"
            value={sensorData.ecVoltage}
            unit="V"
            icon={Zap}
            color="text-orange-400"
            min={0}
            max={15}
          />
          <GaugeCard
            title="Sıcaklık"
            value={sensorData.temperature}
            unit="°C"
            icon={ThermometerSun}
            color="text-red-400"
            min={0}
            max={50}
            optimal={{ min: 15, max: 30 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {phHistory.length > 0 && <PHChart data={phHistory} />}
          {turbidityHistory.length > 0 && <TurbidityChart data={turbidityHistory} />}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-effect rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Sistem Durumu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-sm text-slate-400">Filtre Durumu</div>
                <div className="text-white font-medium">Normal</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-sm text-slate-400">Elektrot Ömrü</div>
                <div className="text-white font-medium">%87</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-sm text-slate-400">UV Lamba Ömrü</div>
                <div className="text-white font-medium">%92</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
