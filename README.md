# React Template
This TypeScript based template is designed to get you up and running with a bunch of awesome front-end technologies.

The primary goal of this project is to provide a stable foundation upon which to build modern web applications. Its purpose is not to dictate your project structure or to demonstrate a complete real-world application, but to provide a set of tools intended to make front-end development robust, easy, and, most importantly, fun.

## Micro Frontends
Good frontend development is hard. Scaling frontend development so that many teams can work simultaneously on a large and complex product is even harder. In [this](https://martinfowler.com/articles/micro-frontends.html) article we'll describe a recent trend of breaking up frontend monoliths into many smaller, more manageable pieces, and how this architecture can increase the effectiveness and efficiency of teams working on frontend code. As well as talking about the various benefits and costs, we'll cover some of the implementation options that are available, and we'll dive deep into a full example application that demonstrates the technique.

## Tips & Tricks
- [favicon generator](https://www.favicon-generator.org/)
- compression
  - SVG: [SVGO](https://github.com/svg/svgo) or [SVGOMG](https://jakearchibald.github.io/svgomg/)
  - [PNG & JPEG](https://tinypng.com/)
  - [fonts](https://www.fontsquirrel.com/tools/webfont-generator)
- [10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)
- redux
  - [recipes](https://redux.js.org/recipes/recipe-index)
  - [style guide](https://redux.js.org/style-guide/style-guide)
  - [redux toolkit](https://redux.js.org/redux-toolkit/overview)
- [TypeScript docs](https://www.typescriptlang.org/docs/)
- [end-to-end testing](https://www.cypress.io/)
- [organized & efficient UI](https://storybook.js.org/)
- [react cheatsheet](https://dev.to/codeartistryio/the-react-cheatsheet-for-2020-real-world-examples-4hgg)
- [one option of `./src` architecture](https://www.robinwieruch.de/react-folder-structure)
- Git Hooks
  - [husky](https://github.com/typicode/husky)
  - [lint-staged](https://github.com/okonet/lint-staged)

## Features
- support for `.css` & `.js` files
- TypeScript
- Normalize.css
- styled-components
- browserslist
- ESLint
- Prettier
- stylelint (supports styled-components)
- Babel
- webpack
  - code splitting (css & js)
  - tree shaking
  - terser
  - zopfli/brotli/gzip
- Jest & React Testing Library
- optional libraries
  - styled-media-query
  - @reduxjs/toolkit
  - polished
  - js-cookie
  - axios
  - @loadable/component (enable code splitting)

## Important note
All your npm packages from `dependencies` must be the same version across all you react-micro-frontends repositories.

## Installation
Create `.env` file on the root of the project.
```
MICROFRONTEND_NAME=ROOT
REPOSITORY_1_HOST=http://localhost:3001
REPOSITORY_2_HOST=http://localhost:3002
```

Install the project dependencies.
```bash
$ npm i
```

We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd). Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn't require installing any packages in your project.

## Running the Project
After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ npm run start  # Start the development server
```

While developing, you will probably rely mostly on `npm run start` however, there are additional scripts at your disposal:

|`npm run <script>` |Description|
|-------------------|-----------|
|`build`            |Build prod app to ./build|
|`lint:css`         |Lint the project for potential errors|
|`lint:css:fix`      |Lint the project and fixes all correctable errors|
|`lint:js`          |Lint the project for potential errors|
|`lint:js:fix`       |Lint the project and fixes all correctable errors|
|`start`            |Serve your dev app at `localhost:3000`|
|`start:prod`       |Serve your prod app at `localhost:8080`|
|`test`             |Run unit tests with Jest|
|`test:watch`       |Run `test` in watch mode to re-run tests when changed|
|`test:coverage`    |Generate information about coverage to ./coverage|

## Testing
To add a unit test, create a `.spec.tsx` or `.test.tsx` file anywhere inside of `./src`. Jest and webpack will automatically find these files.
