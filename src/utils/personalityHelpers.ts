import { PersonalityResult, SupportedLanguage } from '../types/personality';
import { localizedTraits } from '../i18n/localizedTraits';
import { getCurrentLanguage } from '../i18n';

/**
 * Gets the localized name for a personality trait
 */
export const getLocalizedTraitName = (
  traitKey: keyof PersonalityResult, 
  language?: SupportedLanguage
): string => {
  const lang = language || getCurrentLanguage();
  
  // Handle special case for risk_tolerance which has an underscore
  const normalizedTraitKey = traitKey as keyof typeof localizedTraits[typeof lang];
  
  return localizedTraits[lang][normalizedTraitKey] || traitKey;
};

/**
 * Converts a numeric trait score (0-100) to a descriptive level
 */
export const getTraitLevel = (score: number): 'veryLow' | 'low' | 'moderate' | 'high' | 'veryHigh' => {
  if (score < 20) return 'veryLow';
  if (score < 40) return 'low';
  if (score < 60) return 'moderate';
  if (score < 80) return 'high';
  return 'veryHigh';
};

/**
 * Gets all trait keys from a personality result
 */
export const getTraitKeys = (result: PersonalityResult): Array<keyof PersonalityResult> => {
  return Object.keys(result).filter(key => key !== 'timestamp') as Array<keyof PersonalityResult>;
};

/**
 * Sorts traits by their score value (descending)
 */
export const getSortedTraits = (result: PersonalityResult): Array<{key: keyof PersonalityResult, value: number}> => {
  const traitEntries = Object.entries(result)
    .filter(([key]) => key !== 'timestamp')
    .map(([key, value]) => ({
      key: key as keyof PersonalityResult,
      value: typeof value === 'number' ? value : 0
    }))
    .sort((a, b) => b.value - a.value);
  
  return traitEntries;
}; 