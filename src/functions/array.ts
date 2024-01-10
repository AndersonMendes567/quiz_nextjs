export function embaralhar(elementos: any[]) {
  return elementos.map(item=> ({ id: item, aleatorio: Math.random() }))
    .sort((a, b)=> a.aleatorio - b.aleatorio)
    .map(item=> item.id)
}