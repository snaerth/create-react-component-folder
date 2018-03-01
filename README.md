## About

Creates react component folder structure with one command. We also support Typescript.
You can either use **crcf** or **create-react-component-folder**

## Install

```sh
npm install -g create-react-component-folder
```

## Creating single component

```sh
$ crcf MyComponent
$ crcf nested/MyComponent
$ create-react-component-folder MyComponent
$ create-react-component-folder nested/MyComponent  
```

## Output single

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/screen.png?raw=true' />
</p>

## Creating multiple components

```sh
$ crcf Button Button2 Button3
$ crcf nested/MyComponent Button Button2 Button3
$ create-react-component-folder Button Button2 Button3
$ create-react-component-folder nested/Button Button2 Button3
```

## Output multiple

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/screen.png?raw=true' />
</p>

## Component folder structure

```sh
MyComponent
├── index.js
├── MyComponent.js
├── MyComponent.css
├── MyComponent.test.js
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
