export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: string; // e.g., "15 minutes"
  cookTime?: string; // e.g., "30 minutes"
  servings: string;
  ingredients: string[];
  instructions: string[];
}
