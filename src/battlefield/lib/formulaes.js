// battle formulaes

/**
 * default range = [0,1]
 *
 * @param  {Number} [min=1] [description]
 * @param  {Number} max     [description]
 * @return {integer}
 */
const randomRange = (min=1, max) => (
  !max ? (max=min, min=0) : '',
  Math.random() * (max - min + 1) + min^0
);

/* conditions TODO TBI */

/**
 * TODO: TBI
 * @return {boolean} [description]
 */
export const checkWhetherTotalHitIsHappen = (obj, subj) => {
  const rnd = randomRange(1, 100);
  return rnd > 50;
};

/**
 * TODO: TBI
 * @return {boolean} [description]
 */
export const checkWhetherLuckyHitIsHappen = (obj, subj) => {
  const rnd = randomRange(1, 100);
  return rnd > 50;
};

/**
 * TODO: TBI
 * @return {boolean} [description]
 */
export const checkWhetherEvadeIsHappen = (obj, subj) => {
  const rnd = randomRange(1, 100);
  return rnd > 50;
};

/**
 * TODO: TBI
 * @return {boolean} [description]
 */
export const checkWhetherLuckyEvadeIsHappen = (obj, subj) => {
  const rnd = randomRange(1, 100);
  return rnd > 50;
};

/**
 * TODO: TBI
 * @return {boolean} [description]
 */
export const checkWhetherMissIsHappen = (obj, subj) => {
  const rnd = randomRange(1, 100);
  return rnd > 50;
};

/* 1. Physical attack odds */

/**
 * Физическая атака
 *
 * Hit% = ([Attacker's Dex / 4] + At%) + Attacker's Df% - Target's Df%
 *
 * @param  {battler} obj  Actioner
 * @param  {battler} subj Subject
 * @return {number}      [description]
 */
export const hitOdds = (obj, subj) => {
  const atkOdds = obj.weapon.attBonus;
  const defOdds = subj.vit + subj.armour.def;

  return (obj.dex / 4) + atkOdds - subj.defOdds;
};

/**
 * [evadeOdds description]
 *
 * Evade Chance = ([Target's Lck / 4] - [Attacker's Lck / 4])%
 *
 * @param  {battler} obj  Actioner
 * @param  {battler} subj Subject
 * @return {number}      [description]
 */
export const evadeOdds = (obj, subj) => {
  return (subj.Luck / 4) - (obj.Luck);
};

/**
 * is physical attack happen?
 *
 * @param  {battler} obj  Actioner
 * @param  {battler} subj Subject
 * @return {[int, int]}      range of effect in HP points
 * @return {string}      [description]
 */
export const isPatkHappen = (obj, subj) => {
  if (randomRange(1, 65535) < hitOdds(obj, subj)) {
    return 'hithappen';
  } else {
    if (autohit()) {
      return 'autohit';
    }
  }
}

/**
 * is magic attack happen?
 *
 * @param  {battler} obj  Actioner
 * @param  {battler} subj Subject
 * @return {string}      [description]
 */
export const isMatkHappen = (obj, subj) => {
  if (randomRange(1, 65535) < hitOdds(obj, subj)) {
    return 'hithappen';
  } else {
    if (autohit()) {
      return 'autohit';
    }
  }
}

//      1.3 Критическая атака
export const isCritHappen = (obj, subj) => {
}

//      1.4 Статусная атака
export const isStatusHappen = (obj, subj) => {
}

/* 2. Рассчет атаки */

// export const

/**
 * 2.1 Физическая атака
 *
 * Base Damage = Att + [(Att + Lvl) / 32] * [(Att * Lvl) / 32]
 * Damage = [(Power * (512 - Def) * Base Damage) / (16 * 512)]
 *
 * @param  {battler} obj  Actioner
 * @param  {battler} subj Subject
 * @return {[int, int]}      range of effect in HP points
 */
export const pdmg = (obj, subj) => {
  const att = obj.str  + obj.weapon.attBonus;
  const def = subj.str + obj.armour.def;

  const dmg_base = att + ((att + obj.Lvl) / 32) * ((att * obj.Lvl) / 32);
  const dmb_grad = (obj.Power * (512 - def) * dmg_base) / (16 * 512);
  return [dmg_base, dmb_grad];
}

/**
 * 2.2 Магическая атака
 *
 * Base Damage = 6 * (MAt + Lvl)
 * Damage = [(Power * (512 - MDf) * Base Damage) / (16 * 512)]
 *
 * @param  {battler} obj  Actioner
 * @param  {battler} subj Subject
 * @return {[int, int]}      range of effect in HP points
 */
export const mdmg = (obj, subj) => {
  const dmg_base = 6 * (MAt + Lvl);
  const dmb_grad = (Power * (512 - MDf) * dmg_base) / (16 * 512);
  return [dmg_base, dmb_grad];
}

/**
 * 2.3 Лечение
 *
 * Base Damage = 6 * (MAt + Lvl)
 * Damage = Base Damage + 22 * Power
 *
 * @param  {battler} obj  Actioner
 * @param  {battler} subj Subject
 * @return {[int, int]}      range of effect in HP points
 */
export const cure = (obj, subj) => {
  const dmg_base = 6 * (MAt + Lvl);
  const dmb_grad = dmg_base + 22 * Power;
  return [dmg_base, dmb_grad];
}

/**
 * 2.4 Вещи
 *
 * Base Damage = 16 * Power
 * Damage = [Base Damage * (512 - Def) / 512]
 *
 * @param  {battler} obj  Actioner
 * @param  {battler} subj Subject
 * @return {[int, int]}      range of effect in HP points
 */
export const item = (obj, subj) => {
  const dmg_base = 16 * Power;
  const dmb_grad = dmg_base * (512 - Def) / 512;
  return [dmg_base, dmb_grad];
}

//      2.5 Другие формулы

//      2.6 Модификаторы формул

export const Damage = (dmg) => {
  return dmg * (3841 + randomRange(0, 255)) / 4096;
}
