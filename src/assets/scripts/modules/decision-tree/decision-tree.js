const createDecisionTree = ({ decisionTree }) => {
  Vue.createApp({
    data: () => ({
      options: [],
      choices: [],
      choicePreamble: '',
      resultPreamble: '',
    }),

    methods: {
      addChoice(option, targetSlug) {
        // If we already have a selection for this option,
        // we need to clear all selections after it
        if (option.selection) {
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
      },
    },

    created() {
      this.options = decisionTree.branches;
      this.choicePreamble = decisionTree.choicePreamble;
      this.resultPreamble = decisionTree.resultPreamble;
      this.choices = [this.options[0].slug];
    },
  }).mount(`#ID-${ decisionTree.id }`);
}

window.createDecisionTree = window.createDecisionTree || createDecisionTree;
