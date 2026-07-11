export type MuscleGroup = "chest" | "back" | "shoulders" | "arms" | "core" | "glutes" | "quads" | "hamstrings" | "calves" | "forearms";
export type MuscleLayer = "superficial" | "deep";
export type FoodCategory = "meat" | "vegetables" | "fruits" | "grains" | "legumes" | "dairy" | "eggs" | "seafood" | "nuts" | "seasoning";
export type NutrientType = "macronutrient" | "vitamin" | "mineral" | "other";
export type SupplementCategory = "performance" | "muscle" | "fat_loss" | "health" | "cognitive";
export type EvidenceRating = "A" | "B" | "C" | "D";
export type TrainingGoal = "muscle_gain" | "fat_loss" | "strength" | "endurance";
export type FoodStance = "eat_more" | "moderate" | "eat_less";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface HazardInfo {
  shortTerm: string[]; longTerm: string[]; atRiskGroups: string[];
  earlySigns?: string[]; acuteSymptoms?: string[]; antagonism?: string[];
}
export interface RiskItem { risk: string; severity: "低" | "中" | "高"; population: string; }

export interface Muscle {
  id: string; nameZh: string; nameEn: string; nameLa: string;
  group: MuscleGroup; layer: MuscleLayer;
  origin: string; insertion: string; function: string[];
  exerciseIds: string[]; relatedNutrientIds: string[];
  aliases: string[]; meshNames: string[];
}

export interface Exercise {
  id: string; nameZh: string; nameEn: string;
  muscleIds: string[]; difficulty: DifficultyLevel; equipment: string;
  steps: string[]; commonMistakes: string[]; tips: string;
  gifPath: string; relatedSupplementIds: string[]; relatedFoodIds: string[];
}

export interface Nutrient {
  id: string; nameZh: string; nameEn: string; type: NutrientType;
  rda: { general: string; athlete?: string; bodybuilding?: string };
  upperLimit: string; deficiency: HazardInfo; excess: HazardInfo;
  supplementIds: string[]; foodIds: string[]; relatedGoals: TrainingGoal[]; aliases: string[];
}

export interface Supplement {
  id: string; nameZh: string; nameEn: string; category: SupplementCategory;
  summary: string; mechanism: { title: string; detail: string };
  evidenceRating: EvidenceRating;
  effects: { effect: string; level: "强" | "中" | "弱" }[];
  dosage: { loading?: string; maintenance: string; timing?: string };
  safety: { sideEffects: string[]; contraindications: string[]; longTerm: string };
  foodSources: string[]; nutrientIds: string[]; relatedGoals: TrainingGoal[];
  references: string[]; aliases: string[];
}

export interface Food {
  id: string; nameZh: string; nameEn: string; category: FoodCategory;
  nutritionPer100g: { calories: number; protein: number; fat: number; carbs: number; fiber?: number; vitamins?: Record<string,number>; minerals?: Record<string,number> };
  stance: FoodStance; stanceReason: string;
  eatMoreFor?: { goals: TrainingGoal[]; groups: string[]; reason: string };
  eatLessFor?: { groups: string[]; risks: RiskItem[] };
  cookingTips: string; nutrientIds: string[]; aliases: string[];
}

export interface SearchableItem {
  id: string; type: "muscle" | "exercise" | "nutrient" | "supplement" | "food";
  nameZh: string; nameEn: string; aliases: string[]; href: string;
  group?: MuscleGroup; category?: FoodCategory | SupplementCategory;
}
export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  chest: "胸部", back: "背部", shoulders: "肩部", arms: "手臂", core: "腹部/核心",
  glutes: "臀部", quads: "大腿前侧", hamstrings: "大腿后侧", calves: "小腿", forearms: "前臂",
};
export const FOOD_CATEGORY_LABELS: Record<FoodCategory, string> = {
  meat: "肉类", vegetables: "蔬菜", fruits: "水果", grains: "谷物", legumes: "豆类",
  dairy: "乳制品", eggs: "蛋类", seafood: "水产", nuts: "坚果种子", seasoning: "调味品",
};
export const SUPPLEMENT_CATEGORY_LABELS: Record<SupplementCategory, string> = {
  performance: "运动表现", muscle: "增肌/恢复", fat_loss: "减脂", health: "健康/免疫", cognitive: "认知/情绪",
};
export const TRAINING_GOAL_LABELS: Record<TrainingGoal, string> = {
  muscle_gain: "增肌", fat_loss: "减脂", strength: "力量提升", endurance: "耐力提升",
};
export const EVIDENCE_LABELS: Record<EvidenceRating, { label: string; color: string }> = {
  A: { label: "A 级 - 强证据", color: "text-green-600" },
  B: { label: "B 级 - 中等证据", color: "text-blue-600" },
  C: { label: "C 级 - 有限证据", color: "text-yellow-600" },
  D: { label: "D 级 - 证据不足", color: "text-red-600" },
};
export const FOOD_STANCE_LABELS: Record<FoodStance, { label: string; emoji: string; color: string }> = {
  eat_more: { label: "推荐多吃", emoji: "✅", color: "text-green-600" },
  moderate: { label: "适量即可", emoji: "⚖️", color: "text-gray-600" },
  eat_less: { label: "提醒少吃", emoji: "⚠️", color: "text-orange-600" },
};
export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  beginner: "初级", intermediate: "中级", advanced: "高级",
};
