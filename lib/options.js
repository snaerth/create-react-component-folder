const config = require('./config');

const getOptions = () => [
  {
    name: 'typescript',
    flags: '--typescript',
    description: 'Creates Typescript component and files',
    defaultValue: config.hasFlag('typescript'),
  },
  {
    name: 'nocss',
    flags: '--nocss',
    description: 'No css file',
    defaultValue: config.hasFlag('nocss'),
  },
  {
    name: 'stylesext',
    flags: '--stylesext',
    description: 'Adds Component.style.(js|ts) file',
    defaultValue: config.hasFlag('stylesext'),
  },
  {
    name: 'graphql',
    flags: '--graphql',
    description: 'Adds Component.graphql file to component folder',
    defaultValue: config.hasFlag('graphql'),
  },
  {
    name: 'notest',
    flags: '--notest',
    description: 'No test file',
    defaultValue: config.hasFlag('notest'),
  },
  {
    name: 'cssmodules',
    flags: '--cssmodules',
    description: 'Creates css/less/scss file with .module extensions. Example component.module.css',
    defaultValue: config.hasFlag('cssmodules'),
  },
  {
    name: 'reactnative',
    flags: '--reactnative',
    description: 'Creates React Native components',
    defaultValue: config.hasFlag('reactnative'),
  },
  {
    name: 'createindex',
    flags: '--createindex',
    description: 'Creates index.js file for multple component imports',
    defaultValue: config.hasFlag('createindex'),
  },
  {
    name: 'namedexports',
    flags: '-x, --namedexports',
    description: 'Creates files using named exports',
    defaultValue: config.hasFlag('namedexports'),
  },
  {
    name: 'functional',
    flags: '-f, --functional',
    description: 'Creates React stateless functional component',
    defaultValue: config.hasFlag('functional'),
  },
  {
    name: 'jsx',
    flags: '-j, --jsx',
    description: 'Creates the component file with .jsx extension',
    defaultValue: config.hasFlag('jsx'),
  },
  {
    name: 'less',
    flags: '-l, --less',
    description: 'Adds .less file to component',
    defaultValue: config.hasFlag('less'),
  },
  {
    name: 'scss',
    flags: '-s, --scss',
    description: 'Adds .scss file to component',
    defaultValue: config.hasFlag('scss'),
  },
  {
    name: 'proptypes',
    flags: '-p, --proptypes',
    description: 'Adds prop-types to component',
    defaultValue: config.hasFlag('proptypes'),
  },
  {
    name: 'uppercase',
    flags: '-u, --uppercase',
    description: 'Component files start on uppercase letter',
    defaultValue: config.hasFlag('uppercase'),
  },
  {
    name: 'default',
    flags: '-d, --default',
    description: 'Uses a default configuration if available',
    defaultValue: config.hasFlag('default'),
  },
  {
    name: 'stories',
    flags: '-sb, --stories',
    description: 'Add Story file to component',
    defaultValue: config.hasFlag('stories'),
  },
  {
    name: 'nosemi',
    flags: '-ns, --nosemi',
    description: 'No semicolons',
    defaultValue: config.hasFlag('nosemi'),
  },
  {
    name: 'singlequote',
    flags: '-sq, --singlequote',
    description: 'Formats output files with single quotes',
    defaultValue: config.hasFlag('singlequote'),
  },
  {
    name: 'output',
    flags: '-o, --output <directory>',
    description: 'The root directory to create components in',
    defaultValue: config.getValue('output', ''),
  },
];

module.exports = getOptions;
