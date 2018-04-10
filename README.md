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
$ npx crcf nested/myComponent
```

## Output single

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/single.png?raw=true' />
</p>

## Creating multiple components

```sh
$ npx crcf components/header footer button navigation
```

## Output multiple

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/multiple.png?raw=true' />
</p>

## Component folder structure

```sh
myComponent
├── index.js
├── myComponent.js
├── myComponent.css
├── myComponent.test.js
```

## Creating index.js file for multple component imports

```sh
$ npx crcf --createindex
```

## Output in index.js file for multple component imports

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/index.png?raw=true' />
</p>

## Options

```sh
$ npx crcf --help

Options
--------------
    -V, --version    output the version number
    --typescript     Creates Typescript component and files
    --reactnative    Creates React Native component and files
    --nocss          No css file
    --notest         No test file
    --createindex    Creates index.js file for multple component imports
    -l, --less       Adds .less file to component
    -s, --sass       Adds .sass file to component
    -p, --proptypes  Adds prop-types to component
    -u, --uppercase  Component files start on uppercase letter
    -h, --help       output usage information
```

## Author

* [Snær Seljan Þóroddsson](https://github.com/snaerth)

## License

MIT
