<p align='center'>
  <h1 align='center'>Create React component</h1>
</p>


## About

Creates react component folder structure with one command. You can either use crc or create-react-component

## Creating an Component

```
npm install -g create-react-component

crc MyComponent
crc example/nested/MyComponent  
```

## Component folder structure

```
MyComponent
├── index.js
├── MyComponent.js
├── MyComponent.css
├── MyComponent.test.js
```

## Options

```
~/Projects$ create-react-component --help

or 

~/Projects$ crc --help

  Usage: create-react-component [options]


  Options:

    -V, --version    output the version number
    -l, --less       Adds .less file to component
    -s, --sass       Adds .sass file to component
    -n, --nocss      No css file
    -p, --proptypes  Adds prop-types to component
    -u, --uppercase  Component files start on an uppercase letter
    -h, --help       output usage information
```

## Author
- [Snær Seljan Þóroddsson](https://github.com/snaerth)

## License

MIT