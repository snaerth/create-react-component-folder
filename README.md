# Create React Component folder

[![NPM version](https://img.shields.io/npm/v/create-react-component-folder.svg?style=flat)](https://npmjs.com/package/create-react-component-folder)
[![NPM downloads](https://img.shields.io/npm/dm/create-react-component-folder.svg?style=flat)](https://npmjs.com/package/create-react-component-folder)

## About

Create React Component folder works on macOS, Windows, and Linux.<br>
It creates **React** or **React Native** component folder structure with one command.<br>
There is also support for Typescript, React Native, Less and Sass.

## Quick Overview

```sh
$ npm install --save-dev create-react-component-folder
$ npx crcf myComponent
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://github.com/snaerth/create-react-component-folder/blob/master/docs/npx_instructions.md))_

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/crcf_video.svg' width='600' alt='npx crcf myComponent'>
</p>

## Tutorial

[Read the artice on Medium](https://medium.com/@snrseljanroddsson/create-multiple-react-folder-components-in-one-command-1411cd6bd1ce)

## Installation

```sh
$ npm install --save-dev create-react-component-folder
```

## Creating single component

```sh
$ npx crcf myComponent
$ npx crcf components/myComponent
```

## Output single

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/single2.png?raw=true' width='600' />
</p>

## Creating multiple components

```sh
$ npx crcf components/header footer button navigation
```

## Output multiple

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/multiple2.png?raw=true'  width='600' />
</p>

## Component folder structure

```sh
myComponent
├── index.js
├── myComponent.js
├── myComponent.css
├── myComponent.test.js
```

### if story book is enable

```sh
myComponent
├── index.js
├── myComponent.js
├── myComponent.css
├── myComponent.test.js
├── myComponent.stories.js
```

## Set default config

There is support for setting default config options, so you only have to set you desired config once. This makes creating your components even easier. All you have to do is follow one of these three options.

In your package.json, add a **"crcf"** property key with array of default config options

"stories" is to enable story book component

"spec" to have the file extensions

```sh
"crcf": [
  "scss",
  "proptypes",
  "stories",
  "spec"
]
```

Create a rc file named **.crcfrc** in the root of your project and insert a array of default config options in that file

```sh
[
  "scss",
  "proptypes",
  "stories"
]
```

Create a config file named **.crcf.config.js** in the root of your project and insert a array of default config options

```sh
[
  "scss",
  "proptypes"
  "stories"
]
```

So now all you have to do is type **npx crcf componentName** and you will get all your default options when you create a component or multiple components. Here below you can see all the options.

```sh
[
  "typescript",
  "scss",
  "less",
  "nocss",
  "notest",
  "reactnative",
  "createindex",
  "uppercase",
  "jsx",
  "proptypes",
  "stories",
  "nosemi",
  "cssmodules",
]
```

## Creating index.js file for multiple component imports

```sh
$ npx crcf --createindex
```

## Output in index.js file for multiple component imports

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/index2.png?raw=true' width='600'/>
</p>

## Options

```sh
$ npx crcf --help

  Usage: index [options]

  Options:

    -V, --version     output the version number
    --typescript      Creates Typescript component and files
    --nocss           No css file
    --notest          No test file
    --cssmodules       Creates css/less/scss file with .module extensions. Example 
    --reactnative     Creates React Native components
    --createindex     Creates index.js file for multple component imports
    -f, --functional  Creates React stateless functional component
    -j, --jsx         Creates the component file with .jsx extension
    -l, --less        Adds .less file to component
    -s, --scss        Adds .scss file to component
    -p, --proptypes   Adds prop-types to component
    -u, --uppercase   Component files start on uppercase letter
    -h, --help        output usage information
    -sb, --stories    Add Storie file to component
    -ns, --nosemi     No semicolons
```

## Author

- [Snær Seljan Þóroddsson](https://github.com/snaerth)

## License

MIT
