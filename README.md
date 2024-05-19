# Crayond's Monorepo Boilerplate - TS

This repository serves as a complete boilerplate for setting up a monorepo project with the help of **TurboRepo**, a powerful tool for managing monorepositories. The boilerplate comes pre-configured with a set of best practices for organizing code, managing dependencies, and building multiple packages or modules within a single repository, all while using TypeScript as the primary programming language and other essential tooling already set up for a seamless development experience.

## What's inside?

This boilerplate includes the following packages/apps:

### Apps

- `react-vite-web`: A [Vite](https://vitejs.dev/) powered react typescript app

### Packages

- `alias`: An alias package for absolute import that creates custom aliases for directories, allowing for shorter and more readable import statements in code.
- `env-config` - A package that enables dynamic loading of environment variables based on the current environment.
- `eslint-config-custom` - A package with typescript-eslint that allows you to customize and extend ESLint configurations for TypeScript projects, promoting code quality and early error detection.
- `logger`: isomorphic logger (a small wrapper around console.log) with sentry as optional.
- `routes`: A routes package provides centralized management of app routes
- `ui`: A package with storybook configuration to create library of reusable UI components.
- `theme`: A theme package provides customizable Material-UI theme settings for both light and dark modes to create a consistent and visually appealing design system.
- `tsconfig`: tsconfig.json;s used throughout the monorepo.
- `store`: A store package for global state management using zustand simplifies complex state management in applications by leveraging zustand's modularity.
- `utils`: A utils package provides a some helper functions, constants, and reusable API functions, which you can customize and extend.

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/) except `alias` and `eslint-config-custom`.

### Utilities

This boilerplate has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Storybook](https://storybook.js.org/docs/react/get-started/install) for component documentation
- [Husky](https://typicode.github.io/husky/#/) for creating pre-commit hook
- [Lint-Staged](https://github.com/okonet/lint-staged) - To run linters against staged git files
- [Plop](https://plopjs.com/) for code generation
- [czg](https://cz-git.qbb.sh/cli/) for generating standardized git commit messages

## Using this boilerplate

### Cloning

To get started with this boilerplate, you can clone the repository using the following command:

```sh
git clone https://gitlab.com/crayond_knowledge_repo/monorepos/ts/turbo-monorepo-boilerplate-ts.git
```

Once you have cloned the repository,

Rename the folder as you want and navigate to the root directory.

Remove the git from the current boilerplate by using the following command:

```sh
rm -rf .git
```

Then initialize Git and add your remote origin by using the following commands:

```sh
git init
```

```sh
git remote add <remote-name> <remote-url>
```

Then install the required dependencies using the following command:

```sh
npm i
```

Now you can run this boilerplate using the below scripts

### Scripts

This boilerplate includes a set of pre-configured scripts that can be used to **build**, **lint**, **format** and **run** the project. The available scripts are:

- `dev` - starts a development server for all the apps and packages that have a `dev` script defined.
- `build` - builds all the apps and packages that have a `build` script defined.
- `dev:production` - starts a development server in a production mode for all the apps and packages that have the script defined. This command uses the `.env.production` environment variables.
- `dev:staging` - starts a development server in a staging mode for all the apps and packages that have the script defined. This command uses the `.env.staging` environment variables.
- `build:development` - builds all the apps and packages in a production mode that have the script defined.This command uses the `.env.development` environment variables.
- `build:staging` - builds all the apps and packages in a staging mode that have the script defined.This command uses the `.env.staging` environment variables.
- `build:storybook` - builds the Storybook UI components documentation site in the `packages/ui`.
- `preview` - After running the build command, Vite will output the built application in a dist directory. This script can be used to preview the output of the build command of all the apps that have the script defined.
- `lint` - runs the linter for all the apps and packages that have a `lint` script defined.
- `format` - formats all the typeScript and Markdown files using Prettier.
- `clean:root` - removes the node_modules directory from the root of the project.
- `clean` - removes the node_modules directory from all the apps and packages that have a `clean` script defined.
- `plop` - starts the Plop code generator to create new components and packages.
- `prepare` - installs the Husky Git hooks for linting and formatting on commit.

(NOTE: In vite, By default, the dev server (dev command) runs in development mode and the build command runs in production mode. This means when running `vite build`, it will load the env variables from .env.production)

## Useful Links

Learn more:

- [Turborepo](https://turbo.build/repo/docs)
- [Storybook](https://storybook.js.org/docs/react/get-started/install)
- [Vite](https://vitejs.dev/)

## Authors

- [@vardhmanbaid](https://github.com/vardhmanbaid)

(Kindly update it if you contributed to this boilerplate)

## Feedback

If you have any feedback, please reach out to the authors

## Contributing

Contributions are always welcome!
