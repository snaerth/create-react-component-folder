# create-react-component-folder

[![NPM version](https://img.shields.io/npm/v/create-react-component-folder.svg?style=flat)](https://npmjs.com/package/create-react-component-folder)
[![NPM downloads](https://img.shields.io/npm/dm/create-react-component-folder.svg?style=flat)](https://npmjs.com/package/create-react-component-folder)

## About

Creates **React** or **React Native** component folder structure with one command. There is support for Typescript, React Native, Less and Sass.
You can either use **crcf** or **create-react-component-folder**.
Read the artice on Medium

## Tutorial

[Read the artice on Medium](https://medium.com/@snrseljanroddsson/create-multiple-react-folder-components-in-one-command-1411cd6bd1ce)

## Example usage

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/crcf.svg?raw=true' />
</p>

## Install locally

When installed locally i.e. installed in your devDependencies (--save-dev).
Then prefix the command with **npx**, npx ships with npm from version >= v5.2.0.
Run this command from your project's root folder

```sh
npm install --save-dev create-react-component-folder
```

or with Yarn

```sh
yarn add -D create-react-component-folder
```

## Install globally

Run this command anywhere.

```sh
npm install -g create-react-component-folder
```

or with Yarn

```sh
yarn global add create-react-component-folder
```

## Creating single component (locally installed)

Run these commands from your **project's root folder**

```sh
$ npx crcf myComponent
$ npx crcf nested/myComponent
```

## Creating single component (globally installed)

Run anywhere the following commands

```sh
$ crcf myComponent
$ crcf nested/myComponent
```

## Output single

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/single.png?raw=true' />
</p>

## Creating multiple components (locally installed)

```sh
$ npx crcf components/header footer button navigation
```

## Creating multiple components (globally installed)

```sh
$ crcf components/header footer button navigation
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

## Creating index.js file for multple component imports (locally installed)

```sh
$ npx crcf --createindex
```

## Creating index.js file for multple component imports (globally installed)

```sh
$ crcf --createindex
```

## Output in index.js file for multple component imports

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/index.png?raw=true' />
</p>

## Options

```sh
$ npx crcf --help
or
$ crcf --help

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
