import { Muscle, Exercise, Nutrient, Supplement, Food, SearchableItem, MuscleGroup, FoodCategory, FoodStance } from '@/lib/types';
import { muscles } from './muscles';
import { exercises } from './exercises';
import { nutrients } from './nutrients';
import { supplements } from './supplements';
import { foods } from './foods';

export function getMuscleById(id: string): Muscle | undefined { return muscles.find(m => m.id === id); }
export function getExerciseById(id: string): Exercise | undefined { return exercises.find(e => e.id === id); }
export function getNutrientById(id: string): Nutrient | undefined { return nutrients.find(n => n.id === id); }
export function getSupplementById(id: string): Supplement | undefined { return supplements.find(s => s.id === id); }
export function getFoodById(id: string): Food | undefined { return foods.find(f => f.id === id); }
export function getMusclesByGroup(group: MuscleGroup): Muscle[] { return muscles.filter(m => m.group === group); }
export function getExercisesByMuscle(muscleId: string): Exercise[] { return exercises.filter(e => e.muscleIds.includes(muscleId)); }
export function getFoodsByCategory(category: FoodCategory): Food[] { return foods.filter(f => f.category === category); }
export function getFoodsByNutrient(nutrientId: string): Food[] { return foods.filter(f => f.nutrientIds.includes(nutrientId)); }
export function getSupplementsByNutrient(nutrientId: string): Supplement[] { return supplements.filter(s => s.nutrientIds.includes(nutrientId)); }
export function getFoodsByStance(stance: FoodStance): Food[] { return foods.filter(f => f.stance === stance); }

export function getAllSearchableItems(): SearchableItem[] {
  return [
    ...muscles.map(m => ({ id: m.id, type: "muscle" as const, nameZh: m.nameZh, nameEn: m.nameEn, aliases: m.aliases, href: `/anatomy?muscle=${m.id}`, group: m.group })),
    ...exercises.map(e => ({ id: e.id, type: "exercise" as const, nameZh: e.nameZh, nameEn: e.nameEn, aliases: [], href: `/exercises/${e.id}` })),
    ...nutrients.map(n => ({ id: n.id, type: "nutrient" as const, nameZh: n.nameZh, nameEn: n.nameEn, aliases: n.aliases, href: `/nutrition/nutrients/${n.id}` })),
    ...supplements.map(s => ({ id: s.id, type: "supplement" as const, nameZh: s.nameZh, nameEn: s.nameEn, aliases: s.aliases, href: `/nutrition/supplements/${s.id}`, category: s.category })),
    ...foods.map(f => ({ id: f.id, type: "food" as const, nameZh: f.nameZh, nameEn: f.nameZh, aliases: f.aliases, href: `/nutrition/foods/${f.id}`, category: f.category })),
  ];
}

