#!/usr/bin/env node

const nodeFs = require('fs');
const chalk = require('chalk');
const logger = require('./logger');
const fs = require('./utils/fileHelpers');
const logComponentTree = require('./utils/logComponentTree');

const libPath = __dirname;
const projectDir = process.cwd();
const crcfDir = '.crcf';
const templateDir = 'templates';

async function publish() {
  // Start timer
  /* eslint-disable no-console */
  console.time('✨  Finished in');
  const promises = [];
  const projectTemplatePath = `${projectDir}/${crcfDir}/${templateDir}`;
  const libTemplatePath = `${libPath}/../${templateDir}`;

  try {
    await fs.createDirectorys(projectTemplatePath);
  } catch (error) {
    logger.error('Could not create directory .crcf', error);
    return;
  }

  let templates;
  try {
    templates = await fs.readDirAsync(libTemplatePath);
  } catch (error) {
    logger.error('Could not read crcf\'s template directory', error);
    return;
  }

  templates.forEach((template) => {
    promises.push(
      nodeFs.createReadStream(`${libTemplatePath}/${template}`)
        .pipe(nodeFs.createWriteStream(`${projectTemplatePath}/${template}`)),
    );
  });

  Promise.all(promises).then(() => {
    logger.log(chalk.cyan('Published templates to: '));
    // Logs component file tree
    logComponentTree([templates], projectTemplatePath, false);
    logger.log();
    // Stop animating in console
    logger.animateStop();
    // Stop timer
    console.timeEnd('✨  Finished in');
    // Log output to console
    logger.done('Success!');
  }).catch((error) => {
    if (error.message === 'false') {
      logger.error('Could not publish templates', error);
      return;
    }

    logger.error('An unknown error occurred', error);
  });
}

publish();
