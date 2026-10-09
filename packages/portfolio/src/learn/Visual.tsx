import { Art } from "./Art";
import { animals } from "./content";
import type { Item } from "./content";

export function Visual({ item }: { item: Item }) {
  return item.image ? (
    <img
      className={`animal-photo ${item.art}`}
      src={item.image}
      alt=""
      draggable={false}
    />
  ) : (
    <Art kind={item.art} color={item.color} />
  );
}
export function CategoryArt({ kind }: { kind: string }) {
  return kind === "animals" ? (
    <div className="animal-preview" aria-hidden="true">
      <Visual item={animals[0]} />
      <Visual item={animals[1]} />
    </div>
  ) : (
    <Art kind={kind} />
  );
}
