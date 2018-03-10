## About

Creates react component folder structure with one command. We also support Typescript.
You can either use **crcf** or **create-react-component-folder**
Read the artice on Medium

## Tutorial
[Read the artice on Medium](https://medium.com/@snrseljanroddsson/create-multiple-react-folder-components-in-one-command-1411cd6bd1ce)

## Install

```sh
npm install -g create-react-component-folder
```

## Creating single component

```sh
$ crcf myComponent
$ crcf nested/myComponent
```

## Output single

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/single.png?raw=true' />
</p>

## Creating multiple components

```sh
$ crcf folder/nested/Button menu navigation
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

## Options

```sh
$ crcf --help

Options
--------------
    -V, --version    output the version number
    --typescript     Creates Typescript component and files
    --nocss          No css file
    --notest         No test file
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
