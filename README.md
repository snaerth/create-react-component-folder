## About

Creates react component folder structure with one command. We also support Typescript.
You can either use **crcf** or **create-react-component-folder**

## Install

```sh
npm install -g create-react-component-folder
```

## Creating an Component

```sh
$ crcf MyComponent
$ crcf nested/MyComponent
$ create-react-component-folder MyComponent
$ create-react-component-folder nested/MyComponent  
```

## Output

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
    -l, --less       Adds .less file to component
    -s, --sass       Adds .sass file to component
    -n, --nocss      No css file
    -t, --notest     No test file
    -p, --proptypes  Adds prop-types to component
    -u, --uppercase  Component files start on uppercase letter
    -h, --help       output usage information
```

## Author

* [Snær Seljan Þóroddsson](https://github.com/snaerth)

## License

MIT
