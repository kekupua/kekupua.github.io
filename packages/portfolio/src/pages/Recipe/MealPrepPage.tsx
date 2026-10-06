import { useMemo, useState } from 'react';
import { Check, Clipboard, Download, Search, ShoppingCart } from 'lucide-react';
import { recipes } from '../../lib/recipes';
import { Recipe } from '../../types/Recipe';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/s$/, '');

const availabilityFor = (recipe: Recipe, pantry: Set<string>) => {
  const matched = recipe.ingredients.filter((ingredient) => {
    const name = normalize(ingredient.name);
    return [...pantry].some(
      (item) => item === name || item.includes(name) || name.includes(item),
    );
  }).length;
  return recipe.ingredients.length ? matched / recipe.ingredients.length : 0;
};

const availabilityLabel = (ratio: number) => {
  if (ratio === 1) return 'You have everything';
  if (ratio === 0) return 'Nothing on hand';
  return `${Math.round(ratio * 100)}% on hand`;
};

const availabilityClasses = (ratio: number) => {
  if (ratio === 1) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (ratio >= 0.67) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (ratio >= 0.34) return 'bg-orange-100 text-orange-800 border-orange-200';
  if (ratio > 0) return 'bg-red-100 text-red-800 border-red-200';
  return 'bg-red-200 text-red-900 border-red-300';
};

const buildGroceryText = (selectedRecipes: Recipe[], checked: Set<string>) => {
  const ingredients = new Map<string, { name: string; amounts: string[] }>();

  selectedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const key = normalize(ingredient.name);
      const existing = ingredients.get(key);
      if (existing) {
        existing.amounts.push(ingredient.amount);
      } else {
        ingredients.set(key, { name: ingredient.name, amounts: [ingredient.amount] });
      }
    });
  });

  return [...ingredients.entries()]
    .filter(([key]) => !checked.has(key))
    .map(([, ingredient]) => `- [ ] ${ingredient.amounts.join(' + ')} ${ingredient.name}`)
    .join('\n');
};

