import { preSelectBranches, indexToLetter } from '../lib/utils';

const createDecisionTree = ({ decisionTree }, locale) => {
  const { id, branches, choicePreamble, resultPreamble } = decisionTree;
  const STORAGE_KEY = `tree-${ id }`;

  const storedChoices = sessionStorage && sessionStorage.getItem(STORAGE_KEY);
  const parsedChoices = storedChoices && JSON.parse(storedChoices);
  const choices = parsedChoices || [ branches[0].slug ];
  const options = preSelectBranches(branches, choices);

  Vue.createApp({
    data: () => ({
      options,
      choices,
      choicePreamble,
      resultPreamble,
      locale,
    }),

    methods: {
      addChoice(option, targetSlug) {
        // If we already have a selection for this option,
        // we need to clear all selections after it
        if(option.selection) {
          // If the selection is the same, do nothing
          if (option.selection === targetSlug) {
            return;
          }
          const index = this.choices.findIndex(slug => slug === option.slug);
          const leftArray = this.choices.slice(0, index + 1);
          const rightArray = this.choices.slice(index + 1);

          // Jump back to new selection
          this.choices = leftArray;

          // Clear the 'removed' choices
          rightArray.forEach(slug => {
            const option = this.options.find(option => option.slug === slug);
            option.selection = null;
          });
        }

        option.selection = targetSlug;
        this.choices = [...this.choices, targetSlug];

        if(sessionStorage) {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.choices));
        }
      },

      indexToLetter,
    },
  }).mount(`#ID-${ id }`);
}

window.createDecisionTree = window.createDecisionTree || createDecisionTree;
