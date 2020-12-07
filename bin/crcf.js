#!/usr/bin/env node

const program = require('commander');
const packageJson = require('../package.json');

try {
  program.version(packageJson.version)
    .command('publish-templates', 'Publish template files to a project')
    .command('create', 'Create a react component folder', { isDefault: true })
    .parse(process.argv);
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn('Invalid command', error);
}
