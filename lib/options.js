const getOptions = getDefConfig => [
  {
    name: 'typescript',
    flags: '--typescript',
    description: 'Creates Typescript component and files',
    defaultValue: getDefConfig('typescript'),
  }, {
    name: 'nocss',
    flags: '--nocss',
    description: 'No css file',
    defaultValue: getDefConfig('nocss'),
  }, {
    name: 'notest',
    flags: '--nocss',
    description: 'No css file',
    defaultValue: getDefConfig('notest'),
  }, {
    name: 'cssmodules',
    flags: '--cssmodules',
    description: 'Creates css/less/scss file with .module extensions. Example component.module.css',
    defaultValue: getDefConfig('cssmodules'),
  }, {
    name: 'reactnative',
    flags: '--reactnative',
    description: 'Creates React Native components',
    defaultValue: getDefConfig('reactnative'),
  }, {
    name: 'createindex',
    flags: '--createindex',
    description: 'Creates index.js file for multple component imports',
    defaultValue: getDefConfig('createindex'),
  }, {
    name: 'namedexports',
    flags: '-x, --namedexports',
    description: 'Creates files using named exports',
    defaultValue: getDefConfig('namedexports'),
  }, {
    name: 'functional',
    flags: '-f, --functional',
    description: 'Creates React stateless functional component',
    defaultValue: getDefConfig('functional'),
  },
  {
    name: 'jsx',
    flags: '-j, --jsx',
    description: 'Creates the component file with .jsx extension',
    defaultValue: getDefConfig('jsx'),
  }, {
    name: 'less',
    flags: '-l, --less',
    description: 'Adds .less file to component',
    defaultValue: getDefConfig('less'),
  }, {
    name: 'scss',
    flags: '-s, --scss',
    description: 'Adds .scss file to component',
    defaultValue: getDefConfig('scss'),
  }, {
    name: 'proptypes',
    flags: '-p, --proptypes',
    description: 'Adds prop-types to component',
    defaultValue: getDefConfig('proptypes'),
  }, {
    name: 'uppercase',
    flags: '-u, --uppercase',
    description: 'Component files start on uppercase letter',
    defaultValue: getDefConfig('uppercase'),
  }, {
    name: 'default',
    flags: '-d, --default',
    description: 'Uses a default configuration if available',
    defaultValue: getDefConfig('default'),
  }, {
    name: 'stories',
    flags: '-sb, --stories',
    description: 'Add Story file to component',
    defaultValue: getDefConfig('stories'),
  }, {
    name: 'nosemi',
    flags: '-ns, --nosemi',
    description: 'No semicolons',
    defaultValue: getDefConfig('nosemi'),
  },
];

module.exports = getOptions;
