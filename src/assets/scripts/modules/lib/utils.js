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


/**
 * Utility Object queryStringChoices
 *
 * Get or set the choices of a decision tree, based on a unique key
 */

export const queryStringChoices = {

  /**
   * Get the choices for a specific key
   *
   * @param {String} key
   * @returns {(String | undefined)}
   */

  get(key) {
    if(!('URLSearchParams' in window)) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const choices = params.get(key);
    if(!choices) return;
    const parsedChoices = decodeURIComponent(choices).split(',');
    if(parsedChoices && parsedChoices.length) return parsedChoices;
  },

  /**
   * Set the choices for a specific key
   *
   * @param {String} key
   * @param {Array.<String>} choices
   * @returns {(String | undefined)}
   */

  set(key, choices) {
    if(!('URLSearchParams' in window)) {
      return;
    }
    const params = new URLSearchParams(location.search);
    params.set(key, encodeURIComponent(choices));
    window.history.replaceState({}, '', `${ location.pathname }?${ params }`);
  }
};