export const MealPrepPage = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pantryText, setPantryText] = useState('');
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const ingredientTags = useMemo(() => {
    const ingredients = new Map<string, string>();
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const key = normalize(ingredient.name);
        if (!ingredients.has(key)) ingredients.set(key, ingredient.name);
      });
    });
    return [...ingredients.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const togglePantryTag = (ingredient: string) => {
    const key = normalize(ingredient);
    const current = new Set(pantry);
    if (current.has(key)) current.delete(key);
    else current.add(key);
    setPantryText([...current].join(', '));
  };

  const clearPantry = () => setPantryText('');

  const selectedRecipes = useMemo(
    () => recipes.filter((recipe) => selectedIds.includes(recipe.id)),
    [selectedIds],
  );

  const pantry = useMemo(
    () =>
      new Set(
        pantryText
          .split(/[,\n]/)
          .map(normalize)
          .filter(Boolean),
      ),
    [pantryText],
  );

  const filteredRecipes = useMemo(
    () =>
      recipes.filter((recipe) =>
        `${recipe.title} ${recipe.description}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  const groceryText = useMemo(
    () => buildGroceryText(selectedRecipes, checked),
    [selectedRecipes, checked],
  );

  const toggleRecipe = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setChecked(new Set());
  };

  const toggleIngredient = (name: string) => {
    const key = normalize(name);
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const copyList = async () => {
    await navigator.clipboard.writeText(groceryText || 'No ingredients needed.');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const downloadMarkdown = () => {
    const blob = new Blob(
      [`# Weekly Meal Prep\n\n${groceryText || '- Nothing to buy!'}\n`],
      { type: 'text/markdown;charset=utf-8' },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meal-prep-grocery-list.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className='min-h-screen bg-slate-50 px-4 py-8 sm:px-6'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8'>
          <a href='#/recipesByGpt' className='text-sm font-semibold text-brand-600 hover:underline'>
            &larr; Recipe collection
          </a>
          <h1 className='mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl'>
            Weekly Meal Prep
          </h1>
          <p className='mt-3 max-w-3xl text-lg text-slate-600'>
            Pick the recipes you want, build one combined shopping list, or tell us
            what is already in your kitchen to see what you can make.
          </p>
        </div>

        <div className='grid gap-8 lg:grid-cols-[1.35fr_0.65fr]'>
          <section className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
              <div>
                <h2 className='text-2xl font-bold text-slate-900'>Choose recipes</h2>
                <p className='mt-1 text-sm text-slate-500'>
                  {selectedRecipes.length} selected
                </p>
              </div>
              <label className='relative block sm:w-64'>
                <Search className='absolute left-3 top-2.5 h-5 w-5 text-slate-400' />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder='Search recipes...'
                  className='w-full rounded-xl border border-slate-300 py-2 pl-10 pr-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
                />
              </label>
            </div>

            <div className='mt-5 grid gap-4 sm:grid-cols-2'>
              {filteredRecipes.map((recipe) => {
                const selected = selectedIds.includes(recipe.id);
                const ratio = availabilityFor(recipe, pantry);
                return (
                  <button
                    key={recipe.id}
                    type='button'
                    onClick={() => toggleRecipe(recipe.id)}
                    className={`overflow-hidden rounded-2xl border text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                      selected ? 'border-brand-500 ring-2 ring-brand-100' : 'border-slate-200'
                    }`}
                  >
                    {recipe.imageUrl && (
                      <img src={recipe.imageUrl} alt='' className='h-36 w-full object-cover' />
                    )}
                    <div className='p-4'>
                      <div className='flex items-start justify-between gap-3'>
                        <h3 className='font-bold text-slate-900'>{recipe.title}</h3>
                        {selected && (
                          <span className='rounded-full bg-brand-600 p-1 text-white'>
                            <Check className='h-4 w-4' />
                          </span>
                        )}
                      </div>
                      <p className='mt-2 line-clamp-2 text-sm text-slate-500'>
                        {recipe.description}
                      </p>
                      {pantry.size > 0 && (
                        <span className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                          availabilityClasses(ratio)
                        }`}>
                          {availabilityLabel(ratio)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6'>
            <div className='flex items-center gap-2'>
              <ShoppingCart className='h-6 w-6 text-brand-600' />
              <h2 className='text-2xl font-bold text-slate-900'>Shopping list</h2>
            </div>
            <p className='mt-1 text-sm text-slate-500'>
              Combined ingredients from your selected recipes.
            </p>

            {selectedRecipes.length === 0 ? (
              <div className='mt-8 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500'>
                Select one or more recipes to build your list.
              </div>
            ) : (
              <>
                <div className='mt-5 space-y-2'>
                  {Array.from(
                    selectedRecipes
                      .flatMap((recipe) => recipe.ingredients)
                      .reduce((map, ingredient) => {
                        const key = normalize(ingredient.name);
                        const existing = map.get(key);
                        if (existing) existing.amounts.push(ingredient.amount);
                        else map.set(key, { name: ingredient.name, amounts: [ingredient.amount] });
                        return map;
                      }, new Map<string, { name: string; amounts: string[] }>())
                      .entries(),
                  ).map(([key, ingredient]) => (
                    <label key={key} className='flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-slate-50'>
                      <input
                        type='checkbox'
                        checked={checked.has(key)}
                        onChange={() => toggleIngredient(ingredient.name)}
                        className='mt-1 h-4 w-4 rounded border-slate-300 text-brand-600'
                      />
                      <span className={checked.has(key) ? 'text-slate-400 line-through' : 'text-slate-700'}>
                        <strong>{ingredient.amounts.join(' + ')}</strong> {ingredient.name}
                      </span>
                    </label>
                  ))}
                </div>
                <div className='mt-5 grid grid-cols-2 gap-2'>
                  <button
                    type='button'
                    onClick={copyList}
                    className='flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white hover:bg-slate-700'
                  >
                    <Clipboard className='h-4 w-4' />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    type='button'
                    onClick={downloadMarkdown}
                    className='flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-brand-700'
                  >
                    <Download className='h-4 w-4' />
                    Export .md
                  </button>
                </div>
              </>
            )}
          </section>
        </div>

        <section className='mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <h2 className='text-2xl font-bold text-slate-900'>What can I make?</h2>
              <p className='mt-1 text-sm text-slate-500'>
                Enter ingredients you already have, separated by commas or new lines.
              </p>
            </div>
            <div className='flex gap-2 text-xs font-medium'>
              <span className='rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-800'>All</span>
              <span className='rounded-full bg-yellow-100 px-2.5 py-1 text-yellow-800'>Most</span>
              <span className='rounded-full bg-orange-100 px-2.5 py-1 text-orange-800'>Some</span>
              <span className='rounded-full bg-red-200 px-2.5 py-1 text-red-900'>None</span>
            </div>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            {ingredientTags.map(([key, ingredient]) => {
              const active = pantry.has(key);
              return (
                <button
                  key={key}
                  type='button'
                  onClick={() => togglePantryTag(ingredient)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:bg-brand-50'
                  }`}
                >
                  {ingredient}
                </button>
              );
            })}
            {pantry.size > 0 && (
              <button
                type='button'
                onClick={clearPantry}
                className='rounded-full px-3 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-100'
              >
                Clear all
              </button>
            )}
          </div>

          <textarea
            value={pantryText}
            onChange={(event) => setPantryText(event.target.value)}
            placeholder='beef, soy sauce, garlic, rice, eggs...'
            rows={3}
            className='mt-4 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
          />

          <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {[...recipes]
              .sort((a, b) => availabilityFor(b, pantry) - availabilityFor(a, pantry))
              .map((recipe) => {
                const ratio = availabilityFor(recipe, pantry);
                return (
                  <article
                    key={recipe.id}
                    className={`rounded-2xl border p-4 transition ${
                      pantry.size ? availabilityClasses(ratio) : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <h3 className='font-bold'>{recipe.title}</h3>
                      <span className='whitespace-nowrap rounded-full bg-white/70 px-2 py-1 text-xs font-bold'>
                        {pantry.size ? availabilityLabel(ratio) : 'Add pantry items'}
                      </span>
                    </div>
                    <div className='mt-3 h-2 overflow-hidden rounded-full bg-white/70'>
                      <div
                        className='h-full rounded-full bg-current transition-all'
                        style={{ width: `${ratio * 100}%` }}
                      />
                    </div>
                    {pantry.size > 0 && (
                      <p className='mt-2 text-xs'>
                        {recipe.ingredients.filter((ingredient) => {
                          const name = normalize(ingredient.name);
                          return [...pantry].some(
                            (item) => item === name || item.includes(name) || name.includes(item),
                          );
                        }).length}{' '}
                        of {recipe.ingredients.length} ingredients available
                      </p>
                    )}
                  </article>
                );
              })}
          </div>
        </section>
      </div>
    </main>
  );
};
