// Converts a word to camel case
const toCamelWord = (word, idx) =>
  idx === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

// Converts a string to camel case
const toCamelCase = (text) =>
  text
    .split(/[_-\s]+/)
    .map(toCamelWord)
    .join('');

module.exports = function (plop) {
  // Helper function to determine the directory path based on the component type and app name
  plop.addHelper('directory', (type, appName, compName) => {
    if (type === 'atom') {
      return `packages/ui/${type}s/${toCamelCase(compName)}`;
    }
    if (type === 'component' && !appName) {
      return `packages/ui/${type}s/${toCamelCase(compName)}`;
    }
    if (type === 'component' && appName) {
      return `packages/ui/${type}s/${appName}/${toCamelCase(compName)}`;
    }
  });

  // Helper function to determine the story file name based on the component name
  plop.addHelper('storyName', (comp) => `${toCamelCase(comp)}.stories.tsx`);

  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new component',
    // Prompts for the component type, name, and other options
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What do you want to create?',
        choices: ['atom', 'component'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of it?',
        validate: function (name) {
          if (name.trim().length === 0) {
            return 'Name is required';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'isForwardRef',
        message: 'Do you want to add forward ref?',
        default: false,
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'Is it a common component or app specific?',
        choices: ['common', 'app'],
        default: 'common',
        when(answers) {
          return answers.type === 'component';
        },
      },
      {
        type: 'input',
        name: 'appName',
        message: 'name of the app?',
        when(answers) {
          return answers.componentType === 'app';
        },
        validate: function (appName) {
          if (appName.trim().length === 0) {
            return 'App Name is required';
          }
          return true;
        },
      },
    ],
    // Actions to perform after the prompts are completed
    actions: () => {
      return [
        {
          // Create the component file
          type: 'add',
          path: '{{directory type appName name}}/index.tsx',
          templateFile: 'plop-templates/component/component.hbs',
        },
        {
          // Create the story file
          type: 'add',
          path: '{{directory type appName name}}/{{storyName name}}',
          templateFile: 'plop-templates/component/story.hbs',
        },
        {
          // Create the style file
          type: 'add',
          path: '{{directory type appName name}}/style.ts',
          templateFile: 'plop-templates/component/style.hbs',
        },
        {
          // Append the export of the component to the atoms/components index file
          type: 'append',
          description: 'Appends the export of atom/component to the atoms/components index',
          path: 'packages/ui/{{type}}s/index.tsx',
          templateFile: 'plop-templates/component/export.hbs',
        },
      ];
    },
  });

  // Package generator
  plop.setGenerator('package', {
    description: 'Create a new package',
    // Prompts for the package name and other options
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your package?',
        validate: function (name) {
          if (name.trim().length === 0) {
            return 'Name is required';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'isLibBuild',
        message: 'Do you want to enable library build?',
        default: false,
      },
    ],
    // Actions to perform after the prompts are completed
    actions: (data) => {
      const actions = [
        {
          // Create the package index file
          type: 'add',
          path: 'packages/{{camelCase name}}/index.ts',
          templateFile: 'plop-templates/package/index.hbs',
        },
        {
          // Create the ESLint configuration file
          type: 'add',
          path: 'packages/{{camelCase name}}/.eslintrc.js',
          templateFile: 'plop-templates/package/eslint.hbs',
        },
        {
          // Create the TypeScript configuration file
          type: 'add',
          path: 'packages/{{camelCase name}}/tsconfig.json',
          templateFile: 'plop-templates/package/tsconfig.hbs',
        },
        {
          // Create the package.json file
          type: 'add',
          path: 'packages/{{camelCase name}}/package.json',
          templateFile: 'plop-templates/package/packageJson.hbs',
        },
      ];
      if (data.isLibBuild === true) {
        // Create the tsup configuration file and .gitignore file if library build is enabled
        actions.push({
          type: 'add',
          path: 'packages/{{camelCase name}}/tsup.config.ts',
          templateFile: 'plop-templates/package/tsupconfig.hbs',
        });
        actions.push({
          type: 'add',
          path: 'packages/{{camelCase name}}/.gitignore',
          templateFile: 'plop-templates/package/gitignore.hbs',
        });
      }
      return actions;
    },
  });
};
