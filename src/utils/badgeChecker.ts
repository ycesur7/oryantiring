import { UserProgress } from '@/store/gameStore';

/**
 * Kullanıcının hangi rozetleri kazanması gerektiğini kontrol eder
 */
export function checkBadgeEligibility(progress: UserProgress): string[] {
  const eligibleBadges: string[] = [];

  // Dürüstlük Ustası
  if (progress.valueScores.dürüstlük >= 90) {
    eligibleBadges.push('honesty_master');
  }

  // Empati Kahramanı
  if (progress.valueScores.empati >= 90) {
    eligibleBadges.push('empathy_hero');
  }

  // Takım Oyuncusu
  if (progress.valueScores.işbirliği >= 90) {
    eligibleBadges.push('team_player');
  }

  // Sorumluluk Yıldızı
  if (progress.valueScores.sorumluluk >= 90) {
    eligibleBadges.push('responsible_star');
  }

  // Saygı Şampiyonu
  if (progress.valueScores.saygı >= 90) {
    eligibleBadges.push('respect_champion');
  }

  // Değerler Kaşifi - Tüm kontrol noktalarını tamamla
  if (progress.completedCheckpoints >= 5) {
    eligibleBadges.push('values_explorer');
  }

  // Mükemmel Yolculuk - Tüm değerlerde 90+ puan
  const allValuesHigh = Object.values(progress.valueScores).every(score => score >= 90);
  if (allValuesHigh && progress.completedCheckpoints >= 5) {
    eligibleBadges.push('perfect_journey');
  }

  return eligibleBadges;
}

/**
 * Değer puanlarına göre kullanıcının en güçlü olduğu değeri bulur
 */
export function getStrongestValue(progress: UserProgress): { value: string; score: number } | null {
  const entries = Object.entries(progress.valueScores);
  if (entries.length === 0) return null;

  const [value, score] = entries.reduce((max, current) => 
    current[1] > max[1] ? current : max
  );

  return { value, score };
}

/**
 * Kullanıcının genel değer profilini oluşturur
 */
export function generateValueProfile(progress: UserProgress) {
  const total = Object.values(progress.valueScores).reduce((sum, score) => sum + score, 0);
  const average = progress.completedCheckpoints > 0 ? total / progress.completedCheckpoints : 0;

  return {
    average: Math.round(average),
    strongest: getStrongestValue(progress),
    distribution: Object.entries(progress.valueScores).map(([value, score]) => ({
      value,
      score,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0,
    })),
  };
}
