/**
 * Function preSelectBranches
 *
 * Based on pre-selected choices, will add a `selection` property to
 * the branch object with the selected choice as its value
 *
 * @param {Array.<Object>} branches
 * @param {Array.<String>} choices
 * @returns {Array.<Object>}
 */

export const preSelectBranches = (branches, choices) => branches.map(branch => {
  const _branch = { ...branch };
  if(choices.includes(_branch.slug)) {
    _branch.selection = choices.filter(choice => _branch.choices
      .map(({ targetSlug }) => targetSlug)
      .includes(choice))
      [0]
    ;
  }
  return _branch;
});


/**
 * Function indexToLetter
 *
 * Match an array index to a letter, starting with 0 = a.
 * Optionally capitalize with the `capitalize` Boolean
 *
 * @param {Number} index
 * @param {Boolean>} capitalize
 * @returns {String}
 */

export const indexToLetter = (index, capitalize = false) => {
  const letter = 'abcdefgh'.split('')[index];
  return capitalize ? letter.toUpperCase() : letter;
};
