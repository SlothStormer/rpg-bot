/**
 * Estructura de zonas
 * id: Numero identificador
 * name: Nombre
 * isSafe: verdadero o falso
 */

export const ZONES = [
  { id: "z1", name: "Pueblo Inicial", value: "town_01", isSafe: true },
  {
    id: "z2",
    name: "Bosque Oscuro",
    value: "forest_01",
    isSafe: false,
    encounters: [
      ["m1", "m1", "m2"],
      ["m2", "m2", "m2"],
    ],
  },
  { id: "z3", name: "Cueva de los Goblins", value: "cave_01", isSafe: false },
  {
    id: "z4",
    name: "Castillo Abandonado",
    value: "castle_01",
    isSafe: false,
  },
] as const;
