# 🚀 Parcel UI

[![Build Status](https://travis-ci.org/ngduc/parcelui.svg?branch=master)](https://travis-ci.org/ngduc/parcelui)

Parcel + Typescript + React + Router + CSS Modules + SASS + Jest

And more:

- Lazy loading (code splitting) for a page (Route).
- CSS scoping using CSS Modules: just import a local CSS or SASS file and use it.
- Store management with react-easy-state (easier than Redux, MobX).
- Component unit testing with Jest & Enzyme.

### 🔧 Installation

Clone this project:

```
git clone https://github.com/ngduc/parcelui.git your-app
cd your-app
rm -rf .git
yarn
```

- Update `package.json` with your information.
- Run `yarn dev` then open http://localhost:1234/

### ⚙️ Commands

```
yarn build      build for PROD to static directory ./dist
yarn dev        launch DEV mode takes 1.4s (tsc watch, auto reload)
yarn dev:test   run jest --watch (auto run test files)
```

### CSS

- SCSS is recommended, but optional. You can also use ".css" files normally.

### Others

Recommend:

- VSCode & prettier addon

<img src="tools/dev.jpg">
