console.log('hi from decision tree ;)');

const DecisionTree = {
  data: () => ({
    options: [
      {
        slug: 'tree_start',
        isEndPoint: false,
        content:
          "Ik wil inzicht krijgen in de chemische kwaliteit van mijn water en de risico's van stoffen voor mens en/of milieu.",
        choices: [
          {
            content:
              'A: Ik heb informatie over concentraties van een groot aantal chemische stoffen in mijn water.',
            pointsToSlug: 'has_substance_info',
          },
          {
            content:
              'B: Ik heb informatie over meerdere bioassay effectmetingen in mijn water',
            pointsToSlug: 'has_bioassay_info',
          },
          {
            content:
              'C: Ik heb weinig/geen informatie over concentraties van chemische stoffen en bioassay effectmetingen in mijn water.',
            pointsToSlug: 'has_no_info',
          },
        ],
      },
      {
        slug: 'has_substance_info',
        isEndPoint: false,
        content: null,
        choices: [
          {
            content:
              'Ik heb alle mogelijke bronnen van verontreiniging in beeld en weet de concentraties van de relevante stoffen.',
            pointsToSlug: 'action_risk_analysis',
          },
          {
            content:
              'Ik heb meer informatie nodig over mogelijke bronnen van verontreiniging en risico’s van relevante stoffen.',
            pointsToSlug: 'choice_aid_substances',
          },
        ],
      },
      {
        slug: 'choice_aid_substances',
        isEndPoint: false,
        content: 'Keuzehulp (KCM)',
        choices: [
          {
            content: 'Modelstudie naar bronnen en verspreiding',
            pointsToSlug: 'action_model_study_source_and_spread',
          },
          {
            content: 'Non-target screening met chemische analyses',
            pointsToSlug: 'action_non_target_screening',
          },
          {
            content: 'Effectmetingen met bioassays',
            pointsToSlug: 'action_continue_bioassays',
          },
        ],
      },
      {
        slug: 'action_risk_analysis',
        isEndPoint: true,
        content:
          'Milieu => msPAF risicoanalyse Humaan => mengseltox-model mens of model zuiveringsinspanning?',
        choices: null,
      },
    ],
    choices: ['tree_start'],
  }),

  methods: {
    addChoice(option, pointsToSlug) {
      // If we already have a selection for this option,
      // we need to clear all selections after it
      if (option.selection) {
        // If the selection is the same, do nothing
        if (option.selection === pointsToSlug) {
          return;
        }
        const index = this.choices.findIndex(slug => slug === option.slug);
        const leftArray = this.choices.slice(0, index + 1);
        // const rightArray = this.choices.slice(index + 1);
        this.choices = leftArray;
      }

      option.selection = pointsToSlug;
      this.choices = [...this.choices, pointsToSlug];
    },
  },
};

Vue.createApp(DecisionTree).mount('#decision-tree-app');
