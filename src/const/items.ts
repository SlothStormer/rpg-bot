/**
 * Estructura de armas
 * id: Numero identificador
 * type: Tipo de objeto
 * name: Nombre
 * dmg: Daño fisico
 * mdmg: Daño magico
 * def: Defensa
 * mdef: Defensa magica
 * agi: Agilidad
 * pcrit: Probabilidad de critico
 * mana: Mana
 * suerte: Suerte
 */

export const EQUIPMENT = [
  {
    id: "e1",
    type: "weapon",
    name: "Espada de entrenamiento",
    dmg: 5,
    mdmg: 0,
    def: 0,
    mdef: 0,
    agi: 0,
    pcrit: 0,
    mana: 0,
    suerte: 0,
  },
  {
    id: "e2",
    type: "weapon",
    name: "Hacha de leñador",
    dmg: 10,
    mdmg: 0,
    def: 0,
    mdef: 0,
    agi: 0,
    pcrit: 0,
    mana: 0,
    suerte: 0,
  },
  {
    id: "e3",
    type: "weapon",
    name: "Cuchillo de caza",
    dmg: 7,
    mdmg: 0,
    def: 0,
    mdef: 0,
    agi: 0,
    pcrit: 0,
    mana: 0,
    suerte: 0,
  },
  {
    id: "e4",
    type: "weapon",
    name: "Arco corto",
    dmg: 8,
    mdmg: 0,
    def: 0,
    mdef: 0,
    agi: 0,
    pcrit: 0,
    mana: 0,
    suerte: 0,
  },
] as const;

export const CONSUMABLES = [
  {
    id: "c1",
    type: "consumable",
    name: "Pocion de vida",
    heal: 10,
  },
] as const;
