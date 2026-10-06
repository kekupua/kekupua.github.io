export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: string;
  cookTime?: string;
  servings: string;
  ingredients: Ingredient[];
  instructions: string[];
}
