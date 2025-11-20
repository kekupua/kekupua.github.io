import { Recipe } from '../types/Recipe';

export const recipes: Recipe[] = [
  {
    id: 'simple-mango-lassi',
    title: 'Simple Mango Lassi',
    imageUrl: '/images/recipes/mangoLassi.png',
    description:
      'A refreshing and creamy mango yogurt drink, perfect for a hot day or as a sweet treat.',
    prepTime: '5 minutes',
    servings: '1-2',
    ingredients: [
      '1.5 cups frozen mango cubes',
      '1 cup plain yogurt (Greek yogurt = thicker, regular = more classic)',
      '½ cup milk (or water if you want it lighter)',
      '1-2 tbsp sugar, honey, or agave (adjust to taste)',
      'A small pinch of salt (optional but boosts flavor)',
      'A few drops of vanilla extract (optional replacement for cardamom aroma)',
      'Ice cubes (optional — usually not needed since mango is frozen)',
    ],
    instructions: [
      'Thaw mango slightly (optional): Let the frozen cubes sit for 5-10 minutes so they blend smoother.',
      'Blend: Add mango, yogurt, milk, sweetener, salt, and vanilla (if using) into a blender.',
      'Blend until smooth: Add more milk if you want it thinner, or more mango/yogurt if you want it thicker.',
      'Taste and adjust: Add extra sweetness or a splash more milk if needed.',
      'Serve immediately: Pour into a chilled glass.',
    ],
  },
  {
    id: 'quick-bulgogi',
    title: 'Quick Bulgogi',
    imageUrl: '/images/recipes/quickBulgogi.png',
    description:
      'A fast and flavorful Korean beef dish made with thinly sliced marinated beef, perfect for a weeknight dinner.',
    prepTime: '10 minutes',
    cookTime: '10 minutes ',
    servings: '2-3',
    ingredients: [
      '~1 lb thinly sliced beef roll (ribeye or brisket style)',

      '3 tbsp soy sauce',

      '1 tbsp sugar (or honey)',

      '1 tbsp sesame oil',

      '2 tsp minced garlic',

      '1 tsp minced ginger (optional)',

      "1 tbsp mirin (or a splash of water if you don't have it)",

      '½ small onion, thinly sliced',

      '1 green onion, chopped',

      '½ small pear or apple, grated (optional — helps tenderize and sweeten)',

      'Sesame seeds, for garnish',
    ],
    instructions: [
      'Marinate: In a bowl, mix soy sauce, sugar, sesame oil, garlic, ginger, mirin, and grated pear/apple. Add beef and sliced onion + green onion. Mix well. Let it sit for 10-15 minutes (or overnight for deeper flavor).',
      "Cook: Heat a pan or skillet over medium-high heat. Add the beef mixture (no need for extra oil if it's fatty). Stir-fry for 5-7 minutes until browned and caramelized.",
      'Finish: Sprinkle sesame seeds and a drizzle of sesame oil before serving.',
      'Serve with steamed rice, kimchi, and lettuce leaves for wraps (ssam style)',
      'You can also toss it into fried rice or top it on noodles for a fast meal.',
    ],
  },
  {
    id: 'cajun-salmon',
    title: 'Cajun Salmon',
    imageUrl: '/images/recipes/cajunSalmon.png',
    description:
      'A simple but incredible Cajun salmon recipe that hits all the right notes - smoky, spicy, buttery, and juicy inside with a perfect crust.',
    prepTime: '10 minutes',
    cookTime: '15 minutes ',
    servings: '2-4',
    ingredients: [
      '2 salmon fillets (6-8 oz each), skin on or off',
      '1½ tbsp Cajun seasoning (store-bought or homemade — recipe below)',
      '1 tbsp olive oil',
      '1 tbsp butter',
      '2 cloves garlic, minced',
      '1 tsp lemon juice (plus wedges for serving)',
      'Optional: chopped parsley or green onion for garnish',
      'Homemade Cajun Seasoning: \nMix and keep in a jar (makes about 3 tbsp):\n1 tbsp paprika (smoked or regular)\n1 tsp garlic powder\n1 tsp onion powder\n1 tsp dried oregano\n½ tsp dried thyme\n½ tsp black pepper\n½ tsp salt\n½ tsp cayenne pepper (adjust to heat preference)',
    ],
    instructions: [
      'Pat the salmon dry. This helps get a good sear. Then rub olive oil over both sides.',
      'Coat with seasoning. Sprinkle Cajun seasoning evenly and press it in lightly.',
      'Sear the salmon. Heat a skillet over medium-high heat. Once hot, add butter. When melted and sizzling, add the salmon (skin side down if using skin). Cook 4-5 minutes per side, depending on thickness, until it flakes easily and develops a golden crust.',
      'Add garlic and lemon. In the last 30 seconds, toss minced garlic into the butter in the pan. Sauté just until fragrant, then drizzle lemon juice over the salmon.',
      'Rest and serve. Garnish with chopped parsley or green onions. Serve with lemon wedges.',
    ],
  },
];
