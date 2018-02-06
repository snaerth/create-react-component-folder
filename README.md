<p align='center'>
  <h1 align='center'>Create React component</h1>
</p>


## About

Creates react component folder structure with one command. You can either use crc or create-react-comp

## Creating an Component

```
npm install -g create-react-comp

crc MyComponent
crc example/nested/MyComponent  
```


<p align='center'>
<img src='https://github.com/snaerth/create-react-comp/blob/master/docs/screen.png?raw=true' />
</p>

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
~/Projects$ create-react-comp --help

or 

~/Projects$ crc --help

  Usage: create-react-comp [options]


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