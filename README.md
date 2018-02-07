## About

Creates react component folder structure with one command. You can either use **crcf** or **create-react-component-folder**

## Creating an Component

```
npm install -g create-react-component-folder

crcf MyComponent
crcf example/nested/MyComponent  

or

create-react-component-folder MyComponent
create-react-component-folder example/nested/MyComponent  
```

<p align='center'>
<img src='https://github.com/snaerth/create-react-component-folder/blob/master/docs/screen.png?raw=true' />
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
~/Projects$ create-react-component-folder --help

or

~/Projects$ crcf --help

  Usage: create-react-component-folder [options]


  Options:

    -V, --version    output the version number
    -l, --less       Adds .less file to component
    -s, --sass       Adds .sass file to component
    -n, --nocss      No css file
    -t, --notest     No test file
    -p, --proptypes  Adds prop-types to component
    -u, --uppercase  Component files start on an uppercase letter
    -h, --help       output usage information
```

## Author

* [Snær Seljan Þóroddsson](https://github.com/snaerth)

## License

MIT
