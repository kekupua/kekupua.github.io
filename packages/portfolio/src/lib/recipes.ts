import { Recipe } from '../types/Recipe';

export const recipes: Recipe[] = [
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
    ],
    instructions: [
      'Pat the salmon dry. This helps get a good sear. Then rub olive oil over both sides.',
      'Coat with seasoning. Sprinkle Cajun seasoning evenly and press it in lightly.',
      'Sear the salmon. Heat a skillet over medium-high heat. Once hot, add butter. When melted and sizzling, add the salmon (skin side down if using skin). Cook 4-5 minutes per side, depending on thickness, until it flakes easily and develops a golden crust.',
      'Add garlic and lemon. In the last 30 seconds, toss minced garlic into the butter in the pan. Sauté just until fragrant, then drizzle lemon juice over the salmon.',
      'Rest and serve. Garnish with chopped parsley or green onions. Serve with lemon wedges.',
    ],
  },
  // {
  //   id: 'lemon-herb-roast-chicken',
  //   title: 'Lemon Herb Roast Chicken',
  //   description:
  //     'A perfectly roasted chicken with crispy, golden-brown skin and juicy, flavorful meat, infused with lemon and fresh herbs.',
  //   imageUrl: 'https://picsum.photos/seed/chicken/800/600',
  //   prepTime: '25 minutes',
  //   cookTime: '1 hour 30 minutes',
  //   servings: 4,
  //   ingredients: [
  //     '1 (4-pound) whole chicken',
  //     '1 lemon, halved',
  //     '1 head of garlic, cut in half crosswise',
  //     '1 small bunch fresh thyme',
  //     '1 small bunch fresh rosemary',
  //     '2 tbsp unsalted butter, softened',
  //     'Salt and freshly ground black pepper',
  //     '1 large onion, quartered',
  //     '4 carrots, cut into 2-inch pieces',
  //   ],
  //   instructions: [
  //     'Preheat oven to 425°F (220°C). Remove any giblets from the chicken and pat it dry with paper towels.',
  //     'Season the chicken generously inside and out with salt and pepper.',
  //     'Stuff the cavity with the halved lemon, garlic, thyme, and rosemary.',
  //     'Rub the softened butter all over the skin of the chicken.',
  //     'Place the onion and carrots in a roasting pan to create a rack for the chicken. Place the chicken on top of the vegetables.',
  //     'Roast for 1 hour to 1 hour and 30 minutes, or until the juices run clear when you cut between a leg and thigh.',
  //     'Remove the chicken from the oven and let it rest for 15 minutes before carving.',
  //     'Serve with the roasted vegetables.',
  //   ],
  // },
  // {
  //   id: 'creamy-tomato-soup',
  //   title: 'Creamy Tomato Soup with Grilled Cheese Croutons',
  //   description:
  //     'A velvety, rich tomato soup that is both comforting and delicious, topped with fun and crispy grilled cheese croutons.',
  //   imageUrl: 'https://picsum.photos/seed/soup/800/600',
  //   prepTime: '15 minutes',
  //   cookTime: '30 minutes',
  //   servings: 4,
  //   ingredients: [
  //     '2 tbsp olive oil',
  //     '1 large onion, chopped',
  //     '2 cloves garlic, minced',
  //     '1 (28-ounce) can San Marzano tomatoes',
  //     '2 cups vegetable broth',
  //     '1/2 cup heavy cream',
  //     '1 tsp sugar',
  //     'Salt and pepper to taste',
  //     '4 slices bread',
  //     '4 slices cheddar cheese',
  //     '2 tbsp butter',
  //   ],
  //   instructions: [
  //     'Heat olive oil in a large pot over medium heat. Add onion and cook until soft, about 5 minutes. Add garlic and cook for 1 minute more.',
  //     'Add the tomatoes (with their juices) and vegetable broth. Break up the tomatoes with a spoon. Bring to a simmer.',
  //     'Reduce heat and let it simmer for 20 minutes.',
  //     'Use an immersion blender to blend the soup until smooth. Stir in the heavy cream and sugar. Season with salt and pepper.',
  //     'To make the croutons, make two grilled cheese sandwiches with the bread, cheese, and butter.',
  //     'Cook in a skillet until golden brown on both sides and the cheese is melted.',
  //     'Let the sandwiches cool slightly, then cut them into 1-inch cubes.',
  //     'Ladle the soup into bowls and top with the grilled cheese croutons.',
  //   ],
  // },
];
