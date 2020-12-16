console.log('hi from decision tree ;)');

// const $app = document.querySelector('#decision-tree-app');
// console.log($app.dataset);
const app = Vue.createApp({});

const DecisionTree = {
  template: '#decision-tree-template',

  props: {
    treeData: {
      required: true,
    },
  },

  data: () => ({
    options: [],
    choices: [],
  }),

  methods: {
    addChoice(option, targetSlug) {
      console.log(targetSlug);
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
        // @HERE!!
      }

      option.selection = targetSlug;
      this.choices = [...this.choices, targetSlug];
    },
  },

  created() {
    this.options = this.treeData.decisionTree.branches;
    this.choices = [this.options[0].slug];
  },
};

app.component('decision-tree', DecisionTree);

app.mount('#decision-tree-app');
