export const cloneArray = (items: any) =>
  items.map((item: any) => (Array.isArray(item) ? cloneArray(item) : item));
