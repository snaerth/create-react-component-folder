## About

Creates react component folder structure with one command. You can either use **crcf** or **create-react-component-folder**

## Creating an Component

```sh
Install
--------------
npm install -g create-react-component-folder
```

```sh
Usage
--------------

$ crcf example

| Creating components files...

✨  Finished in: 575.323ms
 DONE  Success!

Created a new React component at /Projects/example

example/
  └─ index.js
  └─ example.js
  └─ example.test.js
  └─ example.css

$ crcf example/nested

| Creating components files...

✨  Finished in: 575.323ms
 DONE  Success!

Created a new React component at /Projects/example/nested

nested/
  └─ index.js
  └─ nested.js
  └─ nested.test.js
  └─ nested.css

or you can use

create-react-component-folder example
create-react-component-folder example/nested  
```

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
