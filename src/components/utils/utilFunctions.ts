// export function cloneArray(items: any) { 
//     items.map((item: any) => Array.isArray(item) ? cloneArray(item) : item)
// }

export const cloneArray = (items: any) => items.map((item: any) => Array.isArray(item) ? cloneArray(item) : item);