/**
 * UV Dozajı Hesaplama
 * Doz (mJ/cm²) = Yoğunluk (mW/cm²) × Süre (saniye)
 */
export function calculateUVDose(intensity: number, time: number): number {
  return intensity * time;
}

/**
 * Elektrokoagülasyon Verimlilik Hesaplama
 * Verim (%) = ((Başlangıç Bulanıklık - Son Bulanıklık) / Başlangıç Bulanıklık) × 100
 */
export function calculateEfficiency(initialTurbidity: number, finalTurbidity: number): number {
  return ((initialTurbidity - finalTurbidity) / initialTurbidity) * 100;
}

/**
 * Su Tasarrufu Hesaplama (Yıllık)
 * Günlük kullanım × 365 gün
 */
export function calculateWaterSavings(dailyUsage: number): {
  yearly: number;
  cost: number; // TL cinsinden (m³ başına 15 TL varsayımı)
} {
  const yearly = dailyUsage * 365;
  const cost = yearly * 15;
  return { yearly, cost };
}

/**
 * Elektrokoagülasyon Akım Yoğunluğu
 * J (A/m²) = I (A) / A (m²)
 */
export function calculateCurrentDensity(current: number, electrodeArea: number): number {
  return current / electrodeArea;
}

/**
 * pH Değerlendirme
 */
export function evaluatePH(ph: number): { status: 'optimal' | 'acceptable' | 'warning'; message: string } {
  if (ph >= 6.5 && ph <= 8.5) {
    return { status: 'optimal', message: 'pH değeri optimal aralıkta' };
  } else if (ph >= 6.0 && ph <= 9.0) {
    return { status: 'acceptable', message: 'pH değeri kabul edilebilir aralıkta' };
  } else {
    return { status: 'warning', message: 'pH değeri hedef aralığın dışında' };
  }
}

/**
 * Bulanıklık Değerlendirme (NTU)
 */
export function evaluateTurbidity(ntu: number): { status: 'excellent' | 'good' | 'poor'; message: string } {
  if (ntu < 3) {
    return { status: 'excellent', message: 'Mükemmel berraklık - Sulama için uygun' };
  } else if (ntu < 10) {
    return { status: 'good', message: 'İyi berraklık - Kullanılabilir' };
  } else {
    return { status: 'poor', message: 'Yüksek bulanıklık - Ek arıtma gerekli' };
  }
}
