export const BTLFLD_ENMY_WIDTH   = 4;
export const BTLFLD_PLYR_WIDTH   = 2;
export const ROWS_NUM            = 3;
export const BTLFLD_MAX_ENMY_POS = BTLFLD_ENMY_WIDTH * ROWS_NUM;
export const BTLFLD_MAX_PLYR_POS = BTLFLD_PLYR_WIDTH * ROWS_NUM;

// cell occupation cases
export const BTLFLD_CELL_EMPTY = 0;
export const BTLFLD_CELL_ENEMY = 1;
export const BTLFLD_CELL_PLAYR = 2;
export const BTLFLD_ROW = [].concat.apply([], [
  0, Array(BTLFLD_ENMY_WIDTH).fill(1), 0, 0, 0, Array(BTLFLD_PLYR_WIDTH).fill(2), 0
]);
